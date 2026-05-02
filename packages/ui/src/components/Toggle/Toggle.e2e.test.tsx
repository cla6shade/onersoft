import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Toggle } from './Toggle';

describe('Toggle e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Toggle,
    renderFor: ({ className }) => (
      <Toggle aria-label="Toggle bold" className={className}>
        Bold
      </Toggle>
    ),
  });
});
