import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Spinner } from './Spinner'

describe('Spinner a11y', () => {
  it('has no axe violations across sizes', async () => {
    const { container } = render(
      <div>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
