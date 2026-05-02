import { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider, useTheme } from 'next-themes';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '../src/styles/tokens.css';
import './preview.css';

function ThemeSync({ theme }: { theme: 'light' | 'dark' }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);
  return null;
}

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'dark') as 'light' | 'dark';
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="onersoft-theme-storybook"
    >
      <ThemeSync theme={theme} />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: 'Design system theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
