'use client';

import { Tabs } from '@onersoft/design-system';

export function TabsDefault() {
  return (
    <Tabs.Root defaultValue="overview" style={{ width: '100%' }}>
      <Tabs.List aria-label="Project sections">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Project overview content.</Tabs.Content>
      <Tabs.Content value="activity">Recent activity across the project.</Tabs.Content>
      <Tabs.Content value="settings">Configuration and preferences.</Tabs.Content>
    </Tabs.Root>
  );
}
