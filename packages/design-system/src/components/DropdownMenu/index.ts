import type { ComponentProps } from 'react';
import {
  Root,
  Portal,
  Sub,
  RadioGroup,
  Group,
  Trigger,
  Content,
  SubContent,
  Item,
  SubTrigger,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
  Shortcut,
} from './DropdownMenu';

export const DropdownMenu = {
  Root,
  Portal,
  Sub,
  RadioGroup,
  Group,
  Trigger,
  Content,
  SubContent,
  Item,
  SubTrigger,
  CheckboxItem,
  RadioItem,
  Label,
  Separator,
  Shortcut,
};

export type DropdownMenuRootProps = ComponentProps<typeof Root>;
export type DropdownMenuPortalProps = ComponentProps<typeof Portal>;
export type DropdownMenuSubProps = ComponentProps<typeof Sub>;
export type DropdownMenuRadioGroupProps = ComponentProps<typeof RadioGroup>;
export type DropdownMenuGroupProps = ComponentProps<typeof Group>;
export type DropdownMenuTriggerProps = ComponentProps<typeof Trigger>;
export type DropdownMenuContentProps = ComponentProps<typeof Content>;
export type DropdownMenuSubContentProps = ComponentProps<typeof SubContent>;
export type DropdownMenuItemProps = ComponentProps<typeof Item>;
export type DropdownMenuSubTriggerProps = ComponentProps<typeof SubTrigger>;
export type DropdownMenuCheckboxItemProps = ComponentProps<typeof CheckboxItem>;
export type DropdownMenuRadioItemProps = ComponentProps<typeof RadioItem>;
export type DropdownMenuLabelProps = ComponentProps<typeof Label>;
export type DropdownMenuSeparatorProps = ComponentProps<typeof Separator>;
export type DropdownMenuShortcutProps = ComponentProps<typeof Shortcut>;
