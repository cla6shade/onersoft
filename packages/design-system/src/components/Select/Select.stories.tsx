import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '.';

const meta: Meta = {
  title: 'Primitives/Select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Native-feeling select with full keyboard support, type-ahead, and grouping. `Select.Label` must be wrapped in `Select.Group` together with its `Select.Item`s, otherwise Radix throws. For 2–5 mutually exclusive options where all choices fit on screen, prefer `RadioGroup`. Built on Radix Select.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select.Root defaultValue="balanced" defaultOpen>
      <Select.Trigger aria-label="Profile">
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
  ),
};
