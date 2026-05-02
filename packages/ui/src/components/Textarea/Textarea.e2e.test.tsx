import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Textarea } from './Textarea';
import { Label } from '../Label';

describe('Textarea e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Textarea,
    renderFor: ({ className }) => (
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" rows={4} placeholder="Tell us" className={className} />
      </div>
    ),
  });
});
