import { describe } from 'vitest';
import { render } from '@testing-library/react';
import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { AlertDialog } from '.';
import { Button } from '../Button';

describe('AlertDialog e2e', () => {
  runComponentMatrix({
    ...componentMatrix.AlertDialog,
    renderFor: ({ className, wrapper }) => (
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Trigger asChild>
          <Button variant="secondary">Delete</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal container={wrapper}>
          <AlertDialog.Overlay />
          <AlertDialog.Content className={className}>
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
      </AlertDialog.Root>
    ),
  });
});
