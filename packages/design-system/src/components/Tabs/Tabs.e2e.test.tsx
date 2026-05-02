import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Tabs } from '.';

describe('Tabs e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Tabs,
    renderFor: ({ className }) => (
      <Tabs.Root defaultValue="settings">
        <Tabs.List aria-label="Project sections">
          <Tabs.Trigger value="overview" className={className}>
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Overview content.</Tabs.Content>
        <Tabs.Content value="activity">Activity content.</Tabs.Content>
        <Tabs.Content value="settings">Settings content.</Tabs.Content>
      </Tabs.Root>
    ),
  });
});
