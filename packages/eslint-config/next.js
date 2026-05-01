import { configs as airbnb, plugins } from 'eslint-config-airbnb-extended';
import prettier from 'eslint-config-prettier';
import { baseRules, reactRules, devFileRules } from './legacy-rule-overrides.js';

export default [
  plugins.stylistic,
  plugins.importX,
  plugins.node,
  ...airbnb.base.all,
  ...airbnb.react.all,
  ...airbnb.next.all,
  prettier,
  baseRules,
  reactRules,
  devFileRules,
];
