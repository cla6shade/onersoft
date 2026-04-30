import type { ComponentProps } from 'react'
import {
  Root,
  Portal,
  Trigger,
  Close,
  Overlay,
  Content,
  Title,
  Description,
  Footer,
} from './Dialog'

export const Dialog = {
  Root,
  Portal,
  Trigger,
  Close,
  Overlay,
  Content,
  Title,
  Description,
  Footer,
}

export type DialogRootProps = ComponentProps<typeof Root>
export type DialogPortalProps = ComponentProps<typeof Portal>
export type DialogTriggerProps = ComponentProps<typeof Trigger>
export type DialogCloseProps = ComponentProps<typeof Close>
export type DialogOverlayProps = ComponentProps<typeof Overlay>
export type DialogContentProps = ComponentProps<typeof Content>
export type DialogTitleProps = ComponentProps<typeof Title>
export type DialogDescriptionProps = ComponentProps<typeof Description>
export type DialogFooterProps = ComponentProps<typeof Footer>
