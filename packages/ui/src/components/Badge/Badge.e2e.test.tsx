import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Badge } from './Badge';

describe('Badge e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Badge,
    renderFor: ({ className }) => <Badge className={className}>Status</Badge>,
  });
});
