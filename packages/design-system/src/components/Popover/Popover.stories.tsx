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
    <Popover.Root defaultOpen>
      <Popover.Trigger asChild>
        <Button variant="secondary">Open popover</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <div className={demo.fieldColumn}>
            <Label htmlFor="display-name">Display name</Label>
            <Input id="display-name" size="sm" defaultValue="Pedro Duarte" />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Popover.Close asChild>
                <Button size="sm" variant="ghost">
                  Close
                </Button>
              </Popover.Close>
            </div>
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ),
}

export const Anchored: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `Popover.Anchor` to attach the floating surface to a different element than the trigger — useful when the trigger sits far from the contextual region.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-12)' }}>
      <Popover.Root defaultOpen>
        <Popover.Anchor asChild>
          <span aria-label="anchor target" style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--ds-color-accent)' }} />
        </Popover.Anchor>
        <Popover.Trigger asChild>
          <Button size="sm" variant="ghost">
            Trigger (far away)
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="bottom">Anchored to the dot.</Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  ),
}
