import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}))

import Home from './page'

describe('Home page', () => {
  it('renders the intro heading', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /To get started, edit the page.tsx file\./ }),
    ).toBeInTheDocument()
  })
})
