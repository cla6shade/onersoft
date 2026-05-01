import axe, { type RunOptions } from 'axe-core';

const COMPONENT_LEVEL_DISABLED_RULES: RunOptions['rules'] = {
  // Page-level concern, not the responsibility of an individual component test.
  region: { enabled: false },
};

export function runAxe(target: Element | Document = document.body, options: RunOptions = {}) {
  return axe.run(target, {
    ...options,
    rules: { ...COMPONENT_LEVEL_DISABLED_RULES, ...options.rules },
  });
}
