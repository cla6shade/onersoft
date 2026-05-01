import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { DropdownMenu } from '.';
import { Button } from '../Button';

describe('DropdownMenu a11y', () => {
  it('has no axe violations when open', async () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger asChild>
          <Button variant="secondary">Options</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="start">
            <DropdownMenu.Label>View</DropdownMenu.Label>
            <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>,
    );
    // Scope to the portal'd menu — the trigger button has its own a11y test.
    // Radix wraps the trigger in aria-hidden while focus is trapped in the menu,
    // which axe flags as aria-hidden-focus despite Radix's focus management.
    const results = await runAxe(screen.getByRole('menu'));
    expect(results.violations).toEqual([]);
  });
});
