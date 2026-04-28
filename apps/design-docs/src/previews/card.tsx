'use client'

import { Card, Button } from '@onersoft/design-system'

export function CardDefault() {
  return (
    <Card style={{ width: '100%', maxWidth: 360 }}>
      <Card.Header>
        <Card.Eyebrow>Monthly</Card.Eyebrow>
        <Card.Title>활성 사용자</Card.Title>
        <Card.Description>지난 30일 기준 · 직전 기간 대비 +8.4%</Card.Description>
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
          <Card.Title>대시보드 열기</Card.Title>
          <Card.Description>전체 카드가 클릭 영역입니다.</Card.Description>
        </Card.Header>
      </a>
    </Card>
  )
}
