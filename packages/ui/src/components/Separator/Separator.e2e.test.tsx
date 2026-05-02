import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Separator } from './Separator';

describe('Separator e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Separator,
    renderFor: ({ className }) => (
      <div>
        <p>Above</p>
        <Separator className={className} />
        <p>Below</p>
      </div>
    ),
  });
});
