import type { ComponentProps } from 'react';
import { Sub, Root, List, Item, Trigger, Link, Content, Viewport } from './NavigationMenu';

export const NavigationMenu = {
  Sub,
  Root,
  List,
  Item,
  Trigger,
  Link,
  Content,
  Viewport,
};

export type NavigationMenuSubProps = ComponentProps<typeof Sub>;
export type NavigationMenuRootProps = ComponentProps<typeof Root>;
export type NavigationMenuListProps = ComponentProps<typeof List>;
export type NavigationMenuItemProps = ComponentProps<typeof Item>;
export type NavigationMenuTriggerProps = ComponentProps<typeof Trigger>;
export type NavigationMenuLinkProps = ComponentProps<typeof Link>;
export type NavigationMenuContentProps = ComponentProps<typeof Content>;
export type NavigationMenuViewportProps = ComponentProps<typeof Viewport>;
