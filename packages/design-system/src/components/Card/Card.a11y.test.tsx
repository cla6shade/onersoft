import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { runAxe } from '../../test/axe'
import { Card } from './Card'

describe('Card a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <Card>
        <Card.Header>
          <Card.Eyebrow>Section</Card.Eyebrow>
          <Card.Title>Card title</Card.Title>
          <Card.Description>Supporting description goes here.</Card.Description>
        </Card.Header>
        <Card.Body>Body content.</Card.Body>
      </Card>,
    )
    const results = await runAxe(container)
    expect(results.violations).toEqual([])
  })
})
