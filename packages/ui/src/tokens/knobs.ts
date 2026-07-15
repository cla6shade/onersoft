import { knob } from './expressions';

/* === Brand knobs === */
export const brandHue = knob('--ds-brand-hue', { dark: 232, label: 'hue' });
export const brandChroma = knob('--ds-brand-chroma', { dark: 0.06, light: 0.07, label: 'chroma' });

/* === Derivation knobs (per-theme dials) === */

/** surface → elevated lightness lift */
export const elevateLift = knob('--ds-elevate-lift', { dark: 0.06, light: 0.015 });
/** what hover/pressed mix toward */
export const stateTint = knob('--ds-state-tint', { dark: 'white', light: 'black' });
/** hover mix strength; pressed = +10% */
export const stateMix = knob('--ds-state-mix', { dark: '12%', light: '5%' });
/** scrim black alpha; scrim-subtle = −20% */
export const scrimMix = knob('--ds-scrim-mix', { dark: '60%', light: '40%' });
/** fg-muted: text → surface mix ratio */
export const mutedMix = knob('--ds-muted-mix', { dark: '60%' });

export const brandKnobs = [brandHue, brandChroma];
export const derivationKnobs = [elevateLift, stateTint, stateMix, scrimMix, mutedMix];
