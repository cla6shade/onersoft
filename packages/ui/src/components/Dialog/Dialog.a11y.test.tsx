import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Dialog } from '.';
import { Button } from '../Button';

describe('Dialog a11y', () => {
  it('has no axe violations when open', async () => {
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Trigger asChild>
          <Button>Open</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title>Confirm action</Dialog.Title>
            <Dialog.Description>This dialog uses Radix primitives.</Dialog.Description>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="ghost">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button>Confirm</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    const results = await runAxe(document.body);
    expect(results.violations).toEqual([]);
  });
});
