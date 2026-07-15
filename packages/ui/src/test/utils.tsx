import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode, CSSProperties } from 'react';

export const TOKEN_OVERRIDE_RGB = 'rgb(255, 100, 0)';
export const HOST_OVERRIDE_RGB = 'rgb(0, 200, 0)';
export const SLOT_OVERRIDE_RGB = 'rgb(50, 50, 50)';

/* Returns getComputedStyle for the property as the browser resolved it
 * (whitespace-trimmed). Single-side aliasing for shorthand properties
 * is handled via `computedKey`. */
export function getCss(el: Element, prop: string): string {
  return getComputedStyle(el).getPropertyValue(prop).trim();
}

export function mountWithOverrides(
  ui: (wrapper: HTMLDivElement) => ReactNode,
  options: { tokenOverrides?: Record<string, string>; wrapperStyle?: CSSProperties } = {},
): RenderResult & { wrapper: HTMLDivElement } {
  const wrapper = document.createElement('div');
  /* Mirror a real consumer page so axe color-contrast checks see the
   * design system surface tokens instead of the bare browser white. */
  wrapper.style.backgroundColor = 'var(--ds-color-bg-surface)';
  wrapper.style.color = 'var(--ds-color-fg-default)';
  wrapper.style.padding = '16px';
  if (options.tokenOverrides) {
    for (const [name, value] of Object.entries(options.tokenOverrides)) {
      wrapper.style.setProperty(name, value);
    }
  }
  if (options.wrapperStyle) {
    Object.assign(wrapper.style, options.wrapperStyle);
  }
  document.body.appendChild(wrapper);
  const result = render(ui(wrapper) as ReactElement, { container: wrapper });
  return Object.assign(result, { wrapper });
}

export function injectStyle(css: string): HTMLStyleElement {
  const tag = document.createElement('style');
  tag.textContent = css;
  document.head.appendChild(tag);
  return tag;
}

/* Surface property the design system actually sets on the matrix slot.
 * Each cascade scenario (className, data-slot, token, Tailwind)
 * overrides this same property so a passing test means the override
 * actually beat a real DS rule — not a no-op. */
export type SurfaceProperty = 'background-color' | 'color' | 'border-color';

export interface ComponentMatrixEntry {
  /** Slot queried for data-slot, token, and assertion read-back. */
  slot: string;
  /**
   * Slot whose host element receives the className. Defaults to `slot`.
   * Used for components like Slider where the deep slot (e.g. thumb)
   * isn't reachable through the public className API — the className
   * lands on the root and the assertion happens there too.
   */
  classSlot?: string;
  property: SurfaceProperty;
  token: string;
}

