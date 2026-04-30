import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Toggle } from './Toggle';

describe('Toggle a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Toggle aria-label="Toggle bold">Bold</Toggle>
        <Toggle aria-label="Toggle italic" defaultPressed>
          Italic
        </Toggle>
      </div>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
