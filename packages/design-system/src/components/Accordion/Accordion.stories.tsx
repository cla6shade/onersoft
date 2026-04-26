import type { Meta, StoryObj } from '@storybook/react-vite'
import demo from '../../stories/demo.module.css'
import { Accordion } from '.'

const meta: Meta = {
  title: 'Primitives/Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Vertically stacked, interactive headings that reveal an associated section of content. Built on Radix Accordion. Use `type="single" collapsible` for FAQ-style lists or `type="multiple"` when more than one panel may stay open at a time.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Accordion.Root type="single" collapsible defaultValue="a" className={demo.constrainMd}>
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
          <Accordion.Trigger>How do I theme it?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Set <code>data-theme=&quot;light&quot;</code> or <code>data-theme=&quot;dark&quot;</code> on the{' '}
          <code>&lt;html&gt;</code> element, or use the bundled ThemeProvider.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="c">
        <Accordion.Header>
          <Accordion.Trigger>Can I extend a component&apos;s styles?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Pass a <code>className</code> to any styled part — it&apos;s merged with <code>clsx</code>.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}
