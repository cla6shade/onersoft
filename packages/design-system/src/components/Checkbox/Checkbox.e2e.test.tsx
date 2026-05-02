import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Checkbox } from './Checkbox';
import { Label } from '../Label';

describe('Checkbox e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Checkbox,
    renderFor: ({ className }) => (
      <div>
        <Checkbox id="terms" className={className} />
        <Label htmlFor="terms">Accept terms of service</Label>
      </div>
    ),
  });
});
