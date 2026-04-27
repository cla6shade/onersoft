import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Field } from './Field'
import { Input } from '../Input'
import { Textarea } from '../Textarea'
import { Select } from '../Select'

const meta: Meta<typeof Field> = {
  title: 'Forms/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Composition primitive that wires a label, control, description, and error message together with the correct `id` / `aria-describedby` / `aria-invalid` connections. Wrap any form control with `<Field.Control asChild>` — the `id` is generated and propagated automatically.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Field>

export const Basic: Story = {
  render: () => (
    <Field>
      <Field.Label>Email</Field.Label>
      <Field.Control>
        <Input type="email" placeholder="you@example.com" />
      </Field.Control>
      <Field.Description>회사 도메인 이메일을 사용해주세요.</Field.Description>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Email')
    await expect(input).toHaveAttribute('aria-describedby')
    await expect(input).not.toHaveAttribute('aria-invalid')
  },
}

export const WithError: Story = {
  render: () => (
    <Field invalid>
      <Field.Label>Email</Field.Label>
      <Field.Control>
        <Input type="email" defaultValue="not-an-email" />
      </Field.Control>
      <Field.Description>회사 도메인 이메일을 사용해주세요.</Field.Description>
      <Field.Error>유효한 이메일 형식이 아닙니다.</Field.Error>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Email')
    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(canvas.getByRole('alert')).toHaveTextContent('유효한 이메일 형식이 아닙니다.')
  },
}

export const Interactive: Story = {
  render: function Interactive() {
    const [value, setValue] = useState('')
    const invalid = value.length > 0 && !value.includes('@')
    return (
      <Field invalid={invalid}>
        <Field.Label>이메일</Field.Label>
        <Field.Control>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Field.Control>
        <Field.Description>입력하면 실시간 검증.</Field.Description>
        <Field.Error>@ 가 포함되어야 합니다.</Field.Error>
      </Field>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('이메일')
    await userEvent.type(input, 'foo')
    await expect(canvas.getByRole('alert')).toBeInTheDocument()
    await userEvent.type(input, '@bar')
    await expect(canvas.queryByRole('alert')).toBeNull()
  },
}

export const WithTextarea: Story = {
  render: () => (
    <Field>
      <Field.Label>피드백</Field.Label>
      <Field.Control>
        <Textarea placeholder="자유롭게 작성해주세요" rows={4} />
      </Field.Control>
      <Field.Description>최소 20자 이상 권장.</Field.Description>
    </Field>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <Field>
      <Field.Label>언어</Field.Label>
      <Select.Root defaultValue="ko">
        <Field.Control>
          <Select.Trigger>
            <Select.Value placeholder="선택" />
          </Select.Trigger>
        </Field.Control>
        <Select.Portal>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="ko">한국어</Select.Item>
              <Select.Item value="en">English</Select.Item>
              <Select.Item value="ja">日本語</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Field>
  ),
}
