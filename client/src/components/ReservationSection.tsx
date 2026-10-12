import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { site } from '../data/site'
import { reservationDateBounds, reservationSchema, type ReservationInput } from '../lib/reservationSchema'
import { openLegal } from './LegalDialog'
import { submitReservation } from '../services/reservationService'

const NOTES_MAX = 300

const defaultValues: ReservationInput = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: 2,
  notes: '',
  consent: false,
  honeypot: '',
}

interface ConfirmedRequest {
  name: string
  date: string
  time: string
  guests: number
}

const pad = (value: number) => String(value).padStart(2, '0')

/** '8:00 AM' → minutes since midnight. */
function parseClock(value: string): number {
  const match = /^(\d{1,2}):(\d{2})\s*([ap]m)$/i.exec(value.trim())
  if (!match) return 0
  const base = (Number(match[1]) % 12) * 60 + Number(match[2])
  return base + (match[3].toLowerCase() === 'pm' ? 12 * 60 : 0)
}

/** minutes since midnight → '2:00 PM'. */
function formatSlot(minutes: number): string {
  const hours = Math.floor(minutes / 60) % 24
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${pad(minutes % 60)} ${suffix}`
}

/** '14:30' → '2:30 PM'. */
function formatTime24(value: string): string {
  const [hours, minutes] = value.split(':').map(Number)
  return formatSlot(hours * 60 + minutes)
}

function formatSummaryDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <span className="reservation-error" id={id}>
      <svg className="reservation-error__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
      <span>{message}</span>
    </span>
  )
}

export function ReservationSection() {
  const copy = site.reservation
  const form = copy.form
  const labels = form.labels

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    mode: 'onBlur',
    defaultValues,
  })

  const [confirmed, setConfirmed] = useState<ConfirmedRequest | null>(null)
  const [submitError, setSubmitError] = useState(false)
  const [status, setStatus] = useState('')

  const timeSlots = useMemo(() => {
    const open = parseClock(site.hours.open)
    const last = parseClock(site.hours.close) - 60
    const slots: { value: string; label: string; minutes: number }[] = []
    for (let minutes = open; minutes <= last; minutes += 30) {
      slots.push({ value: `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`, label: formatSlot(minutes), minutes })
    }
    return slots
  }, [])

  const todayIso = useMemo(() => reservationDateBounds().min, [])
  const dateBounds = useMemo(() => reservationDateBounds(), [])

  const selectedDate = watch('date')
  const notesValue = watch('notes') ?? ''

  // Slots earlier than now + 60 minutes are unavailable when the date is today.
  const timeCutoff = useMemo(() => {
    if (selectedDate !== todayIso) return null
    const now = new Date()
    return now.getHours() * 60 + now.getMinutes() + 60
  }, [selectedDate, todayIso])

  // A time only makes sense for one date, so clear it when the date changes.
  useEffect(() => {
    setValue('time', '')
  }, [selectedDate, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const { honeypot, ...payload } = data
    setSubmitError(false)

    const request = { ...payload, consentVersion: form.consent.version }

    // Honeypot tripped: pretend success, never send.
    if (honeypot?.trim()) {
      setConfirmed({ name: request.name, date: request.date, time: request.time, guests: request.guests })
      setStatus(form.successLead)
      return
    }

    try {
      await submitReservation(request)
      setConfirmed({ name: request.name, date: request.date, time: request.time, guests: request.guests })
      setStatus(form.successLead)
    } catch {
      setSubmitError(true)
      setStatus(`${form.errorPrefix} ${site.contact.phone}.`)
    }
  })

  const handleMakeAnother = () => {
    setConfirmed(null)
    setSubmitError(false)
    setStatus('')
    reset(defaultValues)
    requestAnimationFrame(() => document.getElementById('res-name')?.focus())
  }


  const telHref = `tel:${site.contact.phone.replace(/[^\d+]/g, '')}`

  return (
    <section className="section-shell section-shell--reservation" id="reservation" aria-labelledby="reservation-heading">
      <div className="section-shell__inner reservation-shell">
        <div className="reservation-info">
          <p className="about-eyebrow">{copy.eyebrow}</p>
          <h2 id="reservation-heading" className="about-heading">{copy.heading}</h2>
          <p className="reservation-info__lede">{copy.description}</p>
          <h3 className="about-eyebrow reservation-steps__heading">{copy.steps.heading}</h3>
          <ol className="reservation-steps">
            {copy.steps.items.map((step, index) => {
              const state = confirmed ? (index === 0 ? 'done' : index === 1 ? 'active' : 'todo') : 'todo'
              return (
                <li key={step.title} className={`reservation-step reservation-step--${state}`}>
                  <span className="reservation-step__marker" aria-hidden="true">
                    {state === 'done' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="reservation-step__text">
                    <span className="reservation-step__title">{step.title}</span>
                    <span className="reservation-step__body">{step.text}</span>
                  </span>
                </li>
              )
            })}
          </ol>
          <h3 className="about-eyebrow reservation-expect__heading">{copy.expect.heading}</h3>
          <ul className="reservation-expect">
            {copy.expect.items.map((item) => (
              <li key={item.text} className="reservation-expect__item">
                <svg className="icon icon--stroke" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>
                  {item.text}
                  {item.linkLabel && item.linkHref ? (
                    <>
                      {' '}<a className="reservation-info__link" href={item.linkHref}>{item.linkLabel}</a>
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reservation-card">
          {confirmed ? (
            <div className="reservation-success">
              <div className="reservation-success__lead">{form.successLead}</div>
              <p className="reservation-success__next">{form.nextLine}</p>
              <dl className="reservation-summary">
                <dt>{labels.name}</dt>
                <dd>{confirmed.name}</dd>
                <dt>{labels.date}</dt>
                <dd>{formatSummaryDate(confirmed.date)}</dd>
                <dt>{labels.time}</dt>
                <dd>{formatTime24(confirmed.time)}</dd>
                <dt>{labels.guests}</dt>
                <dd>{confirmed.guests}</dd>
              </dl>
              <div>
                <button type="button" className="button button--outline" onClick={handleMakeAnother}>
                  {form.makeAnother}
                </button>
              </div>
            </div>
          ) : (
            <form className="reservation-form" onSubmit={onSubmit} noValidate>
              <div className="reservation-row">
                <div className="reservation-field">
                  <label htmlFor="res-name">{labels.name}</label>
                  <input
                    id="res-name"
                    className="reservation-input"
                    type="text"
                    autoComplete="name"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? 'res-name-error' : undefined}
                    {...register('name')}
                  />
                  {errors.name && <FieldError id="res-name-error" message={errors.name.message} />}
                </div>
                <div className="reservation-field">
                  <label htmlFor="res-phone">{labels.phone}</label>
                  <input
                    id="res-phone"
                    className="reservation-input"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={form.phonePlaceholder}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? 'res-phone-error' : undefined}
                    {...register('phone')}
                  />
                  {errors.phone && <FieldError id="res-phone-error" message={errors.phone.message} />}
                </div>
              </div>

              <div className="reservation-field">
                <label htmlFor="res-email">
                  {labels.email} <span className="reservation-field__optional">({form.optional})</span>
                </label>
                <input
                  id="res-email"
                  className="reservation-input"
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'res-email-error' : undefined}
                  {...register('email')}
                />
                {errors.email && <FieldError id="res-email-error" message={errors.email.message} />}
              </div>

              <div className="reservation-row">
                <div className="reservation-field">
                  <label htmlFor="res-date">{labels.date}</label>
                  <input
                    id="res-date"
                    className="reservation-input"
                    type="date"
                    min={dateBounds.min}
                    max={dateBounds.max}
                    aria-invalid={errors.date ? true : undefined}
                    aria-describedby={errors.date ? 'res-date-error' : undefined}
                    {...register('date')}
                  />
                  {errors.date && <FieldError id="res-date-error" message={errors.date.message} />}
                </div>
                <div className="reservation-field">
                  <label htmlFor="res-time">{labels.time}</label>
                  <select
                    id="res-time"
                    className="reservation-input"
                    aria-invalid={errors.time ? true : undefined}
                    aria-describedby={errors.time ? 'res-time-error' : undefined}
                    {...register('time')}
                  >
                    <option value="">{form.timePlaceholder}</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value} disabled={timeCutoff !== null && slot.minutes < timeCutoff}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                  {errors.time && <FieldError id="res-time-error" message={errors.time.message} />}
                </div>
              </div>

              <div className="reservation-field">
                <label htmlFor="res-guests">{labels.guests}</label>
                <select
                  id="res-guests"
                  className="reservation-input"
                  aria-invalid={errors.guests ? true : undefined}
                  aria-describedby={errors.guests ? 'res-guests-hint res-guests-error' : 'res-guests-hint'}
                  {...register('guests', { valueAsNumber: true })}
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
                <span className="reservation-hint" id="res-guests-hint">{form.guestsHint}</span>
                {errors.guests && <FieldError id="res-guests-error" message={errors.guests.message} />}
              </div>

              <div className="reservation-field">
                <label htmlFor="res-notes">
                  {labels.notes} <span className="reservation-field__optional">({form.optional})</span>
                </label>
                <textarea
                  id="res-notes"
                  className="reservation-input reservation-input--notes"
                  rows={3}
                  maxLength={NOTES_MAX}
                  aria-invalid={errors.notes ? true : undefined}
                  aria-describedby={errors.notes ? 'res-notes-counter res-notes-error' : 'res-notes-counter'}
                  {...register('notes')}
                />
                <span className="reservation-counter" id="res-notes-counter">
                  {notesValue.length} / {NOTES_MAX}
                </span>
                {errors.notes && <FieldError id="res-notes-error" message={errors.notes.message} />}
              </div>

              <div className="reservation-sr" aria-hidden="true">
                <label htmlFor="res-company">{form.honeypotLabel}</label>
                <input id="res-company" type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
              </div>

              <div className="reservation-consent">
                <input
                  id="res-consent"
                  className="reservation-consent__box"
                  type="checkbox"
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? 'res-consent-error' : undefined}
                  {...register('consent')}
                />
                <label htmlFor="res-consent" className="reservation-consent__label">
                  <span>{form.consent.agreeBefore} </span>
                  <button type="button" className="reservation-linkbtn" onClick={() => openLegal('terms')}>
                    {form.consent.termsLabel}
                  </button>
                  <span> {form.consent.agreeBetween} </span>
                  <button type="button" className="reservation-linkbtn" onClick={() => openLegal('privacy')}>
                    {form.consent.privacyLabel}
                  </button>
                  <span>{form.consent.agreeAfter}</span>
                </label>
              </div>
              {errors.consent && <FieldError id="res-consent-error" message={form.consent.requiredError} />}

              {submitError && (
                <div className="reservation-alert">
                  <svg className="reservation-error__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  <span>
                    {form.errorPrefix} <a href={telHref}>{site.contact.phone}</a>.
                  </span>
                </div>
              )}

              <div className="reservation-form__actions">
                <button type="submit" className="button button--primary" disabled={isSubmitting}>
                  {isSubmitting ? form.submitting : form.submit}
                </button>
              </div>
            </form>
          )}

          <p className="reservation-status" aria-live="polite">{status}</p>
        </div>
      </div>
    </section>
  )
}
