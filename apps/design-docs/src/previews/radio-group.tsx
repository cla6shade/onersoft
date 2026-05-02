'use client';

import { RadioGroup, Label } from '@onersoft/ui';

const options = [
  { value: 'efficient', label: 'Efficient' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'performance', label: 'Performance' },
];

export function RadioGroupDefault() {
  return (
    <RadioGroup.Root
      defaultValue="balanced"
      aria-label="Performance profile"
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      {options.map((opt) => (
        <div key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <RadioGroup.Item id={opt.value} value={opt.value} />
          <Label htmlFor={opt.value}>{opt.label}</Label>
        </div>
      ))}
    </RadioGroup.Root>
  );
}
