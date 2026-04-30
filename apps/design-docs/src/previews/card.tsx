'use client'

import { Card, Button } from '@onersoft/design-system'

export function CardDefault() {
  return (
    <Card style={{ width: '100%', maxWidth: 360 }}>
      <Card.Header>
        <Card.Eyebrow>Monthly</Card.Eyebrow>
        <Card.Title>Active users</Card.Title>
        <Card.Description>Last 30 days · +8.4% vs previous period</Card.Description>
      </Card.Header>
      <Card.Body>
        <strong style={{ fontSize: 'var(--ds-text-3xl)' }}>12,847</strong>
      </Card.Body>
      <Card.Footer>
        <Button variant="ghost" size="sm">View report</Button>
      </Card.Footer>
    </Card>
  )
}

export function CardInteractive() {
  return (
    <Card interactive asChild style={{ width: '100%', maxWidth: 360 }}>
      <a href="#dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
        <Card.Header>
          <Card.Title>Open dashboard</Card.Title>
          <Card.Description>The entire card is clickable.</Card.Description>
        </Card.Header>
      </a>
    </Card>
  )
}
