import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Switch } from './Switch';
import { Label } from '../Label';

describe('Switch a11y', () => {
  it('has no axe violations when paired with a Label', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="airplane-mode">Airplane mode</Label>
        <Switch id="airplane-mode" defaultChecked />
      </div>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
