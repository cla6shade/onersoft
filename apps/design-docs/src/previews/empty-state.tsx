'use client'

import { EmptyState, Button } from '@onersoft/design-system'

export function EmptyStateDefault() {
  return (
    <EmptyState>
      <EmptyState.Title>받은 메시지가 없습니다</EmptyState.Title>
      <EmptyState.Description>
        첫 메시지가 도착하면 여기에 표시됩니다.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="ghost">알림 설정</Button>
        <Button>메시지 작성</Button>
      </EmptyState.Actions>
    </EmptyState>
  )
}

export function EmptyStateSearch() {
  return (
    <EmptyState>
      <EmptyState.Title>"radix"에 대한 결과가 없습니다</EmptyState.Title>
      <EmptyState.Description>다른 키워드로 검색하거나 필터를 조정해보세요.</EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="ghost">필터 초기화</Button>
      </EmptyState.Actions>
    </EmptyState>
  )
}
