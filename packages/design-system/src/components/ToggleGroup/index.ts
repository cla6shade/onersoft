import type { ComponentProps } from 'react'
import { Root, Item } from './ToggleGroup'

export const ToggleGroup = {
  Root,
  Item,
}

export type ToggleGroupRootProps = ComponentProps<typeof Root>
export type ToggleGroupItemProps = ComponentProps<typeof Item>
