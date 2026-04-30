import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Separator } from './Separator';

describe('Separator a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <p>Above</p>
        <Separator />
        <p>Below</p>
        <span>A</span>
        <Separator orientation="vertical" style={{ height: 16 }} />
        <span>B</span>
      </div>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
