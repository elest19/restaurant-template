import { apiRequest } from '../lib/apiClient'
import type { ReservationInput } from '../lib/reservationSchema'

export type ReservationPayload = Omit<ReservationInput, 'honeypot'> & { consentVersion: string }

export interface ReservationResponse {
  ok: boolean
}

// Mock is on by default so the section works before the API exists.
// TODO: set VITE_USE_MOCK_API=false once POST /api/reservations is implemented server-side.
const useMockApi = (import.meta.env.VITE_USE_MOCK_API ?? 'true') !== 'false'

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export async function submitReservation(payload: ReservationPayload): Promise<ReservationResponse> {
  // Dev-only failure hook: submit with the name "FAIL TEST" to preview the error state.
  if (import.meta.env.DEV && payload.name.trim().toUpperCase() === 'FAIL TEST') {
    throw new Error('Dev test failure triggered by the name "FAIL TEST".')
  }

  if (useMockApi) {
    await wait(800)
    return { ok: true }
  }

  // TODO: swap the mock above for this real call when the endpoint ships.
  return apiRequest<ReservationResponse>('/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
