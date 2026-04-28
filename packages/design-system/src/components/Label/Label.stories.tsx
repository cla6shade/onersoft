import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Checkbox } from '../Checkbox'
import { Label } from './Label'

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible label for a form control. Always associate the label with its control via `htmlFor`/`id` so that clicking the label focuses or toggles the control. Built on Radix Label, which preserves this binding even when wrapping non-native controls (e.g. Switch, Checkbox).',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (
    <div className={demo.fieldRow}>
      <Checkbox id="newsletter" />
      <Label htmlFor="newsletter">Subscribe to the newsletter</Label>
    </div>
  ),
}
