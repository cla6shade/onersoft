---
"@onersoft/ui": minor
---

Fix `--ds-color-bg-subtle` theme inconsistency. In dark it previously sat _above_ `surface` (mixed toward white) while in light it sat _below_ `surface`, so the token flipped sides between themes. It now mixes toward black in dark as well, sitting just below `surface` in both themes — giving one consistent elevation ladder (`sunken < subtle < surface < elevated`) regardless of theme. Visually this makes the `Switch` and `ToggleGroup` off-state tracks a subtle recessed well in dark mode; light is unchanged.
