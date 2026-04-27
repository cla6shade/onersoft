import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './Form'
import { Input } from '../Input'

function BasicHarness() {
  const form = useForm({ defaultValues: { email: '' } })
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormDescription>회사 도메인 이메일을 사용해주세요.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}

function ErrorHarness() {
  const form = useForm({
    defaultValues: { email: 'not-an-email' },
    errors: {
      email: { type: 'manual', message: '유효한 이메일 형식이 아닙니다.' },
    },
  })
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}

function InteractiveHarness() {
  const form = useForm({ defaultValues: { email: '' }, mode: 'onChange' })
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        rules={{
          validate: (v) =>
            typeof v === 'string' && (v.length === 0 || v.includes('@'))
              ? true
              : '@ 가 포함되어야 합니다.',
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}

describe('Form', () => {
  it('wires aria-describedby and omits aria-invalid in basic state', () => {
    render(<BasicHarness />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-describedby')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('sets aria-invalid and renders alert when there is an error', () => {
    render(<ErrorHarness />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('유효한 이메일 형식이 아닙니다.')
  })

  it('toggles error message based on onChange validation', async () => {
    const user = userEvent.setup()
    render(<InteractiveHarness />)
    const input = screen.getByLabelText('이메일')
    await user.type(input, 'foo')
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    await user.type(input, '@bar')
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
