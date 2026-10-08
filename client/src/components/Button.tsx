import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'light'
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  return <a className={`button button--${variant} ${className}`} {...props}>{children}</a>
}
