// Vanilla observable store for brand hue/chroma. Both the corner BrandKnob
// and the inline knob inside the OKLCH section subscribe via
// useSyncExternalStore so they stay in sync.

export const HUE_DEFAULT = 232;
export const CHROMA_DEFAULT = 0.06;
export const HUE_MAX = 360;
export const CHROMA_MAX = 0.2;

export interface BrandState {
  hue: number;
  chroma: number;
}

export const BRAND_DEFAULTS: BrandState = { hue: HUE_DEFAULT, chroma: CHROMA_DEFAULT };
export const SSR_BRAND_SNAPSHOT: BrandState = BRAND_DEFAULTS;

let state: BrandState = { ...BRAND_DEFAULTS };
const listeners = new Set<() => void>();

function applyVars(hue: number, chroma: number) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--ds-brand-hue', String(hue));
  root.style.setProperty('--ds-brand-chroma', String(chroma));
}

export function getBrandState(): BrandState {
  return state;
}

export function setBrand(partial: Partial<BrandState>) {
  state = { ...state, ...partial };
  applyVars(state.hue, state.chroma);
  listeners.forEach((l) => l());
}

export function resetBrand() {
  setBrand(BRAND_DEFAULTS);
}

export function subscribeBrand(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
