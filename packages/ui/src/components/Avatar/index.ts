import type { ComponentProps } from 'react';
import { Root, Image, Fallback } from './Avatar';

export const Avatar = {
  Root,
  Image,
  Fallback,
};

export type AvatarRootProps = ComponentProps<typeof Root>;
export type AvatarImageProps = ComponentProps<typeof Image>;
export type AvatarFallbackProps = ComponentProps<typeof Fallback>;
