'use client'

import { forwardRef, type SVGAttributes } from 'react'
import clsx from 'clsx'
import type { ControlSize } from '../../types'
import styles from './Spinner.module.css'

export interface SpinnerProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  size?: ControlSize
  /** Optional accessible label; defaults to "Loading". Set empty string when decorative. */
  label?: string
}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = 'md', label = 'Loading', ...props }, ref) => (
    <svg
      ref={ref}
      data-slot="spinner"
      viewBox="0 0 24 24"
      role={label ? 'status' : 'presentation'}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={clsx(styles.spinner, styles[size], className)}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className={styles.track}
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={styles.head}
      />
    </svg>
  ),
)

Spinner.displayName = 'Spinner'
