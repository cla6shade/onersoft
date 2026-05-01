import type { Meta, StoryObj } from '@storybook/react-vite';
import demo from '../../stories/demo.module.css';
import { Label } from '../Label';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Binary or tri-state selection control. Pass `defaultChecked="indeterminate"` (or `checked="indeterminate"` with a handler) to render the third state — useful for the master checkbox of a list when only some children are selected. Pair with `Label` and submit as part of a form via the auto-rendered hidden input. Built on Radix Checkbox.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <div className={demo.fieldRow}>
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">Accept terms of service</Label>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className={demo.fieldRow}>
      <Checkbox id="indeterminate" defaultChecked="indeterminate" />
      <Label htmlFor="indeterminate">Partially selected</Label>
    </div>
  ),
};
