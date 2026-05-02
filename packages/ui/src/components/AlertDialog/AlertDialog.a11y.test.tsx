import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { AlertDialog } from '.';
import { Button } from '../Button';

describe('AlertDialog a11y', () => {
  it('has no axe violations when open', async () => {
    render(
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Trigger asChild>
          <Button variant="secondary">Delete</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Delete?</AlertDialog.Title>
            <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel asChild>
                <Button variant="ghost">Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button>Delete</Button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>,
    );
    const results = await runAxe(document.body);
    expect(results.violations).toEqual([]);
  });
});
