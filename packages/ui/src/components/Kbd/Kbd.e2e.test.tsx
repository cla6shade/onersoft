import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Kbd } from './Kbd';

describe('Kbd e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Kbd,
    renderFor: ({ className }) => (
      <p>
        Press <Kbd className={className}>⌘</Kbd> + <Kbd>K</Kbd>
      </p>
    ),
  });
});
