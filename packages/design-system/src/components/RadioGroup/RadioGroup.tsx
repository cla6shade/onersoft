import type { ComponentPropsWithoutRef } from 'react'
import { RadioGroup as RadixRadioGroup } from 'radix-ui'
import clsx from 'clsx'
import styles from './RadioGroup.module.css'

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>) {
  return <RadixRadioGroup.Root className={clsx(styles.root, className)} {...props} />
}

export function Item({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>) {
  return (
    <RadixRadioGroup.Item className={clsx(styles.item, className)} {...props}>
      <RadixRadioGroup.Indicator className={styles.indicator} />
    </RadixRadioGroup.Item>
  )
}
