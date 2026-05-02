import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Skeleton } from './Skeleton';

describe('Skeleton e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Skeleton,
    renderFor: ({ className }) => <Skeleton height={120} className={className} />,
  });
});
