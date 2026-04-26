import type { ComponentPropsWithoutRef } from 'react'
import { Accordion as RadixAccordion } from 'radix-ui'
import clsx from 'clsx'
import styles from './Accordion.module.css'

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAccordion.Root>) {
  return (
    <RadixAccordion.Root
      className={clsx(styles.root, className)}
      {...(props as ComponentPropsWithoutRef<typeof RadixAccordion.Root>)}
    />
  )
}

export function Item({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAccordion.Item>) {
  return <RadixAccordion.Item className={clsx(styles.item, className)} {...props} />
}

export function Header({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAccordion.Header>) {
  return <RadixAccordion.Header className={clsx(styles.header, className)} {...props} />
}

export function Trigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>) {
  return (
    <RadixAccordion.Trigger className={clsx(styles.trigger, className)} {...props}>
      <span className={styles.label}>{children}</span>
      <svg className={styles.chevron} viewBox="0 0 16 16" width="14" height="14" aria-hidden>
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </RadixAccordion.Trigger>
  )
}

export function Content({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAccordion.Content>) {
  return (
    <RadixAccordion.Content className={clsx(styles.content, className)} {...props}>
      <div className={styles.contentInner}>{children}</div>
    </RadixAccordion.Content>
  )
}
