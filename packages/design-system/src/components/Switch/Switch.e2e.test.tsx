import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Switch } from './Switch';
import { Label } from '../Label';

describe('Switch e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Switch,
    renderFor: ({ className }) => (
      <div>
        <Label htmlFor="airplane-mode">Airplane mode</Label>
        <Switch id="airplane-mode" className={className} />
      </div>
    ),
  });
});
