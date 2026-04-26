import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Label } from '../Label'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text input. Always pair with a `Label` (via `htmlFor`/`id`). Set a sensible `rows` so the field hints at the expected answer length; users can drag to resize vertically. Use `invalid` to surface inline validation, with helper text linked via `aria-describedby`.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => (
    <div className={demo.fieldColumnWide}>
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        placeholder="Tell us a bit about yourself..."
        rows={4}
      />
    </div>
  ),
}
