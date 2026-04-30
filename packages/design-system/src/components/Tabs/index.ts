import type { ComponentProps } from 'react';
import { Root, List, Trigger, Content } from './Tabs';

export const Tabs = {
  Root,
  List,
  Trigger,
  Content,
};

export type TabsRootProps = ComponentProps<typeof Root>;
export type TabsListProps = ComponentProps<typeof List>;
export type TabsTriggerProps = ComponentProps<typeof Trigger>;
export type TabsContentProps = ComponentProps<typeof Content>;
