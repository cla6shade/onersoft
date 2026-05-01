import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import Home from './page';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

describe('Home page', () => {
  it('renders the intro heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /To get started, edit the page.tsx file\./ }),
    ).toBeInTheDocument();
  });
});
