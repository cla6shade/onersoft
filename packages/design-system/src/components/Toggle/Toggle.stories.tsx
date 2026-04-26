import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Two-state button that flips between pressed and unpressed. Use for an isolated on/off control (e.g., bold in a single-field editor). When the user picks among related options, reach for `ToggleGroup` instead. Always provide an `aria-label` on icon-only toggles. Built on Radix Toggle.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: { children: 'Bold', 'aria-label': 'Toggle bold' },
}

export const Pressed: Story = {
  args: { children: 'Italic', defaultPressed: true, 'aria-label': 'Toggle italic' },
}
