import type { ComponentProps } from 'react'
import { Root, Item } from './RadioGroup'

export const RadioGroup = {
  Root,
  Item,
}

export type RadioGroupRootProps = ComponentProps<typeof Root>
export type RadioGroupItemProps = ComponentProps<typeof Item>
