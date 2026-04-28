import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Toast } from '.'

describe('Toast (primitive) a11y', () => {
  it('has no axe violations when shown', async () => {
    const { container } = render(
      <Toast.Provider swipeDirection="right" duration={4000}>
        <Toast.Root open>
          <Toast.Title>Saved successfully</Toast.Title>
          <Toast.Description>Your changes are now live.</Toast.Description>
          <Toast.Close aria-label="Dismiss">×</Toast.Close>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
