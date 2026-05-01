'use client';

import type { ComponentProps } from 'react';
import * as Slot from '@radix-ui/react-slot';
import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardRootProps extends ComponentProps<'div'> {
  /** When true, applies hover/focus styling. Pair with `asChild` and an `<a>` or `<button>` for navigation cards. */
  interactive?: boolean;
  asChild?: boolean;
}

function Root({ className, interactive = false, asChild = false, ...props }: CardRootProps) {
  const Comp = asChild ? Slot.Root : 'div';
  return (
    <Comp
      data-slot="card"
      className={clsx(styles.root, interactive && styles.interactive, className)}
      {...props}
    />
  );
}

function Header({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-header" className={clsx(styles.header, className)} {...props} />;
}

/* Small uppercase label sitting above Title. The eyebrow → title →
 * description rhythm is what gives the card its editorial character;
 * without it, headers fall back to a generic title + supporting-line
 * template. */
function Eyebrow({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="card-eyebrow" className={clsx(styles.eyebrow, className)} {...props} />;
}

function Title({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 data-slot="card-title" className={clsx(styles.title, className)} {...props} />;
}

function Description({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p data-slot="card-description" className={clsx(styles.description, className)} {...props} />
  );
}

function Body({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-body" className={clsx(styles.body, className)} {...props} />;
}

function Footer({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={clsx(styles.footer, className)} {...props} />;
}

export const Card = Object.assign(Root, {
  Header,
  Eyebrow,
  Title,
  Description,
  Body,
  Footer,
});
