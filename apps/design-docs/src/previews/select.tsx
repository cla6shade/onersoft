'use client';

import { Select } from '@onersoft/ui';

export function SelectDefault() {
  return (
    <Select.Root defaultValue="balanced">
      <Select.Trigger aria-label="Profile" style={{ minWidth: 220 }}>
        <Select.Value placeholder="Select profile..." />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <Select.Group>
              <Select.Label>Performance</Select.Label>
              <Select.Item value="efficient">Efficient</Select.Item>
              <Select.Item value="balanced">Balanced</Select.Item>
              <Select.Item value="performance">Performance</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Experimental</Select.Label>
              <Select.Item value="turbo">Turbo</Select.Item>
              <Select.Item value="max" disabled>
                Max (coming soon)
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
