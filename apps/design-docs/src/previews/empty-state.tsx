'use client'

import { EmptyState, Button } from '@onersoft/design-system'

export function EmptyStateDefault() {
  return (
    <EmptyState>
      <EmptyState.Title>No messages yet</EmptyState.Title>
      <EmptyState.Description>
        Your first message will appear here.
      </EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="ghost">Notification settings</Button>
        <Button>New message</Button>
      </EmptyState.Actions>
    </EmptyState>
  )
}

export function EmptyStateSearch() {
  return (
    <EmptyState>
      <EmptyState.Title>No results for "radix"</EmptyState.Title>
      <EmptyState.Description>Try a different keyword or adjust the filters.</EmptyState.Description>
      <EmptyState.Actions>
        <Button variant="ghost">Reset filters</Button>
      </EmptyState.Actions>
    </EmptyState>
  )
}
