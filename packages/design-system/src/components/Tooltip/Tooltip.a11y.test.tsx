import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Tooltip } from '.';
import { Button } from '../Button';

describe('Tooltip a11y', () => {
  it('has no axe violations when open', async () => {
    render(
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger asChild>
            <Button variant="secondary">Hover me</Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="top">Keyboard shortcut: ⌘K</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>,
    );
    const results = await runAxe(document.body);
    expect(results.violations).toEqual([]);
  });
});
