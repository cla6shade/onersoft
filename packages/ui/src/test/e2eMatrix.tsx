import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { page } from 'vitest/browser';
import type { ReactNode } from 'react';
import {
  mountWithOverrides,
  injectStyle,
  getCss,
  computedKey,
  HOST_CLASS_BY_PROPERTY,
  TAILWIND_CLASS_BY_PROPERTY,
  TAILWIND_GENERIC_CHECKS,
  HOST_OVERRIDE_RGB,
  SLOT_OVERRIDE_RGB,
  TOKEN_OVERRIDE_RGB,
  type SurfaceProperty,
} from './utils';

export type RenderFor = (args: { className?: string; wrapper: HTMLDivElement }) => ReactNode;

export interface RunComponentMatrixOptions {
  slot: string;
  /** Defaults to `slot`. The element queried for className/Tailwind
   * scenarios — i.e., where the className lands. */
  classSlot?: string;
  /** CSS property the design system actually sets on the slot. Each
   * cascade scenario overrides this same property so a passing test
   * means the override beat a real DS rule, not a no-op. */
  property: SurfaceProperty;
  /** A `--ds-*` token whose value flows into `property` on the slot.
   * The token-override scenario sets this token on the wrapper and
   * asserts the slot's resolved property reflects the override. */
  token: string;
  renderFor: RenderFor;
}

/* DS ships dark as the default `:root` theme and light as opt-in via
 * `:root[data-theme='light']`. Run every cascade scenario under both
 * themes so token resolution paths that diverge by theme (e.g. light's
 * `color-mix(..., black)` vs dark's `color-mix(..., white)`) get
 * exercised — and so a regression in one theme can't pass under the
 * other. `dark` is omitted as a no-op attribute write to keep the
 * default code path honest. */
const THEMES = ['dark', 'light'] as const;

export function runComponentMatrix(opts: RunComponentMatrixOptions) {
  const { slot, classSlot = slot, property, token, renderFor } = opts;
  const key = computedKey(property);

  const snap = (theme: string, scenario: string) =>
    page.screenshot({ path: `__screenshots__/${slot}/${theme}-${scenario}.png` });

  for (const theme of THEMES) {
    describe(`[${theme}]`, () => {
      beforeEach(() => {
        if (theme === 'dark') {
          document.documentElement.removeAttribute('data-theme');
        } else {
          document.documentElement.setAttribute('data-theme', theme);
        }
      });

      afterEach(() => {
        document.documentElement.removeAttribute('data-theme');
      });

      it(`className override: unlayered host class beats layered DS ${property}`, async () => {
        const hostClass = HOST_CLASS_BY_PROPERTY[property];
        const { wrapper } = mountWithOverrides((w) =>
          renderFor({ className: hostClass, wrapper: w }),
        );
        const el = wrapper.querySelector(`[data-slot="${classSlot}"]`);
        expect(el).not.toBeNull();
        expect(getCss(el!, key)).toBe(HOST_OVERRIDE_RGB);
        await snap(theme, `classname-${property}`);
      });

      it(`data-slot override: unlayered [data-slot="${slot}"] selector beats layered DS ${property}`, async () => {
        const tag = injectStyle(`[data-slot="${slot}"] { ${property}: ${SLOT_OVERRIDE_RGB}; }`);
        try {
          const { wrapper } = mountWithOverrides((w) => renderFor({ wrapper: w }));
          const el = wrapper.querySelector(`[data-slot="${slot}"]`);
          expect(el).not.toBeNull();
          expect(getCss(el!, key)).toBe(SLOT_OVERRIDE_RGB);
          await snap(theme, `dataslot-${property}`);
        } finally {
          tag.remove();
        }
      });

      it(`token override: ${token} cascades into ${property} on [data-slot="${slot}"]`, async () => {
        const { wrapper } = mountWithOverrides((w) => renderFor({ wrapper: w }), {
          tokenOverrides: { [token]: TOKEN_OVERRIDE_RGB },
        });
        const el = wrapper.querySelector(`[data-slot="${slot}"]`);
        expect(el).not.toBeNull();
        expect(getCss(el!, key)).toBe(TOKEN_OVERRIDE_RGB);
        await snap(theme, `token-${property}`);
      });

      it(`tailwind compatibility: utilities layer beats onersoft.ds across ${[
        property,
        ...TAILWIND_GENERIC_CHECKS.map((c) => c.property),
      ].join(' / ')}`, async () => {
        const { className: surfaceUtil, expected: surfaceExpected } =
          TAILWIND_CLASS_BY_PROPERTY[property];
        /* DS draws border-color via the `border` shorthand at 1px width.
         * `border-2` keeps the border visible so cross-browser computed
         * border-top-color comparison stays meaningful. */
        const surfaceWithBorder =
          property === 'border-color' ? `${surfaceUtil} border-2` : surfaceUtil;
        const fullClassName = [
          surfaceWithBorder,
          ...TAILWIND_GENERIC_CHECKS.map((c) => c.className),
        ].join(' ');
        const { wrapper } = mountWithOverrides((w) =>
          renderFor({ className: fullClassName, wrapper: w }),
        );
        const el = wrapper.querySelector(`[data-slot="${classSlot}"]`);
        expect(el).not.toBeNull();
        expect(getCss(el!, key)).toBe(surfaceExpected);
        for (const check of TAILWIND_GENERIC_CHECKS) {
          expect(getCss(el!, check.property)).toBe(check.expected);
        }
        await snap(theme, `tailwind-${property}`);
      });
    });
  }
}
