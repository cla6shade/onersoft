import type { ComponentProps } from 'react'
import {
  Root,
  Group,
  Portal,
  Value,
  Icon,
  ItemText,
  Trigger,
  Content,
  Viewport,
  Item,
  Label,
  Separator,
  ScrollUpButton,
  ScrollDownButton,
} from './Select'

export const Select = {
  Root,
  Group,
  Portal,
  Value,
  Icon,
  ItemText,
  Trigger,
  Content,
  Viewport,
  Item,
  Label,
  Separator,
  ScrollUpButton,
  ScrollDownButton,
}

export type SelectRootProps = ComponentProps<typeof Root>
export type SelectGroupProps = ComponentProps<typeof Group>
export type SelectPortalProps = ComponentProps<typeof Portal>
export type SelectValueProps = ComponentProps<typeof Value>
export type SelectIconProps = ComponentProps<typeof Icon>
export type SelectItemTextProps = ComponentProps<typeof ItemText>
export type SelectTriggerProps = ComponentProps<typeof Trigger>
export type SelectContentProps = ComponentProps<typeof Content>
export type SelectViewportProps = ComponentProps<typeof Viewport>
export type SelectItemProps = ComponentProps<typeof Item>
export type SelectLabelProps = ComponentProps<typeof Label>
export type SelectSeparatorProps = ComponentProps<typeof Separator>
export type SelectScrollUpButtonProps = ComponentProps<typeof ScrollUpButton>
export type SelectScrollDownButtonProps = ComponentProps<typeof ScrollDownButton>
