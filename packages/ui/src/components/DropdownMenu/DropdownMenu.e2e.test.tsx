import { describe } from 'vitest';
import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { DropdownMenu } from '.';
import { Button } from '../Button';

describe('DropdownMenu e2e', () => {
  runComponentMatrix({
    ...componentMatrix.DropdownMenu,
    renderFor: ({ className, wrapper }) => (
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger asChild>
          <Button variant="secondary">Options</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal container={wrapper}>
          <DropdownMenu.Content align="start" className={className}>
            <DropdownMenu.Label>View</DropdownMenu.Label>
            <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Delete</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    ),
  });
});
