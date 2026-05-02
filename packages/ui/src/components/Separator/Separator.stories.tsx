import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';
import styles from './Separator.stories.module.css';

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Visual and semantic divider between groups of content. Horizontal by default; pass `orientation="vertical"` for inline dividers (give it a height — vertical separators do not size themselves). Built on Radix Separator. Use whitespace, not separators, for casual breaks; reserve this for genuine boundaries.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className={styles.demoCard}>
      <div className={styles.demoTitle}>Radix primitives</div>
      <div className={styles.demoCaption}>Accessible, unstyled building blocks.</div>
      <Separator className={styles.demoBlockSeparator} />
      <div className={styles.demoMetaRow}>
        <span>Docs</span>
        <Separator orientation="vertical" className={styles.demoVerticalSeparator} />
        <span>Source</span>
        <Separator orientation="vertical" className={styles.demoVerticalSeparator} />
        <span>Changelog</span>
      </div>
    </div>
  ),
};
