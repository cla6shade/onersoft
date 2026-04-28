import { configs as airbnb, plugins } from 'eslint-config-airbnb-extended';
import prettier from 'eslint-config-prettier';
import { baseRules, reactRules, devFileRules } from './legacy-rule-overrides.js';

export default [
  plugins.stylistic,
  plugins.importX,
  plugins.node,
  plugins.typescriptEslint,
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  ...airbnb.base.all,
  ...airbnb.react.all,
  prettier,
  baseRules,
  reactRules,
  {
    ...devFileRules,
    rules: { ...devFileRules.rules, 'react-hooks/rules-of-hooks': 'off' },
  },
];
