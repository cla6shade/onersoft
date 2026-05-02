import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { ToggleGroup } from '.';

describe('ToggleGroup a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <ToggleGroup.Root type="single" defaultValue="grid" aria-label="View mode">
          <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
          <ToggleGroup.Item value="list">List</ToggleGroup.Item>
        </ToggleGroup.Root>
        <ToggleGroup.Root type="multiple" defaultValue={['bold']} aria-label="Formatting">
          <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
          <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
