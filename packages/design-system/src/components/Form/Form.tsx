import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { Slot, Label as RadixLabel } from 'radix-ui'
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import clsx from 'clsx'
import styles from './Form.module.css'

/* shadcn-style Form components on top of react-hook-form. The split
 * between FormFieldContext (carries the field name) and FormItemContext
 * (carries the generated id) lets a single FormItem host its own
 * label/control/message ids, while useFormField stitches them together
 * with RHF's field state to produce the id / aria-* / error wiring. */

const Form = FormProvider

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

interface FormItemContextValue {
  id: string
}

const FormItemContext = createContext<FormItemContextValue | null>(null)

export type FormItemProps = HTMLAttributes<HTMLDivElement>

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
  const id = useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        data-slot="form-item"
        className={clsx(styles.root, className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  if (!fieldContext) throw new Error('useFormField must be used within <FormField>')
  if (!itemContext) throw new Error('useFormField must be used within <FormItem>')

  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

export type FormLabelProps = ComponentPropsWithoutRef<typeof RadixLabel.Root>

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, htmlFor, ...props }, ref) => {
    const { error, formItemId } = useFormField()
    return (
      <RadixLabel.Root
        ref={ref}
        data-slot="form-label"
        data-invalid={error ? true : undefined}
        className={clsx(error && styles.labelInvalid, className)}
        htmlFor={htmlFor ?? formItemId}
        {...props}
      />
    )
  },
)
FormLabel.displayName = 'FormLabel'

export interface FormControlProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const FormControl = forwardRef<HTMLElement, FormControlProps>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot.Root
      ref={ref}
      data-slot="form-control"
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={error ? true : undefined}
      data-invalid={error ? true : undefined}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

export type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement>

const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField()
    return (
      <p
        ref={ref}
        data-slot="form-description"
        id={formDescriptionId}
        className={clsx(styles.description, className)}
        {...props}
      />
    )
  },
)
FormDescription.displayName = 'FormDescription'

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode
}

/* Renders the RHF error message when present, otherwise falls back to
 * children (so consumers can show static fallback text in the same slot).
 * Returns null when there's nothing to show — this keeps
 * `aria-describedby` from referencing an unrendered id. */
const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error.message ?? '') : children
    if (!body) return null
    return (
      <p
        ref={ref}
        data-slot="form-message"
        id={formMessageId}
        role={error ? 'alert' : undefined}
        className={clsx(error && styles.error, className)}
        {...props}
      >
        {body}
      </p>
    )
  },
)
FormMessage.displayName = 'FormMessage'

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
}
