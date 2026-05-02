import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Accordion } from '.';

describe('Accordion e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Accordion,
    renderFor: ({ className }) => (
      <Accordion.Root type="single" collapsible defaultValue="a">
        <Accordion.Item value="a">
          <Accordion.Header>
            <Accordion.Trigger className={className}>First</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>First panel content.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Header>
            <Accordion.Trigger>Second</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Second panel content.</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    ),
  });
});
