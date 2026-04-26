# @onersoft/design-system

`@onersoft` 프로덕트의 공통 UI 베이스. **Refined · Calm · Precise** 톤을 OKLCH 토큰과 Radix 프리미티브 위에 얹은 React 컴포넌트 라이브러리입니다.

이 패키지는 **중립 베이스**로 설계되었습니다. 호스트 앱은 토큰을 override해서 자신만의 브랜드 서체·색을 입히고, DS는 그 위에서 공통 인터랙션·접근성·테마 전환을 보장합니다.

설계 원칙은 저장소 루트의 [`.impeccable.md`](../../.impeccable.md)를 참고하세요.

---

## 설치

pnpm workspace 내부 패키지에서:

```jsonc
// package.json
{
  "dependencies": {
    "@onersoft/design-system": "workspace:*"
  }
}
```

Peer dependency: `react ^19`, `react-dom ^19`.

---

## 사용

### 1. 진입점 import — CSS 자동 포함

```tsx
import { Button, ThemeProvider } from '@onersoft/design-system'

export default function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">시작하기</Button>
    </ThemeProvider>
  )
}
```

`package.json`에 `sideEffects: ["**/*.css"]`이 선언되어 있어 번들러(Vite, Next.js, Webpack)는 라이브러리 CSS를 자동으로 트리에 포함합니다. 별도 CSS import는 필요하지 않습니다.

### 2. CSS만 별도 import (선택)

CSS-only 환경(SSR layout 단계, MDX, 외부 페이지) 등에서 토큰 CSS만 필요할 때:

```ts
import '@onersoft/design-system/styles.css'
```

### 3. ThemeProvider 셋업

```tsx
import { ThemeProvider } from '@onersoft/design-system'

<ThemeProvider defaultTheme="system" storageKey="onersoft-theme">
  {children}
</ThemeProvider>
```

| Prop | 기본값 | 설명 |
| --- | --- | --- |
| `defaultTheme` | `'system'` | `'system' \| 'light' \| 'dark'` |
| `storageKey` | `'onersoft-theme'` | localStorage 키 |

`useTheme()`로 현재/해석된 테마와 setter를 사용:

```tsx
import { useTheme } from '@onersoft/design-system'

const { theme, resolvedTheme, setTheme } = useTheme()
```

### 4. SSR — FOUC 방지

`ThemeProvider`가 SSR 시 첫 자식으로 사전 페인트 스크립트를 자동 주입하므로, 별도 설정 없이 첫 페인트 전에 `data-theme`이 적용됩니다. `<html>`에 `suppressHydrationWarning`만 추가해 주세요.

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

> 스크립트를 `<head>`에 직접 두고 싶다면 `getThemeInitScript()`를 export로 제공합니다. 일반적인 경우엔 사용할 필요가 없습니다.

---

## 테마 커스터마이징

### 서체 override

```css
:root {
  --ds-font-sans: 'Pretendard Variable', ui-sans-serif, system-ui, sans-serif;
  --ds-font-display: 'Your Display Face', var(--ds-font-sans);
}
```

`--ds-font-display`는 기본적으로 `--ds-font-sans`를 alias 하고 있어, display 서체를 별도로 지정하지 않으면 본문 서체와 일치합니다.

### 색 override

브랜드 색을 갈아끼우려면 **raw 토큰**(`--color-brand-primary`, `--color-surface-base`, `--color-text-muted`)을 override 하세요. 의미적 alias(`--ds-color-accent`, `--ds-color-bg-surface` 등)는 raw 토큰에서 파생되므로 자동으로 반영됩니다.

```css
/* 호스트 앱의 글로벌 CSS */
:root {
  /* dark (default) */
  --color-brand-primary: oklch(0.74 0.08 200);
  --color-surface-base: oklch(0.18 0.012 220);
}

:root[data-theme='light'] {
  --color-brand-primary: oklch(0.52 0.09 200);
  --color-surface-base: oklch(0.97 0.006 220);
}
```

> 의미적 alias를 직접 override하지 마세요. `--ds-color-accent-hover`, `--ds-color-accent-soft` 같은 파생 색이 raw 토큰을 기준으로 다시 계산되도록 두는 편이 일관성을 유지합니다.

