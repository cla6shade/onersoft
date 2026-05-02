import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Input } from './Input';
import { Label } from '../Label';

describe('Input e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Input,
    renderFor: ({ className }) => (
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" className={className} />
      </div>
    ),
  });
});
