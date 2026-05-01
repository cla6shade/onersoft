import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Popover } from '.';
import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';

describe('Popover a11y', () => {
  it('has no axe violations when open', async () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger asChild>
          <Button variant="secondary">Open</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content aria-label="Edit display name">
            <Label htmlFor="display-name">Display name</Label>
            <Input id="display-name" defaultValue="Pedro" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>,
    );
    const results = await runAxe(document.body);
    expect(results.violations).toEqual([]);
  });
});
