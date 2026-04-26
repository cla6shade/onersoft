import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { Slider as RadixSlider } from 'radix-ui'
import clsx from 'clsx'
import styles from './Slider.module.css'

export const Slider = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<typeof RadixSlider.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  const thumbs = value ?? defaultValue ?? [0]
  return (
    <RadixSlider.Root
      ref={ref}
      className={clsx(styles.root, className)}
      value={value}
      defaultValue={defaultValue}
      {...props}
    >
      <RadixSlider.Track className={styles.track}>
        <RadixSlider.Range className={styles.range} />
      </RadixSlider.Track>
      {thumbs.map((_, i) => (
        <RadixSlider.Thumb key={i} className={styles.thumb} />
      ))}
    </RadixSlider.Root>
  )
})

Slider.displayName = 'Slider'
