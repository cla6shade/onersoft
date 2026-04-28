import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Label } from '../Label'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-line text input. Always pair with `Label` (via `htmlFor`/`id`) for accessibility — placeholders are not labels. Pass `invalid` to surface inline validation; describe the error with `aria-describedby` pointing to nearby helper text.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <div className={demo.fieldColumn}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@onersoft.com" />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className={demo.fieldColumn}>
      <Label htmlFor="invalid">Token</Label>
      <Input id="invalid" defaultValue="not-a-token" invalid />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className={demo.fieldColumn}>
      <Label htmlFor="disabled">Username</Label>
      <Input id="disabled" defaultValue="Read only" disabled />
    </div>
  ),
}
