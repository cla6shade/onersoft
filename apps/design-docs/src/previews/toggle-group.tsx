'use client'

import { ToggleGroup } from '@onersoft/design-system'

export function ToggleGroupSingle() {
  return (
    <ToggleGroup.Root type="single" defaultValue="grid" aria-label="View mode">
      <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      <ToggleGroup.Item value="board">Board</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

export function ToggleGroupMultiple() {
  return (
    <ToggleGroup.Root type="multiple" defaultValue={['bold']} aria-label="Formatting">
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
      <ToggleGroup.Item value="underline">Underline</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
