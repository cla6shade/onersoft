import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { DropdownMenu } from '.'

const meta: Meta = {
  title: 'Primitives/DropdownMenu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Contextual menu opened from a button trigger. Supports plain items, checkbox items, radio groups, sub-menus, separators, and right-aligned shortcut hints. Built on Radix DropdownMenu — keyboard navigation, type-ahead, and roving focus are handled automatically.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [showGrid, setShowGrid] = useState(true)
    const [density, setDensity] = useState('comfortable')
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="secondary">Options</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Label>View</DropdownMenu.Label>
            <DropdownMenu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
              Show grid
              <DropdownMenu.Shortcut>⌘G</DropdownMenu.Shortcut>
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Density</DropdownMenu.Label>
            <DropdownMenu.RadioGroup value={density} onValueChange={setDensity}>
              <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="spacious">Spacious</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              Duplicate
              <DropdownMenu.Shortcut>⌘D</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              Delete
              <DropdownMenu.Shortcut>⌫</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  },
}
