import { z } from 'zod'

export const RESERVATION_MAX_DAYS = 90

function addDays(base: Date, days: number): Date {
  const next = new Date(base)
  next.setDate(next.getDate() + days)
  return next
}

/** Local-timezone YYYY-MM-DD (never UTC-shifted). */
export function toLocalISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Bookable window: today through today + 90 days, as local dates. */
export function reservationDateBounds(now = new Date()): { min: string; max: string } {
  return {
    min: toLocalISODate(now),
    max: toLocalISODate(addDays(now, RESERVATION_MAX_DAYS)),
  }
}

/** 09XX XXX XXXX and +63 9XX XXX XXXX (spaces/dashes optional) → +639XXXXXXXXX. */
export function normalizePhone(raw: string): string {
  const compact = raw.replace(/[\s-]/g, '')
  if (/^09\d{9}$/.test(compact)) return `+63${compact.slice(1)}`
  return compact
}

function isValidLocalDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return false
  return toLocalISODate(parsed) === value
}

export const reservationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter your full name (at least 2 characters).')
    .max(80, 'Full names are limited to 80 characters.'),
  phone: z
    .string()
    .trim()
    .transform(normalizePhone)
    .refine(
      (value) => /^\+639\d{9}$/.test(value),
      'Enter a Philippine mobile number, like 0917 123 4567 or +63 917 123 4567.',
    ),
  email: z
    .string()
    .refine(
      (value) => value === '' || z.email().safeParse(value).success,
      'Enter a valid email address, or leave this empty.',
    ),
  date: z
    .string()
    .refine(isValidLocalDate, 'Choose a valid date.')
    .refine((value) => {
      const { min, max } = reservationDateBounds()
      return value >= min && value <= max
    }, 'Choose a date between today and the next 90 days.'),
  time: z
    .string()
    .refine((value) => /^\d{2}:\d{2}$/.test(value), 'Choose a time.'),
  guests: z
    .number({ message: 'Choose the number of guests.' })
    .int('Choose between 1 and 12 guests.')
    .min(1, 'Choose between 1 and 12 guests.')
    .max(12, 'Choose between 1 and 12 guests — call us for larger groups.'),
  notes: z
    .string()
    .max(300, 'Notes are limited to 300 characters.')
    .optional(),
  consent: z
    .boolean()
    .refine((value) => value === true, 'Please agree to continue.'),
  honeypot: z.string().optional(),
})

export type ReservationInput = z.input<typeof reservationSchema>
