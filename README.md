# onersoft

`@onersoft` 프로덕트 웹 모노레포. 디자인 시스템과 그 위에서 동작하는 앱들을 한 저장소에서 관리합니다.

설계 톤은 [.impeccable.md](./.impeccable.md) — **Refined · Calm · Precise**.

---

## 구성

```
onersoft/
├── apps/
│   ├── landing/         # 마케팅 / 제품 랜딩 (Next.js 16)
│   └── design-docs/     # 디자인 시스템 문서 사이트 (Next.js 16 + fumadocs)
└── packages/
    ├── design-system/   # @onersoft/design-system — React 컴포넌트 + OKLCH 토큰
    ├── eslint-config/   # @onersoft/eslint-config
    └── typescript-config/  # @onersoft/typescript-config
```

| 패키지 | 역할 |
| --- | --- |
| [`@onersoft/design-system`](./packages/design-system) | Radix 기반 React 컴포넌트 라이브러리. cascade layer 토큰 + `data-slot` 스타일 hook |
| [`@onersoft/landing`](./apps/landing) | 제품 랜딩 페이지 |
| [`@onersoft/design-docs`](./apps/design-docs) | 토큰·컴포넌트 문서, Storybook을 보완하는 서사 문서 |
| `@onersoft/eslint-config` | 공유 ESLint flat config |
| `@onersoft/typescript-config` | 공유 `tsconfig` base |

---

## 요구사항

- **Node** ≥ 20.18
- **pnpm** 10.33+ (`packageManager` 필드로 고정)
- 모던 브라우저 (`oklch()` / `color-mix()` / cascade layer 사용 — Chrome/Edge 111+, Safari 16.2+, Firefox 113+)

---

## 시작

```bash
pnpm install            # 모든 워크스페이스 설치
pnpm dev                # 모든 앱 개발 서버 (turbo 병렬 실행)
pnpm build              # 모든 패키지·앱 빌드
pnpm test               # 모든 테스트 (vitest)
pnpm type-check         # 타입만 체크
pnpm lint               # ESLint
pnpm format             # prettier --write
```

특정 패키지만 작업할 때:

```bash
pnpm --filter @onersoft/design-system dev
pnpm --filter @onersoft/landing dev
pnpm --filter @onersoft/design-docs storybook   # (design-system이 노출)
```

Turbo가 task graph(`^build`)를 따라 의존성을 먼저 빌드하므로, 앱 dev 전에 별도 라이브러리 빌드를 실행할 필요는 없습니다.

---

## 워크스페이스 규칙

### 의존성 정책

- 공통 버전은 `pnpm-workspace.yaml`의 **catalog**로 고정합니다 (`"typescript": "catalog:"`). 새 공유 버전이 생기면 catalog에 추가하고 패키지에서 참조하세요.
- 라이브러리(`packages/*`)는 **peer dependency**로 런타임 라이브러리(React, Radix 등)를 선언합니다. 호스트 앱이 단일 인스턴스를 보장하도록 합니다.
- 앱(`apps/*`)은 워크스페이스 패키지를 `"workspace:*"`로 참조합니다.

### 새 패키지 추가

1. `apps/` 또는 `packages/` 아래에 디렉터리를 만듭니다 (`pnpm-workspace.yaml`의 glob에 자동 매칭).
2. `package.json`의 `name`은 `@onersoft/<kebab>` 패턴.
3. `tsconfig.json`은 `@onersoft/typescript-config`의 base를 extend.
4. ESLint는 `@onersoft/eslint-config`를 사용.

---

## 디자인 시스템

`packages/design-system`이 모든 UI의 단일 출처입니다. 토큰·테마·컴포넌트·슬롯 hook 사용법은 [packages/design-system/README.md](./packages/design-system/README.md) 참조.

핵심 약속:

- **토큰-퍼스트** — 호스트 앱은 `--ds-*` 토큰과 raw 색 토큰을 override 해서 자신의 브랜드를 입힙니다. 컴포넌트 클래스는 직접 만지지 않습니다.
- **`@layer onersoft.ds`** — 모든 DS CSS는 cascade layer 안에 있어 호스트의 unlayered CSS가 specificity 싸움 없이 우선합니다.
- **`data-slot`** — CSS Modules 해싱을 우회하는 안정적 스타일 hook. 슬롯 이름은 안정 API로 간주됩니다.
- **테마 분기** — `<html data-theme="light|dark">` 속성에 따라 토큰이 분기. DS는 ThemeProvider를 export하지 않습니다 (호스트가 `next-themes` 등으로 직접).

---

## 디렉터리별 진입점

| 작업 | 시작 지점 |
| --- | --- |
| 새 컴포넌트 추가 | [packages/design-system/src/components](./packages/design-system/src/components) — 기존 컴포넌트(예: `Button`)의 5-파일 구조(`*.tsx` / `*.module.css` / `*.stories.tsx` / `*.test.tsx` / `*.a11y.test.tsx` + `*.e2e.test.tsx`)를 따르세요 |
| 토큰 변경 | [packages/design-system/src/styles/tokens.css](./packages/design-system/src/styles/tokens.css) |
| 디자인 가이드 문서 | [apps/design-docs/content](./apps/design-docs) |
| 랜딩 카피·페이지 | [apps/landing/src](./apps/landing) |

---

## 테스트 전략

- **단위** (`*.test.tsx`) — vitest + jsdom + Testing Library
- **a11y** (`*.a11y.test.tsx`) — axe-core 위반 0
- **e2e/시각 회귀** (`*.e2e.test.tsx`) — `@vitest/browser` + Playwright. `runComponentMatrix`로 컴포넌트 단위 매트릭스 실행

CI에서는 `pnpm test`가 모든 프로젝트의 vitest 스위트를 turbo로 병렬 실행합니다.

---

## 라이선스

Private — `"private": true`. 외부 배포 계획이 생기면 패키지별 라이선스 필드를 추가하세요.
