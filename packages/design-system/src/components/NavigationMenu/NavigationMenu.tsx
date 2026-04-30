'use client'

import type { ComponentPropsWithoutRef } from 'react'
import * as RadixNavMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'
import styles from './NavigationMenu.module.css'

export const Sub = RadixNavMenu.Sub

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixNavMenu.Root>) {
  return <RadixNavMenu.Root data-slot="navigation-menu" className={clsx(styles.root, className)} {...props} />
}

export function List({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixNavMenu.List>) {
  return <RadixNavMenu.List data-slot="navigation-menu-list" className={clsx(styles.list, className)} {...props} />
}

export function Item(props: ComponentPropsWithoutRef<typeof RadixNavMenu.Item>) {
  return <RadixNavMenu.Item data-slot="navigation-menu-item" {...props} />
}

export function Trigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixNavMenu.Trigger>) {
  return (
    <RadixNavMenu.Trigger data-slot="navigation-menu-trigger" className={clsx(styles.trigger, className)} {...props}>
      {children}
      <svg
        viewBox="0 0 16 16"
        width="10"
        height="10"
        focusable="false"
        aria-hidden
        className={styles.caret}
      >
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </RadixNavMenu.Trigger>
  )
}

export function Link({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixNavMenu.Link>) {
  return <RadixNavMenu.Link data-slot="navigation-menu-link" className={clsx(styles.link, className)} {...props} />
}

export function Content({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixNavMenu.Content>) {
  return <RadixNavMenu.Content data-slot="navigation-menu-content" className={clsx(styles.content, className)} {...props} />
}

export function Viewport({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixNavMenu.Viewport>) {
  return <RadixNavMenu.Viewport data-slot="navigation-menu-viewport" className={clsx(styles.viewport, className)} {...props} />
}
