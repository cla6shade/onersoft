import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from '.'

const meta: Meta = {
  title: 'Primitives/Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Switches between sibling content panels under a shared heading. The active trigger is underlined; non-active triggers are de-emphasized but legible. Pass `orientation="vertical"` on `Root` for sidebar-style tab lists. Built on Radix Tabs with full keyboard navigation (Arrow keys, Home/End).',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="overview">
      <Tabs.List aria-label="Project sections">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Project overview content.</Tabs.Content>
      <Tabs.Content value="activity">Recent activity across the project.</Tabs.Content>
      <Tabs.Content value="settings">Configuration and preferences.</Tabs.Content>
    </Tabs.Root>
  ),
}
