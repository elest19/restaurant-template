import { site } from '../data/site'

export function ReservationSection() {
  return (
    <section className="section-shell section-shell--reservation" id="reservation" aria-labelledby="reservation-heading">
      <div className="section-shell__inner">
        <p className="section-shell__kicker">{site.reservation.eyebrow}</p>
        <h2 id="reservation-heading">{site.reservation.heading}</h2>
        <p>{site.reservation.description}</p>
      </div>
    </section>
  )
}
