import { configs as airbnb, plugins } from 'eslint-config-airbnb-extended';
import prettier from 'eslint-config-prettier';
import { baseRules, devFileRules } from './legacy-rule-overrides.js';

export default [
  plugins.stylistic,
  plugins.importX,
  plugins.node,
  plugins.typescriptEslint,
  ...airbnb.base.all,
  prettier,
  baseRules,
  devFileRules,
];
