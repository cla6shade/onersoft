import { forwardRef, type HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './EmptyState.module.css'

const Root = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="empty-state" className={clsx(styles.root, className)} {...props} />
  ),
)
Root.displayName = 'EmptyState'

const Media = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="empty-state-media" aria-hidden className={clsx(styles.media, className)} {...props} />
  ),
)
Media.displayName = 'EmptyState.Media'

const Title = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} data-slot="empty-state-title" className={clsx(styles.title, className)} {...props} />
  ),
)
Title.displayName = 'EmptyState.Title'

const Description = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-slot="empty-state-description" className={clsx(styles.description, className)} {...props} />
  ),
)
Description.displayName = 'EmptyState.Description'

const Actions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="empty-state-actions" className={clsx(styles.actions, className)} {...props} />
  ),
)
Actions.displayName = 'EmptyState.Actions'

export const EmptyState = Object.assign(Root, {
  Media,
  Title,
  Description,
  Actions,
})
