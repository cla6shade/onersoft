import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Label } from '../Label'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toggles a setting on or off, with the change taking effect immediately (e.g., notifications, dark mode). For "save later" forms or multi-step submissions, prefer `Checkbox`. Pair with a `Label` and consider supplementing with a status word so the state is unambiguous on small screens. Built on Radix Switch.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => (
    <div className={demo.fieldRowLg}>
      <Label htmlFor="airplane-mode">Airplane mode</Label>
      <Switch id="airplane-mode" defaultChecked />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className={demo.fieldRowLg}>
      <Label htmlFor="locked">Locked</Label>
      <Switch id="locked" disabled />
    </div>
  ),
}
