import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { RadioGroup } from '.';
import { Label } from '../Label';

describe('RadioGroup a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <RadioGroup.Root defaultValue="balanced" aria-label="Performance profile">
        {[
          { value: 'efficient', label: 'Efficient' },
          { value: 'balanced', label: 'Balanced' },
          { value: 'performance', label: 'Performance' },
        ].map((opt) => (
          <div key={opt.value}>
            <RadioGroup.Item id={opt.value} value={opt.value} />
            <Label htmlFor={opt.value}>{opt.label}</Label>
          </div>
        ))}
      </RadioGroup.Root>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
