import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Button } from './Button'

describe('Button a11y', () => {
  it('has no axe violations for each variant', async () => {
    const { container } = render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
