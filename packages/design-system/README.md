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

Peer dependencies:

| Peer | 버전 | 비고 |
| --- | --- | --- |
| `react` | `^19` | required |
| `react-dom` | `^19` | required |
| `react-hook-form` | `^7.74` | optional — `Form` 컴포넌트를 사용할 때만 |

---

## 사용

### 1. 진입점 import — CSS 자동 포함

```tsx
import { Button } from '@onersoft/design-system';

export default function App() {
  return <Button variant="primary">시작하기</Button>;
}
```

각 컴포넌트는 진입점에서 자신의 CSS를 함께 import합니다. `package.json`에 `sideEffects: ["**/*.css"]`이 선언되어 있어 번들러(Vite, Next.js, Webpack)는 라이브러리 CSS를 자동으로 트리에 포함합니다. 별도 CSS import는 필요하지 않습니다.

배럴 진입점(`'@onersoft/design-system'`)을 import하면 토큰 CSS(`tokens.css`)도 함께 주입됩니다. 컴포넌트별 진입점(`'@onersoft/design-system/Button'` 등)만 사용하는 경우에는 토큰을 별도로 import하세요.

### 2. 토큰 CSS만 별도 import

CSS-only 환경(SSR layout 단계, MDX, 외부 페이지) 또는 컴포넌트별 import만 사용하는 경우:

```ts
import '@onersoft/design-system/tokens.css';
```

이 파일은 `--ds-*` 토큰 정의와 `:root[data-theme='light']` 분기를 모두 포함합니다.

### 3. 테마 전환 — `data-theme` 속성

DS는 ThemeProvider를 export하지 않습니다. 토큰 CSS는 `<html data-theme="light">` 또는 `<html data-theme="dark">` 속성에 따라 분기되도록 작성되어 있고, 호스트 앱이 그 속성을 어떻게 토글할지를 직접 결정합니다.