export const componentMatrix = {
  Accordion: {
    slot: 'accordion-trigger',
    property: 'color',
    token: '--ds-color-fg-default',
  },
  AlertDialog: {
    slot: 'alert-dialog-content',
    property: 'background-color',
    token: '--ds-color-bg-elevated',
  },
  Avatar: {
    slot: 'avatar',
    property: 'background-color',
    token: '--ds-color-bg-elevated',
  },
  Badge: {
    slot: 'badge',
    property: 'background-color',
    token: '--ds-color-bg-sunken',
  },
  Button: {
    slot: 'button',
    property: 'background-color',
    token: '--ds-color-bg-accent',
  },
  Card: {
    slot: 'card-title',
    property: 'color',
    token: '--ds-color-fg-default',
  },
  Checkbox: {
    slot: 'checkbox',
    property: 'background-color',
    token: '--ds-color-bg-sunken',
  },
  Dialog: {
    slot: 'dialog-content',
    property: 'background-color',
    token: '--ds-color-bg-elevated',
  },
  DropdownMenu: {
    slot: 'dropdown-menu-content',
    property: 'background-color',
    token: '--ds-color-bg-overlay',
  },
  EmptyState: {
    slot: 'empty-state',
    property: 'color',
    token: '--ds-color-fg-default',
  },
  Form: {
    slot: 'form-description',
    property: 'color',
    token: '--ds-color-fg-muted',
  },
  Input: {
    slot: 'input',
    property: 'background-color',
    token: '--ds-color-bg-surface',
  },
  Kbd: {
    slot: 'kbd',
    property: 'color',
    token: '--ds-color-fg-default',
  },
  Label: {
    slot: 'label',
    property: 'color',
    token: '--ds-color-fg-default',
  },
  Menubar: {
    slot: 'menubar',
    property: 'background-color',
    token: '--ds-color-bg-elevated',
  },
  NavigationMenu: {
    slot: 'navigation-menu',
    property: 'color',
    token: '--ds-color-fg-default',
  },
  Popover: {
    slot: 'popover-content',
    property: 'background-color',
    token: '--ds-color-bg-overlay',
  },
  Progress: {
    slot: 'progress',
    property: 'background-color',
    token: '--ds-color-bg-sunken',
  },
  RadioGroup: {
    slot: 'radio-group-item',
    property: 'background-color',
    token: '--ds-color-bg-sunken',
  },
  Select: {
    slot: 'select-trigger',
    property: 'background-color',
    token: '--ds-color-bg-surface',
  },
  Separator: {
    slot: 'separator',
    property: 'background-color',
    token: '--ds-color-border-default',
  },
  Skeleton: {
    slot: 'skeleton',
    property: 'background-color',
    token: '--ds-color-bg-sunken',
  },
  /* Slider's track and thumb aren't reachable through the public
   * className API, so the host-class scenarios assert on the root
   * (where the class actually lands) and the deep cascade scenarios
   * target the thumb. */
  Slider: {
    slot: 'slider-thumb',
    classSlot: 'slider',
    property: 'background-color',
    token: '--ds-color-bg-elevated',
  },
  Spinner: {
    slot: 'spinner',
    property: 'color',
    token: '--ds-color-fg-default',
  },
  Switch: {
    slot: 'switch',
    property: 'background-color',
    token: '--ds-color-bg-subtle',
  },
  Tabs: {
    slot: 'tabs-trigger',
    property: 'color',
    token: '--ds-color-fg-muted',
  },
  Textarea: {
    slot: 'textarea',
    property: 'background-color',
    token: '--ds-color-bg-surface',
  },
  Toast: {
    slot: 'toast',
    property: 'background-color',
    token: '--ds-color-bg-overlay',
  },
  Toggle: {
    slot: 'toggle',
    property: 'border-color',
    token: '--ds-color-border-default',
  },
  ToggleGroup: {
    slot: 'toggle-group-root',
    property: 'background-color',
    token: '--ds-color-bg-subtle',
  },
  Tooltip: {
    slot: 'tooltip-content',
    property: 'background-color',
    token: '--ds-color-bg-overlay',
  },
} as const satisfies Record<string, ComponentMatrixEntry>;

export const HOST_CLASS_BY_PROPERTY: Record<SurfaceProperty, string> = {
  'background-color': 'test-custom-bg',
  color: 'test-custom-fg',
  'border-color': 'test-custom-border-color',
};

/* Tailwind v4 emits color tokens as `oklch(...)` (the source uses the
 * percentage form `oklch(63.7% 0.237 25.331)`; browsers normalize
 * `getComputedStyle` to the decimal form below). */
const RED_500_OKLCH = 'oklch(0.637 0.237 25.331)';

export const TAILWIND_CLASS_BY_PROPERTY: Record<
  SurfaceProperty,
  { className: string; expected: string }
> = {
  'background-color': { className: 'bg-red-500', expected: RED_500_OKLCH },
  color: { className: 'text-red-500', expected: RED_500_OKLCH },
  'border-color': { className: 'border-red-500', expected: RED_500_OKLCH },
};

/* "Generic" Tailwind utility checks — one per non-color property the
 * fixture exposes. The Tailwind compat scenario applies all of these
 * to the slot in one go and asserts each computed property. They are
 * picked to be mutually non-overlapping (no two utilities target the
 * same property) and to resolve to absolute values stable across
 * browsers (px, unitless weight, etc.). */
export interface TailwindCheck {
  className: string;
  property: string;
  expected: string;
}

export const TAILWIND_GENERIC_CHECKS: readonly TailwindCheck[] = [
  { className: 'p-8', property: 'padding-top', expected: '32px' },
  /* v4 emits `border-radius: calc(infinity * 1px)`; browsers compute
   * that to 2^25 px (33554432px), serialized as `3.35544e+07px`. */
  { className: 'rounded-full', property: 'border-radius', expected: '3.35544e+07px' },
  { className: 'font-bold', property: 'font-weight', expected: '700' },
  { className: 'text-3xl', property: 'font-size', expected: '30px' },
];

/* `border-color` shorthand is reported as four side-values; assert on a
 * single side for stable cross-browser comparison. */
export function computedKey(p: SurfaceProperty): string {
  return p === 'border-color' ? 'border-top-color' : p;
}
