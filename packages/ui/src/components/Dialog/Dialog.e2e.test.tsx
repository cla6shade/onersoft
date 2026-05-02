import { describe } from 'vitest';
import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Dialog } from '.';
import { Button } from '../Button';

describe('Dialog e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Dialog,
    renderFor: ({ className, wrapper }) => (
      <Dialog.Root defaultOpen>
        <Dialog.Trigger asChild>
          <Button>Open</Button>
        </Dialog.Trigger>
        <Dialog.Portal container={wrapper}>
          <Dialog.Overlay />
          <Dialog.Content className={className}>
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
      </Dialog.Root>
    ),
  });
});
