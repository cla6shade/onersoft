import type { ComponentProps } from 'react'
import {
  Portal,
  Sub,
  Group,
  Root,
  Menu,
  Trigger,
  Content,
  Item,
  Label,
  Separator,
  Shortcut,
} from './Menubar'

export const Menubar = {
  Portal,
  Sub,
  Group,
  Root,
  Menu,
  Trigger,
  Content,
  Item,
  Label,
  Separator,
  Shortcut,
}

export type MenubarPortalProps = ComponentProps<typeof Portal>
export type MenubarSubProps = ComponentProps<typeof Sub>
export type MenubarGroupProps = ComponentProps<typeof Group>
export type MenubarRootProps = ComponentProps<typeof Root>
export type MenubarMenuProps = ComponentProps<typeof Menu>
export type MenubarTriggerProps = ComponentProps<typeof Trigger>
export type MenubarContentProps = ComponentProps<typeof Content>
export type MenubarItemProps = ComponentProps<typeof Item>
export type MenubarLabelProps = ComponentProps<typeof Label>
export type MenubarSeparatorProps = ComponentProps<typeof Separator>
export type MenubarShortcutProps = ComponentProps<typeof Shortcut>
