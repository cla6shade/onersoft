import type { ComponentProps } from 'react'
import { Root, Item, Header, Trigger, Content } from './Accordion'

export const Accordion = {
  Root,
  Item,
  Header,
  Trigger,
  Content,
}

export type AccordionRootProps = ComponentProps<typeof Root>
export type AccordionItemProps = ComponentProps<typeof Item>
export type AccordionHeaderProps = ComponentProps<typeof Header>
export type AccordionTriggerProps = ComponentProps<typeof Trigger>
export type AccordionContentProps = ComponentProps<typeof Content>
