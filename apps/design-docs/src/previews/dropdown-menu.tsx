'use client';

import { DropdownMenu, Button } from '@onersoft/ui';

export function DropdownMenuDefault() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary">Options</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Label>Workspace</DropdownMenu.Label>
          <DropdownMenu.Item>
            New file
            <DropdownMenu.Shortcut>⌘N</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            Duplicate
            <DropdownMenu.Shortcut>⌘D</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