---

## 토큰 인벤토리

전체 값은 [`src/styles/tokens.css`](./src/styles/tokens.css) 참조.

| 그룹 | 토큰 prefix |
| --- | --- |
| Typography | `--ds-font-*`, `--ds-text-*`, `--ds-leading-*`, `--ds-weight-*`, `--ds-tracking-*` |
| Spacing (4pt) | `--ds-space-0` … `--ds-space-9` |
| Radii | `--ds-radius-xs` … `--ds-radius-full` |
| Borders | `--ds-border-width-thin`, `--ds-border-width-medium` |
| Containers | `--ds-container-prose` (65ch), `--ds-container-narrow`, `--ds-container-default`, `--ds-container-wide` |
| Motion | `--ds-duration-*`, `--ds-ease-standard`, `--ds-ease-enter`, `--ds-ease-exit` |
| Z-index | `--ds-z-base` … `--ds-z-tooltip` |
| Control sizing | `--ds-control-height-sm/md/lg` |
| Surface | `--ds-color-bg-surface`, `--ds-color-bg-elevated`, `--ds-color-bg-sunken` |
| Foreground | `--ds-color-fg-default`, `--ds-color-fg-muted`, `--ds-color-fg-subtle` |
| Accent | `--ds-color-accent`, `--ds-color-accent-fg`, `--ds-color-accent-muted`, `--ds-color-accent-hover/pressed/disabled/soft/soft-hover` |
| Border | `--ds-color-border-default/strong/accent` |
| Status | `--ds-color-danger`, `--ds-color-success`, `--ds-color-warning`, `--ds-color-info` (각 `*-fg` 포함) |
| Focus ring | `--ds-ring-width`, `--ds-ring-offset`, `--ds-ring-color`, `--ds-ring-offset-color`, `--ds-shadow-focus` |
| Shadow | `--ds-shadow-xs/sm/md/lg` |
| Overlay | `--ds-color-overlay`, `--ds-color-overlay-scrim` |

`prefers-reduced-motion`과 `prefers-contrast: more` 분기가 자동 적용됩니다 (모션 토큰은 0ms로, border/muted text는 한 단 강하게).

---

## 컴포넌트

```ts
// 단일 export
Button, Input, Textarea, Label, Avatar, Badge, Kbd,
Separator, Progress, Toggle, Checkbox, Switch, Slider

// 합성 export (namespace)
Dialog, Tooltip, Popover, DropdownMenu, AlertDialog, Toast,
RadioGroup, Select, ToggleGroup, Tabs, Accordion
```

합성 컴포넌트는 다음과 같이 사용합니다:

```tsx
import { Dialog, Button } from '@onersoft/design-system'

<Dialog.Root>
  <Dialog.Trigger asChild><Button>열기</Button></Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>제목</Dialog.Title>
      <Dialog.Description>설명</Dialog.Description>
      <Dialog.Close asChild><Button variant="ghost">닫기</Button></Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

각 컴포넌트의 props·스토리는 Storybook에서 확인하세요.

---

## 개발

```bash
pnpm dev               # 라이브러리 watch 빌드
pnpm build             # 타입 체크 + 라이브러리 빌드 (dist/)
pnpm type-check        # 타입만 체크
pnpm test              # vitest
pnpm storybook         # Storybook (port 6006)
pnpm build-storybook   # 정적 Storybook 빌드
```

새 컴포넌트는 다음 구조를 따릅니다:

```
src/components/Foo/
  Foo.tsx           # forwardRef + clsx, ComponentPropsWithoutRef로 prop 확장
  Foo.module.css    # 모든 색·스페이싱은 var(--ds-*)
  Foo.stories.tsx   # CSF3 + tags: ['autodocs']
  index.ts          # re-export
```

그리고 `src/index.ts`에 export를 추가하세요.

---

## 설계 원칙

루트 [`.impeccable.md`](../../.impeccable.md)에 brand voice·anti-references·design principles가 정리되어 있습니다. 새 컴포넌트나 토큰을 추가할 때 반드시 참고하세요.
