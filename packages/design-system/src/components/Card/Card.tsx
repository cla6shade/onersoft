import { forwardRef, type HTMLAttributes } from 'react'
import { Slot } from 'radix-ui'
import clsx from 'clsx'
import styles from './Card.module.css'

export interface CardRootProps extends HTMLAttributes<HTMLDivElement> {
  /** When true, applies hover/focus styling. Pair with `asChild` and an `<a>` or `<button>` for navigation cards. */
  interactive?: boolean
  asChild?: boolean
}

const Root = forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, interactive = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'div'
    return (
      <Comp
        ref={ref}
        data-slot="card"
        className={clsx(styles.root, interactive && styles.interactive, className)}
        {...props}
      />
    )
  },
)
Root.displayName = 'Card'

const Header = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-header" className={clsx(styles.header, className)} {...props} />
  ),
)
Header.displayName = 'Card.Header'

const Title = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} data-slot="card-title" className={clsx(styles.title, className)} {...props} />
  ),
)
Title.displayName = 'Card.Title'

const Description = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-slot="card-description" className={clsx(styles.description, className)} {...props} />
  ),
)
Description.displayName = 'Card.Description'

const Body = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-body" className={clsx(styles.body, className)} {...props} />
  ),
)
Body.displayName = 'Card.Body'

const Footer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="card-footer" className={clsx(styles.footer, className)} {...props} />
  ),
)
Footer.displayName = 'Card.Footer'

export const Card = Object.assign(Root, {
  Header,
  Title,
  Description,
  Body,
  Footer,
})
