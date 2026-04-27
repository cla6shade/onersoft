/**
 * airbnb-extended preset를 그대로 켜면 React 17 이전(JSX runtime 도입 전),
 * defaultProps 시절(TS optional 프로퍼티 도입 전), CommonJS 시대의 컨벤션을
 * 강제하는 룰이 대거 활성화됩니다. 이 파일은 그 중 우리 스택(React 19 + TS + ESM)
 * 에서 더 이상 의미가 없거나 안티패턴이 된 룰을 비활성화합니다.
 *
 * 새로운 룰을 끄려면 반드시 "왜 outdated/부적절한가"를 한 줄 코멘트로 남기세요.
 * 단순 "거슬려서 끔"이 쌓이면 이 파일의 의미가 사라집니다.
 */

/** Base 프리셋 — JS/TS 공통으로 outdated된 airbnb 룰. */
export const baseRules = {
  rules: {
    // 단일 export도 named가 IDE refactor에 안전. default 강요는 ESM 이전 관습.
    'import-x/prefer-default-export': 'off',
    'import-x/no-default-export': 'off',
    // 모듈 사이클은 빌드 단계에서 잡는 편이 정확. ESLint 휴리스틱 false positive 다수.
    'import-x/no-cycle': 'off',
    // 라이브러리 컨벤션(`_internal`)과 충돌.
    'no-underscore-dangle': 'off',
    // `void promise`는 floating promise 처리 표준 idiom.
    'no-void': ['error', { allowAsStatement: true }],
    // 모던 JS에서 일반적. airbnb의 historical 제약.
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    // 유틸 클래스/store 등에서 정당한 stateless method 다수.
    'class-methods-use-this': 'off',
    // TS의 narrowing이 더 정확. 명시적 early return을 자유롭게.
    'consistent-return': 'off',
    // Radix 같은 `export const Root = X.Root` 재export를 destructuring으로 강요해 가독성 저하.
    '@typescript-eslint/prefer-destructuring': 'off',
    // 함수 hoisting은 모던 JS에서 안전. 변수/클래스만 막는 것이 실용적.
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    // 타입 좁히기 위한 명시적 assertion이 정당한 경우가 많음.
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
  },
};

/** React 프리셋 — React 17+ 자동 JSX runtime / TS 타이핑 전 시절의 룰. */
export const reactRules = {
  rules: {
    // React 17+ automatic JSX runtime 이후 React import 불필요.
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    // TS의 optional 프로퍼티가 defaultProps를 대체. defaultProps는 deprecated.
    'react/require-default-props': 'off',
    // rest props spread는 DS primitive의 dominant 패턴.
    'react/jsx-props-no-spreading': 'off',
    // 우리 스택은 .tsx만 사용. airbnb 기본은 .jsx만 허용.
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    // arrow vs function declaration은 팀 취향. 강제할 가치 없음.
    'react/function-component-definition': 'off',
    // forwardRef + render prop 패턴 false positive 다수. asProps만 허용.
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    // 카피의 작은따옴표/큰따옴표는 HTML entity escape 불필요.
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    // 정적 리스트(데모/스토리)에서 index key는 정당.
    'react/no-array-index-key': 'off',
    // ThemeProvider처럼 외부 시스템(DOM)과 동기화하는 effect는 정당.
    'react-hooks/set-state-in-effect': 'off',
    // children을 forward하는 Title slot 컴포넌트는 정적 분석으로 검증 불가.
    'jsx-a11y/heading-has-content': 'off',
  },
};

/**
 * dev 파일(설정/테스트/스토리)에서 풀어주는 룰.
 * outdated 이슈는 아니지만 파일 성격상 적용이 부적절한 케이스.
 */
export const devFileRules = {
  files: [
    '**/*.config.{js,cjs,mjs,ts}',
    '**/*.{test,spec}.{ts,tsx,js,jsx}',
    '**/*.stories.{ts,tsx}',
    '**/.storybook/**',
    '**/vitest.setup.{ts,js}',
    '**/vitest.shims.d.ts',
  ],
  rules: {
    'import-x/no-extraneous-dependencies': 'off',
    'import-x/no-default-export': 'off',
    'import-x/prefer-default-export': 'off',
  },
};

