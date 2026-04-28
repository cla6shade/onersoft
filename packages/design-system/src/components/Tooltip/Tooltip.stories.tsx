import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Tooltip } from '.'

const meta: Meta = {
  title: 'Primitives/Tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Brief, label-style hint shown on hover or focus. Do not put interactive content or essential information inside — tooltips disappear on blur and are typically hidden on touch devices. Wrap with `Tooltip.Provider` once at the app root to share the open delay across triggers. Built on Radix Tooltip.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root defaultOpen>
        <Tooltip.Trigger asChild>
          <Button variant="secondary">Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="top">
            Keyboard shortcut: ⌘K
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
}
