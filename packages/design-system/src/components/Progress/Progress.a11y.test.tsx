import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Progress } from './Progress'

describe('Progress a11y', () => {
  it('has no axe violations for determinate and indeterminate', async () => {
    const { container } = render(
      <div>
        <Progress value={62} aria-label="Upload progress" />
        <Progress value={null} aria-label="Loading" />
      </div>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
