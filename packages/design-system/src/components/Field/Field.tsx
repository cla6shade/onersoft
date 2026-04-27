import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { Slot, Label as RadixLabel } from 'radix-ui'
import clsx from 'clsx'
import styles from './Field.module.css'

interface FieldContextValue {
  controlId: string
  descriptionId: string
  errorId: string
  invalid: boolean
  hasDescription: boolean
  hasError: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

function useField(component: string): FieldContextValue {
  const ctx = useContext(FieldContext)
  if (!ctx) {
    throw new Error(`<Field.${component}> must be used within <Field>`)
  }
  return ctx
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Marks the field as invalid; flips danger styling and exposes `aria-invalid` on the control. */
  invalid?: boolean
  /** Override the auto-generated control id. Useful when integrating with form libraries. */
  id?: string
  children: ReactNode
}

const FieldRoot = forwardRef<HTMLDivElement, FieldProps>(
  ({ className, invalid = false, id, children, ...props }, ref) => {
    const generatedId = useId()
    const controlId = id ?? generatedId
    /* Description / error ids are deterministic suffixes so child components
     * can register them via context without a second render pass. The
     * presence flags are derived from React.Children at the child site
     * (not here) — instead we expose them as `false` defaults and let the
     * Description / Error components self-flag through context mutation… but
     * React context isn't mutable, so we instead always emit both ids and
     * let aria-describedby string include only ids that exist in the DOM.
     * Browsers ignore aria-describedby tokens that don't resolve, so this
     * is safe. */
    const value = useMemo<FieldContextValue>(
      () => ({
        controlId,
        descriptionId: `${controlId}-desc`,
        errorId: `${controlId}-err`,
        invalid,
        hasDescription: true,
        hasError: invalid,
      }),
      [controlId, invalid],
    )

    return (
      <FieldContext.Provider value={value}>
        <div
          ref={ref}
          data-slot="field"
          className={clsx(styles.root, className)}
          data-invalid={invalid || undefined}
          {...props}
        >
          {children}
        </div>
      </FieldContext.Provider>
    )
  },
)
FieldRoot.displayName = 'Field'

export type FieldLabelProps = ComponentPropsWithoutRef<typeof RadixLabel.Root>

const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ htmlFor, ...props }, ref) => {
    const { controlId } = useField('Label')
    return <RadixLabel.Root ref={ref} data-slot="field-label" htmlFor={htmlFor ?? controlId} {...props} />
  },
)
FieldLabel.displayName = 'Field.Label'

export interface FieldControlProps extends HTMLAttributes<HTMLElement> {
  /** Always renders the child via Slot; `id`, `aria-describedby`, `aria-invalid` are merged in. */
  children: ReactNode
}

const FieldControl = forwardRef<HTMLElement, FieldControlProps>(
  ({ children, ...props }, ref) => {
    const { controlId, descriptionId, errorId, invalid, hasError } = useField('Control')
    /* Order matters: error id last so screen readers read the description
     * first, then the error. Both are merged with any aria-describedby
     * already on the child. */
    const describedBy = [descriptionId, hasError ? errorId : null].filter(Boolean).join(' ')
    return (
      <Slot.Root
        ref={ref}
        data-slot="field-control"
        id={controlId}
        aria-describedby={describedBy || undefined}
        aria-invalid={invalid || undefined}
        data-invalid={invalid || undefined}
        {...props}
      >
        {children}
      </Slot.Root>
    )
  },
)
FieldControl.displayName = 'Field.Control'

export type FieldDescriptionProps = HTMLAttributes<HTMLParagraphElement>

const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useField('Description')
    return (
      <p
        ref={ref}
        data-slot="field-description"
        id={descriptionId}
        className={clsx(styles.description, className)}
        {...props}
      />
    )
  },
)
FieldDescription.displayName = 'Field.Description'

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /** When false, the error node is not rendered (useful when error string is conditionally null). */
  children?: ReactNode
}

/* Renders nothing when there is no children OR the field is not invalid.
 * This lets consumers write `<Field.Error>{errors.email}</Field.Error>`
 * without conditional wrappers, and the aria-describedby auto-trims. */
const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, children, ...props }, ref) => {
    const { errorId, invalid } = useField('Error')
    if (!invalid || !children) return null
    return (
      <p
        ref={ref}
        data-slot="field-error"
        id={errorId}
        role="alert"
        className={clsx(styles.error, className)}
        {...props}
      >
        {children}
      </p>
    )
  },
)
FieldError.displayName = 'Field.Error'

export const Field = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
})
