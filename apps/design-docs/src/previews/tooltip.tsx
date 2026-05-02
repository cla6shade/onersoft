'use client';

import { Tooltip, Button } from '@onersoft/ui';

export function TooltipDefault() {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button variant="secondary">Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="top">Keyboard shortcut: ⌘K</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
