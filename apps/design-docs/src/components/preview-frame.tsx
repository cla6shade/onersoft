import type { ReactNode } from 'react'

interface PreviewProps {
  children: ReactNode
  /** When true, items align to start instead of center — useful for forms / lists. */
  align?: 'center' | 'start'
  className?: string
}

export function Preview({ children, align = 'center', className = '' }: PreviewProps) {
  const alignment = align === 'start' ? 'items-start justify-start' : 'items-center justify-center'

  return (
    <div
      className={`my-6 flex min-h-[140px] flex-wrap gap-3 rounded-[var(--ds-radius-lg)] border border-fd-border bg-fd-card/40 p-7 ${alignment} ${className}`}
    >
      {children}
    </div>
  )
}
