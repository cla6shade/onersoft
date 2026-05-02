import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Progress } from './Progress';

describe('Progress e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Progress,
    renderFor: ({ className }) => (
      <Progress value={62} aria-label="Upload progress" className={className} />
    ),
  });
});
