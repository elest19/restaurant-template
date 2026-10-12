import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { site } from '../data/site'

/* eslint-disable react-refresh/only-export-components */

export type LegalDocumentId = 'terms' | 'privacy'

type LegalListener = (id: LegalDocumentId) => void

const legalListeners = new Set<LegalListener>()

/** Opens a legal dialog from anywhere (the Footer reuses this in the next phase). No hash routes. */
export function openLegal(id: LegalDocumentId): void {
  legalListeners.forEach((listener) => listener(id))
}

function subscribeLegal(listener: LegalListener): () => void {
  legalListeners.add(listener)
  return () => {
    legalListeners.delete(listener)
  }
}

export function LegalDialogHost() {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const [activeId, setActiveId] = useState<LegalDocumentId | null>(null)

  useEffect(() => {
    subscribeLegal((id: LegalDocumentId) => {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setActiveId(id)
    })
  }, [])

  useEffect(() => {
    if (!dialogRef.current) return
    if (activeId && !dialogRef.current.open) {
      document.body.style.overflow = 'hidden'
      dialogRef.current.showModal()
      dialogRef.current.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }
  }, [activeId])

  const close = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  const dispose = useCallback(() => {
    close()
    document.body.style.overflow = ''
    setActiveId(null)
    openerRef.current?.focus()
  }, [close])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispose()
      }
    }
    dialog.addEventListener('keydown', onKeydown)
    const onNativeClose = () => dispose()
    const onNativeCancel = () => dispose()
    dialog.addEventListener('close', onNativeClose)
    dialog.addEventListener('cancel', onNativeCancel)
    return () => {
      dialog.removeEventListener('keydown', onKeydown)
      dialog.removeEventListener('close', onNativeClose)
      dialog.removeEventListener('cancel', onNativeCancel)
    }
  }, [dispose])

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) dispose()
  }

  const doc = activeId === 'privacy' ? site.reservation.legal.privacy : site.reservation.legal.terms
  const titleId = `legal-title-${activeId ?? 'none'}`

  return (
    <div
      className={`legal-backdrop${activeId ? ' is-open' : ''}`}
      onClick={handleBackdropClick}
      aria-hidden={activeId ? undefined : true}
    >
      <dialog
        ref={dialogRef}
        className="legal-dialog"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="legal-dialog__head">
          <div>
            <h2 id={titleId} className="legal-dialog__title">{doc.title}</h2>
            <p className="legal-dialog__updated">{site.reservation.legal.updatedLabel}: {doc.updated}</p>
          </div>
          <button
            type="button"
            className="legal-dialog__icon-close"
            onClick={close}
            aria-label={site.reservation.legal.closeLabel}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="legal-dialog__body">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              {section.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {section.link && <a href={section.link.href}>{section.link.label}</a>}
            </section>
          ))}
        </div>
        <div className="legal-dialog__foot">
          <button
            type="button"
            className="button button--primary"
            data-autofocus
            onClick={dispose}
          >
            {site.reservation.legal.closeLabel}
          </button>
        </div>
      </dialog>
    </div>
  )
}