import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Tabs } from '.';

describe('Tabs a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <Tabs.Root defaultValue="overview">
        <Tabs.List aria-label="Project sections">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">Overview content.</Tabs.Content>
        <Tabs.Content value="activity">Activity content.</Tabs.Content>
        <Tabs.Content value="settings">Settings content.</Tabs.Content>
      </Tabs.Root>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
