import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Spinner } from './Spinner';

describe('Spinner e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Spinner,
    renderFor: ({ className }) => <Spinner className={className} />,
  });
});
