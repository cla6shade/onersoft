import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Label } from '../Label'
import { RadioGroup } from '.'

const meta: Meta = {
  title: 'Primitives/RadioGroup',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Mutually exclusive selection across a fixed, small set of options (typically 2–5). For more options or where a default value cannot be assumed, use `Select` instead. Pair every `Item` with a `Label` and apply `aria-label` (or a visible heading) to the `Root`. Built on Radix RadioGroup.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <RadioGroup.Root defaultValue="balanced" aria-label="Performance profile">
      {[
        { value: 'efficient', label: 'Efficient' },
        { value: 'balanced', label: 'Balanced' },
        { value: 'performance', label: 'Performance' },
      ].map((opt) => (
        <div key={opt.value} className={demo.fieldRow}>
          <RadioGroup.Item id={opt.value} value={opt.value} />
          <Label htmlFor={opt.value}>{opt.label}</Label>
        </div>
      ))}
    </RadioGroup.Root>
  ),
}
