import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { RadioGroup } from '.';
import { Label } from '../Label';

const opts = [
  { value: 'efficient', label: 'Efficient' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'performance', label: 'Performance' },
];

describe('RadioGroup e2e', () => {
  runComponentMatrix({
    ...componentMatrix.RadioGroup,
    renderFor: ({ className }) => (
      <RadioGroup.Root defaultValue="balanced" aria-label="Performance profile">
        {opts.map((opt, i) => (
          <div key={opt.value}>
            <RadioGroup.Item
              id={opt.value}
              value={opt.value}
              className={i === 0 ? className : undefined}
            />
            <Label htmlFor={opt.value}>{opt.label}</Label>
          </div>
        ))}
      </RadioGroup.Root>
    ),
  });
});
