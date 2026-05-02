import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
/* `tailwind.css` first so its `@layer theme, base, onersoft.ds, ...`
 * order declaration registers layer positions before any other file
 * implicitly registers `onersoft.ds` (which would lock it in as the
 * weakest layer and let Preflight win over DS rules). */
import './src/test/fixtures/tailwind.css';
import './src/styles/tokens.css';
import './src/test/fixtures/host-overrides.css';

afterEach(() => {
  cleanup();
});
