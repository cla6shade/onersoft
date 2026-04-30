import type { ComponentProps } from 'react'
import { Provider, Root, Portal, Trigger, Content } from './Tooltip'

export const Tooltip = {
  Provider,
  Root,
  Portal,
  Trigger,
  Content,
}

export type TooltipProviderProps = ComponentProps<typeof Provider>
export type TooltipRootProps = ComponentProps<typeof Root>
export type TooltipPortalProps = ComponentProps<typeof Portal>
export type TooltipTriggerProps = ComponentProps<typeof Trigger>
export type TooltipContentProps = ComponentProps<typeof Content>
