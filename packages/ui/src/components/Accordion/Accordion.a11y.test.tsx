import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Accordion } from '.';

describe('Accordion a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <Accordion.Root type="single" collapsible defaultValue="a">
        <Accordion.Item value="a">
          <Accordion.Header>
            <Accordion.Trigger>First</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>First panel content.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Header>
            <Accordion.Trigger>Second</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Second panel content.</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
