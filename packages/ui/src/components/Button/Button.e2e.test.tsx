import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Button } from './Button';

describe('Button e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Button,
    renderFor: ({ className }) => <Button className={className}>Press</Button>,
  });
});
