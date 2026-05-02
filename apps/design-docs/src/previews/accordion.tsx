'use client';

import { Accordion } from '@onersoft/ui';

export function AccordionSingle() {
  return (
    <Accordion.Root type="single" collapsible defaultValue="a" style={{ width: '100%' }}>
      <Accordion.Item value="a">
        <Accordion.Header>
          <Accordion.Trigger>What is this design system?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          A token-driven set of accessible primitives wrapping radix-ui with CSS Modules.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Header>
          <Accordion.Trigger>How is it themed?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Through `--ds-*` CSS custom properties driven by the `data-theme` attribute on the html
          element (wire up `next-themes` with `attribute="data-theme"`).
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export function AccordionMultiple() {
  return (
    <Accordion.Root type="multiple" defaultValue={['a']} style={{ width: '100%' }}>
      <Accordion.Item value="a">
        <Accordion.Header>
          <Accordion.Trigger>Section A</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Open and close panels independently.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="b">
        <Accordion.Header>
          <Accordion.Trigger>Section B</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>More content here.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
