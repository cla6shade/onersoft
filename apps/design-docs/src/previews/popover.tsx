'use client'

import { Popover, Button, Input, Label } from '@onersoft/design-system'

export function PopoverDefault() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="secondary">Open popover</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
            <Label htmlFor="display-name">Display name</Label>
            <Input id="display-name" size="sm" defaultValue="Pedro Duarte" />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Popover.Close asChild>
                <Button size="sm" variant="ghost">Close</Button>
              </Popover.Close>
            </div>
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
