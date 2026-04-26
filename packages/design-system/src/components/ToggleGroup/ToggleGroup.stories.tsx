import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup } from '.'

const meta: Meta = {
  title: 'Primitives/ToggleGroup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A set of two-state buttons sharing a row. `type="single"` enforces radio-like behavior (one or zero selected); `type="multiple"` lets each item toggle independently — appropriate for text-formatting controls. Always provide `aria-label` on `Root`. Built on Radix ToggleGroup.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const SingleSelection: Story = {
  render: () => (
    <ToggleGroup.Root type="single" defaultValue="grid" aria-label="View mode">
      <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      <ToggleGroup.Item value="board">Board</ToggleGroup.Item>
    </ToggleGroup.Root>
  ),
}

export const MultipleSelection: Story = {
  render: () => (
    <ToggleGroup.Root type="multiple" defaultValue={['bold']} aria-label="Formatting">
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      <ToggleGroup.Item value="underline">Underline</ToggleGroup.Item>
    </ToggleGroup.Root>
  ),
}
