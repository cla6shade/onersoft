import type { ComponentProps } from 'react';
import {
  Root,
  Portal,
  Trigger,
  Cancel,
  Action,
  Overlay,
  Content,
  Title,
  Description,
  Footer,
} from './AlertDialog';

export const AlertDialog = {
  Root,
  Portal,
  Trigger,
  Cancel,
  Action,
  Overlay,
  Content,
  Title,
  Description,
  Footer,
};

export type AlertDialogRootProps = ComponentProps<typeof Root>;
export type AlertDialogPortalProps = ComponentProps<typeof Portal>;
export type AlertDialogTriggerProps = ComponentProps<typeof Trigger>;
export type AlertDialogCancelProps = ComponentProps<typeof Cancel>;
export type AlertDialogActionProps = ComponentProps<typeof Action>;
export type AlertDialogOverlayProps = ComponentProps<typeof Overlay>;
export type AlertDialogContentProps = ComponentProps<typeof Content>;
export type AlertDialogTitleProps = ComponentProps<typeof Title>;
export type AlertDialogDescriptionProps = ComponentProps<typeof Description>;
export type AlertDialogFooterProps = ComponentProps<typeof Footer>;
