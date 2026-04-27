import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Kbd } from './Kbd'

describe('Kbd a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <p>
        Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
      </p>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
