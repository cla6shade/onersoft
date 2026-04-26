import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Kbd } from './Kbd'

const meta: Meta<typeof Kbd> = {
  title: 'Primitives/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline indicator for a keyboard key or shortcut. Render one `Kbd` per key and use plain text for separators (e.g. `⌘ + K`). Use sparingly inside body copy, tooltips, and menu shortcuts; the `<kbd>` element conveys the keystroke semantically.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  render: () => (
    <div className={demo.kbdRow}>
      Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
    </div>
  ),
}
