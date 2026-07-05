'use client';

import { useMemo, useState } from 'react';
import {
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Card,
  DropdownMenu,
  EmptyState,
  Input,
  Label,
  Separator,
  Skeleton,
  Toggle,
  ToggleGroup,
  Tooltip,
  toast,
} from '@onersoft/ui';
import { type AppUser, segments, users } from './data';
import styles from './dashboard.module.css';

const SearchGlyph = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    aria-hidden
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" strokeLinecap="round" />
  </svg>
);

function UserRow({ user }: { user: AppUser }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <li className={styles.row}>
      <Avatar.Root>
        <Avatar.Image src="" alt="" />
        <Avatar.Fallback>{user.initials}</Avatar.Fallback>
      </Avatar.Root>
      <div className={styles.rowMain}>
        <div className={styles.rowName}>
          {user.name}
          <Badge variant={user.statusVariant} size="sm">
            {user.statusLabel}
          </Badge>
        </div>
        <div className={styles.rowMeta}>
          <span className={styles.mono}>{user.email}</span> · {user.segment} · seen {user.seen}
        </div>
      </div>
      <div className={styles.rowActions}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="sm" aria-label={`Actions for ${user.name}`}>
              •••
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Label>{user.name}</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onSelect={() => toast(`Message sent to ${user.name}`)}>
                Send message
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => toast('Email copied', { description: user.email })}
              >
                Copy email <DropdownMenu.Shortcut>⌘C</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onSelect={() => setConfirmOpen(true)}>
                Suspend account
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Suspend {user.name}?</AlertDialog.Title>
            <AlertDialog.Description>
              The account will lose access immediately and all active sessions will be revoked. You
              can restore it later from the audit log.
            </AlertDialog.Description>
            <AlertDialog.Footer>
              <AlertDialog.Cancel asChild>
                <Button variant="ghost">Keep active</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button onClick={() => toast.warning(`${user.name} suspended`)}>Suspend</Button>
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </li>
  );
}

export function UsersTab() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const visible = useMemo(
    () =>
      users.filter(
        (u) =>
          (filter === 'all' || u.status === filter) &&
          (query.trim() === '' || u.name.toLowerCase().includes(query.trim().toLowerCase())),
      ),
    [filter, query],
  );

  return (
    <div className={`${styles.grid} ${styles.gridUsers}`}>
      <Card>
        <Card.Header>
          <div className={styles.cardHeadRow}>
            <div>
              <Card.Eyebrow>Directory</Card.Eyebrow>
              <Card.Title>App users</Card.Title>
              <Card.Description>
                {visible.length} of {users.length} accounts shown.
              </Card.Description>
            </div>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Toggle
                  size="sm"
                  pressed={loading}
                  onPressedChange={setLoading}
                  aria-label="Simulate loading state"
                >
                  Refresh
                </Toggle>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="left">Preview the loading state</Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        </Card.Header>
        <Card.Body>
          <div className={styles.fieldCol} style={{ marginBottom: 'var(--ds-space-4)' }}>
            <Label htmlFor="user-search">Search</Label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 'var(--ds-space-3)',
                  color: 'var(--ds-color-fg-subtle)',
                  display: 'inline-flex',
                }}
              >
                {SearchGlyph}
              </span>
              <Input
                id="user-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by name"
                style={{ paddingLeft: 'var(--ds-space-8)' }}
              />
            </div>
            <ToggleGroup.Root
              type="single"
              value={filter}
              onValueChange={(v) => v && setFilter(v)}
              aria-label="Filter by status"
            >
              <ToggleGroup.Item value="all">All</ToggleGroup.Item>
              <ToggleGroup.Item value="active">Active</ToggleGroup.Item>
              <ToggleGroup.Item value="idle">Idle</ToggleGroup.Item>
              <ToggleGroup.Item value="offline">Offline</ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {loading && (
            <ul className={styles.listReset}>
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className={styles.row}>
                  <Skeleton variant="circle" width={40} />
                  <div
                    className={styles.rowMain}
                    style={{ display: 'grid', gap: 'var(--ds-space-2)' }}
                  >
                    <Skeleton variant="text" width="42%" />
                    <Skeleton variant="text" width="66%" />
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!loading && visible.length === 0 && (
            <EmptyState>
              <EmptyState.Media>{SearchGlyph}</EmptyState.Media>
              <EmptyState.Title>No matching users</EmptyState.Title>
              <EmptyState.Description>
                No accounts match this filter. Clear the search or choose a different status.
              </EmptyState.Description>
              <EmptyState.Actions>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setQuery('');
                    setFilter('all');
                  }}
                >
                  Reset filters
                </Button>
              </EmptyState.Actions>
            </EmptyState>
          )}
          {!loading && visible.length > 0 && (
            <ul className={styles.listReset}>
              {visible.map((u, i) => (
                <li key={u.id}>
                  {i > 0 ? <Separator /> : null}
                  <UserRow user={u} />
                </li>
              ))}
            </ul>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Eyebrow>Composition</Card.Eyebrow>
          <Card.Title>Segments</Card.Title>
          <Card.Description>Share of the 2,418 accounts active today.</Card.Description>
        </Card.Header>
        <Card.Body>
          <div style={{ display: 'grid', gap: 'var(--ds-space-4)' }}>
            {segments.map((seg) => (
              <div key={seg.label} className={styles.segRow}>
                <div className={styles.segLine}>
                  <span
                    style={{
                      color: 'var(--ds-color-fg-default)',
                      fontWeight: 'var(--ds-weight-medium)',
                    }}
                  >
                    {seg.label}
                  </span>
                  <span className={styles.mono}>
                    {seg.count} · {seg.share}%
                  </span>
                </div>
                <div className={styles.segBar}>
                  <div className={styles.segFill} style={{ width: `${seg.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
        <Card.Footer>
          <Button variant="ghost" size="sm" onClick={() => toast('Opening segment builder')}>
            Manage segments
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
