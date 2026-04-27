import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Slider } from './Slider'

describe('Slider a11y', () => {
  it('has no axe violations for single and range', async () => {
    const { container } = render(
      <div>
        <Slider defaultValue={[40]} min={0} max={100} step={1} aria-label="Volume" />
        <Slider defaultValue={[20, 80]} min={0} max={100} step={1} aria-label="Price range" />
      </div>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
