import type { ComponentProps } from 'react';
import {
  Provider,
  Action,
  Content,
  Controls,
  Viewport,
  Root,
  Title,
  Description,
  Close,
} from './Toast';

export const Toast = {
  Provider,
  Action,
  Content,
  Controls,
  Viewport,
  Root,
  Title,
  Description,
  Close,
};

export type ToastProviderProps = ComponentProps<typeof Provider>;
export type ToastActionProps = ComponentProps<typeof Action>;
export type ToastContentProps = ComponentProps<typeof Content>;
export type ToastControlsProps = ComponentProps<typeof Controls>;
export type ToastViewportProps = ComponentProps<typeof Viewport>;
export type ToastRootProps = ComponentProps<typeof Root>;
export type ToastTitleProps = ComponentProps<typeof Title>;
export type ToastDescriptionProps = ComponentProps<typeof Description>;
export type ToastCloseProps = ComponentProps<typeof Close>;

export { Toaster, type ToasterProps } from './Toaster';
export { toast, type ToastIntent, type ToastEntry, type ToastOptions } from './store';
