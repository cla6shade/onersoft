'use client'

import {
  createContext,
  useContext,
  useId,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from 'react'
import * as Slot from '@radix-ui/react-slot'
import * as RadixLabel from '@radix-ui/react-label'
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
>({ name, ...props }: ControllerProps<TFieldValues, TName>) {
  const value = useMemo(() => ({ name }), [name])
  return (
    <FormFieldContext.Provider value={value}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  )
}

interface FormItemContextValue {
  id: string
}

const FormItemContext = createContext<FormItemContextValue | null>(null)

export type FormItemProps = ComponentProps<'div'>

function FormItem({ className, ...props }: FormItemProps) {
  const id = useId()
  const value = useMemo(() => ({ id }), [id])
  return (
    <FormItemContext.Provider value={value}>
      <div
        data-slot="form-item"
        className={clsx(styles.root, className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

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

export type FormLabelProps = ComponentProps<typeof RadixLabel.Root>

function FormLabel({ className, htmlFor, ...props }: FormLabelProps) {
  const { error, formItemId } = useFormField()
  return (
    <RadixLabel.Root
      data-slot="form-label"
      data-invalid={error ? true : undefined}
      className={clsx(error && styles.labelInvalid, className)}
      htmlFor={htmlFor ?? formItemId}
      {...props}
    />
  )
}

export interface FormControlProps extends ComponentProps<typeof Slot.Root> {
  children: ReactNode
}

function FormControl({ ...props }: FormControlProps) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot.Root
      data-slot="form-control"
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={error ? true : undefined}
      data-invalid={error ? true : undefined}
      {...props}
    />
  )
}

export type FormDescriptionProps = ComponentProps<'p'>

function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { formDescriptionId } = useFormField()
  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={clsx(styles.description, className)}
      {...props}
    />
  )
}

export interface FormMessageProps extends ComponentProps<'p'> {
  children?: ReactNode
}

/* Renders the RHF error message when present, otherwise falls back to
 * children (so consumers can show static fallback text in the same slot).
 * Returns null when there's nothing to show — this keeps
 * `aria-describedby` from referencing an unrendered id. */
function FormMessage({ className, children, ...props }: FormMessageProps) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? '') : children
  if (!body) return null
  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      role={error ? 'alert' : undefined}
      className={clsx(error && styles.error, className)}
      {...props}
    >
      {body}
    </p>
  )
}

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
