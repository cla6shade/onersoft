import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Label } from './Label';
import { Checkbox } from '../Checkbox';

describe('Label e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Label,
    renderFor: ({ className }) => (
      <div>
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter" className={className}>
          Subscribe to the newsletter
        </Label>
      </div>
    ),
  });
});
