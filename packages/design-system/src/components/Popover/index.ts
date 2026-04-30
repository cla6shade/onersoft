import type { ComponentProps } from 'react'
import { Root, Portal, Trigger, Anchor, Close, Arrow, Content } from './Popover'

export const Popover = {
  Root,
  Portal,
  Trigger,
  Anchor,
  Close,
  Arrow,
  Content,
}

export type PopoverRootProps = ComponentProps<typeof Root>
export type PopoverPortalProps = ComponentProps<typeof Portal>
export type PopoverTriggerProps = ComponentProps<typeof Trigger>
export type PopoverAnchorProps = ComponentProps<typeof Anchor>
export type PopoverCloseProps = ComponentProps<typeof Close>
export type PopoverArrowProps = ComponentProps<typeof Arrow>
export type PopoverContentProps = ComponentProps<typeof Content>