Next.js 앱이라면 [`next-themes`](https://github.com/pacanukeyism/next-themes)를 권장합니다:

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes';
import '@onersoft/design-system/tokens.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

요점은 `attribute="data-theme"`. `next-themes`가 SSR FOUC 방지 스크립트를 자동으로 주입합니다. 직접 구현하더라도 첫 페인트 전에 `<html>`에 `data-theme` 속성이 찍혀 있어야 토큰 분기가 정상 동작합니다.

### 4. Toast 사용 시 — `<Toaster />` 마운트

명령형 `toast()` API를 사용하려면 루트 어딘가에 `<Toaster />`를 한 번 마운트하세요.

```tsx
import { Toaster, toast } from '@onersoft/design-system';

<>
  <Toaster />
  <Button onClick={() => toast.success('저장됨')}>저장</Button>
</>;
```

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

브랜드 색·표면·텍스트를 갈아끼우려면 **raw 토큰**을 override 하세요. 의미적 alias(`--ds-color-accent`, `--ds-color-bg-surface`, `--ds-color-fg-default` 등)는 raw 토큰에서 `var()` 또는 `color-mix()`로 파생되므로 자동으로 반영됩니다.

| Raw 토큰 | 영향 받는 semantic |
| --- | --- |
| `--color-brand-primary` | `--ds-color-accent` 및 hover/pressed/disabled/soft 변종, `--ds-color-border-accent`, `--ds-ring-color` |
| `--color-brand-primary-muted` | `--ds-color-accent-muted` |
| `--color-surface-base` | `--ds-color-bg-surface/-elevated/-overlay/-sunken`, `--ds-color-surface-hover/-pressed`, `--ds-color-elevated-hover`, `--ds-ring-offset-color`, `--ds-color-fg-subtle` (mix 한 축) |
| `--color-text-base` | `--ds-color-fg-default`, `--ds-color-border-default/-strong` |
| `--color-text-muted` | `--ds-color-fg-muted`, `--ds-color-fg-subtle` (mix 한 축) |
| `--color-accent-fg` | `--ds-color-accent-fg` |

> `--color-text-base`와 `--color-accent-fg`는 명도가 정반대인 짝(본문 ↔ accent 위 텍스트)입니다. 자동 파생 관계가 아니므로 한쪽을 override하면 다른 쪽도 의식적으로 함께 갈아끼워야 대비가 유지됩니다.

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

### Cascade layer

DS의 모든 토큰·컴포넌트 CSS는 `@layer onersoft.ds` 안에 들어 있습니다. 호스트가 unlayered CSS로 작성하면 specificity 싸움 없이 자동으로 우선합니다. 호스트 측에서 layer 순서를 명시하고 싶다면 진입점에서:

```css
@layer onersoft.ds, app;
```

이렇게 선언하면 `app` layer 규칙이 DS 위로 올라옵니다.

---

## 스타일 hook (`data-slot`)

DS 컴포넌트는 CSS Modules로 격리되어 있어 클래스명이 해싱됩니다. 호스트가 외부 CSS에서 안정적으로 타겟팅할 수 있도록 모든 가시 part에 **`data-slot` 속성**을 부여합니다. 토큰 override만으로 부족한 케이스(특정 인스턴스만 미세 조정, 합성 컴포넌트의 한 part만 변경 등)에 사용하세요.

### 명명 규칙

`data-slot="<component-kebab>-<part-kebab>"`. 단일 part 컴포넌트는 컴포넌트명만 사용합니다.

| 컴포넌트 | slot 예 |
| --- | --- |
| 단일 part | `button`, `input`, `textarea`, `badge`, `kbd`, `label`, `spinner`, `skeleton`, `separator` |
| Dialog / AlertDialog | `dialog-overlay`, `dialog-content`, `dialog-title`, `dialog-description`, `dialog-trigger`, `dialog-close`, `dialog-footer` (AlertDialog는 `alert-dialog-*`) |
| Select | `select-trigger`, `select-content`, `select-viewport`, `select-item`, `select-item-text`, `select-indicator`, `select-icon`, `select-label`, `select-separator`, `select-scroll-up-button`, `select-scroll-down-button` |
| DropdownMenu / Menubar | `dropdown-menu-trigger`, `dropdown-menu-content`, `dropdown-menu-item`, `dropdown-menu-checkbox-item`, `dropdown-menu-radio-item`, `dropdown-menu-item-indicator`, `dropdown-menu-label`, `dropdown-menu-separator`, `dropdown-menu-shortcut`, `dropdown-menu-sub-trigger`, `dropdown-menu-sub-content` (Menubar는 `menubar-*`) |
| NavigationMenu | `navigation-menu-list`, `navigation-menu-item`, `navigation-menu-trigger`, `navigation-menu-link`, `navigation-menu-content`, `navigation-menu-viewport` |
| Toast | `toast-viewport`, `toast`, `toast-title`, `toast-description`, `toast-action`, `toast-close` |
| Tabs | `tabs-list`, `tabs-trigger`, `tabs-content` |
| Accordion | `accordion-item`, `accordion-trigger`, `accordion-content`, `accordion-header` |
| Card | `card`, `card-header`, `card-eyebrow`, `card-title`, `card-description`, `card-body`, `card-footer` |
| EmptyState | `empty-state`, `empty-state-media`, `empty-state-title`, `empty-state-description`, `empty-state-actions` |
| Form | `form-item`, `form-label`, `form-control`, `form-description`, `form-message` |

전체 목록은 각 컴포넌트의 `*.tsx` 소스를 참고하세요. 모든 가시 part에 일관되게 부여되어 있습니다 (Portal·Provider 등 DOM을 렌더하지 않는 part는 제외).

### 사용 예

```css
/* 호스트 글로벌 CSS — 해싱 영향 받지 않음 */
[data-slot='dialog-overlay'] {
  backdrop-filter: blur(8px);
}

[data-slot='select-indicator'] {
  color: var(--my-brand-accent);
}

/* Radix가 부여하는 data-state 등과 조합 */
[data-slot='dropdown-menu-item'][data-highlighted] {
  background: var(--my-hover-bg);
}

[data-slot='dialog-content'][data-state='open'] {
  /* 열림 상태 한정 스타일 */
}
```

### 가이드

- **호스트는 슬롯 이름을 안정적인 API로 간주**할 수 있습니다. DS는 part가 사라지지 않는 한 슬롯명을 유지합니다.
- **인스턴스 한정**으로 적용하려면 호스트가 자신의 wrapper에 클래스를 두고 그 후손 슬롯을 타겟하세요:
  ```css
  .my-confirm-dialog [data-slot='dialog-content'] {
    max-width: 24rem;
  }
  ```
- **`!important`는 거의 필요 없습니다.** DS CSS는 `@layer onersoft.ds` 안에 있고 호스트의 unlayered CSS는 layered CSS를 항상 이깁니다.
- **`asChild`를 사용한 경우** Radix Slot이 `data-slot`을 consumer 자식 요소에 머지합니다. 즉 `<Button asChild><a /></Button>`는 `<a data-slot="button" />`이 됩니다.

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
| Surface | `--ds-color-bg-surface`, `--ds-color-bg-elevated`, `--ds-color-bg-sunken`, `--ds-color-bg-overlay` |
| Foreground | `--ds-color-fg-default`, `--ds-color-fg-muted`, `--ds-color-fg-subtle` |
| Accent | `--ds-color-accent`, `--ds-color-accent-fg`, `--ds-color-accent-muted`, `--ds-color-accent-hover/pressed/disabled/soft/soft-hover` |
| Border | `--ds-color-border-default/strong/accent` |
| Status | `--ds-color-danger`, `--ds-color-success`, `--ds-color-warning`, `--ds-color-info` (각 `*-fg` 포함) |
| Focus ring | `--ds-ring-width`, `--ds-ring-offset`, `--ds-ring-color`, `--ds-ring-offset-color`, `--ds-shadow-focus` |
| Shadow | `--ds-shadow-xs/sm/md/lg` |
| Overlay | `--ds-color-overlay`, `--ds-color-overlay-scrim` |
| Brand (raw) | `--ds-brand-hue`, `--ds-brand-chroma`, `--color-brand-primary`, `--color-brand-primary-muted`, `--color-surface-base`, `--color-text-base`, `--color-text-muted`, `--color-accent-fg` |

`prefers-reduced-motion`과 `prefers-contrast: more` 분기가 자동 적용됩니다 (모션 토큰은 0ms로, border/muted text는 한 단 강하게).

---

## 컴포넌트

### 단일 export

`Button`, `Input`, `Textarea`, `Label`, `Avatar`, `Badge`, `Kbd`, `Separator`, `Progress`, `Toggle`, `Checkbox`, `Switch`, `Slider`, `Spinner`, `Skeleton`

### 합성 export (namespace)

`Dialog`, `AlertDialog`, `Tooltip`, `Popover`, `DropdownMenu`, `Menubar`, `NavigationMenu`, `Select`, `RadioGroup`, `ToggleGroup`, `Tabs`, `Accordion`, `Card`, `EmptyState`

### Toast

`Toast` (namespace), `Toaster` (mount-once viewport), `toast` (imperative API: `toast()`, `toast.success()`, `.warning()`, `.error()`, `.info()`, `.dismiss()`, `.dismissAll()`)

### Form (react-hook-form 연동)

`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`. `react-hook-form`을 peer로 받습니다 — 사용할 때만 설치하세요.

### 합성 컴포넌트 사용 예

```tsx
import { Dialog, Button } from '@onersoft/design-system';

<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button>열기</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>제목</Dialog.Title>
      <Dialog.Description>설명</Dialog.Description>
      <Dialog.Close asChild>
        <Button variant="ghost">닫기</Button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>;
```

각 컴포넌트의 props·스토리는 Storybook 또는 `apps/design-docs`에서 확인하세요.

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
  Foo.tsx              # forwardRef + clsx, ComponentPropsWithoutRef로 prop 확장
  Foo.module.css       # 모든 색·스페이싱은 var(--ds-*)
  Foo.stories.tsx      # CSF3 + tags: ['autodocs']
  Foo.a11y.test.tsx    # axe 스모크 테스트
  index.ts             # re-export
```

그리고 `src/index.ts`에 export를 추가하세요. 컴포넌트별 진입점은 `vite.config.ts`가 `src/components/*/index.ts`를 자동으로 스캔합니다.

---

## 설계 원칙

루트 [`.impeccable.md`](../../.impeccable.md)에 brand voice·anti-references·design principles가 정리되어 있습니다. 새 컴포넌트나 토큰을 추가할 때 반드시 참고하세요.
