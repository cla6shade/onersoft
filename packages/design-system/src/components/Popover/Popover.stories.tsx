import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Button } from '../Button'
import { Input } from '../Input'
import { Label } from '../Label'
import { Popover } from '.'

const meta: Meta = {
  title: 'Primitives/Popover',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Floating surface anchored to a trigger — less interruptive than a dialog. Use for small forms, contextual filters, or rich tooltip-like content. Built on Radix Popover with collision-aware positioning. For non-interactive hint text, prefer `Tooltip`.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="secondary">Open popover</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <div className={demo.fieldColumn}>
            <Label htmlFor="display-name">Display name</Label>
            <Input id="display-name" size="sm" defaultValue="Pedro Duarte" />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
}
