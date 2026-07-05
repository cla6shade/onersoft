'use client';

import { type ReactNode, useState } from 'react';
import {
  Avatar,
  Badge,
  DropdownMenu,
  Kbd,
  Select,
  Separator,
  Switch,
  Tooltip,
  toast,
} from '@onersoft/ui';
import { SignalStrip } from './signal-strip';
import { UsersTab } from './users-tab';
import { ServicesTab } from './services-tab';
import { AdminsTab } from './admins-tab';
import { AlertsView, OverviewView, SettingsView } from './extra-views';
import { ThemeToggle } from './theme-toggle';
import styles from './dashboard.module.css';

type SectionId = 'overview' | 'users' | 'services' | 'admins' | 'alerts' | 'settings';

const icon = (path: ReactNode) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    aria-hidden
  >
    {path}
  </svg>
);

const NAV: { id: SectionId; label: string; count?: number; glyph: ReactNode }[] = [
  {
    id: 'overview',
    label: 'Overview',
    glyph: icon(
      <>
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </>,
    ),
  },
  {
    id: 'users',
    label: 'Users',
    count: 5,
    glyph: icon(
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 20a5.5 5.5 0 0 1 11 0" strokeLinecap="round" />
        <path d="M16 5.5a3.2 3.2 0 0 1 0 6M17.5 20a5.5 5.5 0 0 0-2-4.3" strokeLinecap="round" />
      </>,
    ),
  },
  {
    id: 'services',
    label: 'Services',
    count: 4,
    glyph: icon(
      <>
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <path d="M7 7h.01M7 17h.01" strokeLinecap="round" />
      </>,
    ),
  },
  {
    id: 'admins',
    label: 'Admins',
    count: 3,
    glyph: icon(
      <>
        <path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </>,
    ),
  },
  {
    id: 'alerts',
    label: 'Alerts',
    count: 2,
    glyph: icon(
      <>
        <path
          d="M12 3a5 5 0 0 0-5 5c0 5-2 6-2 8h14c0-2-2-3-2-8a5 5 0 0 0-5-5Z"
          strokeLinejoin="round"
        />
        <path d="M10 20a2 2 0 0 0 4 0" strokeLinecap="round" />
      </>,
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    glyph: icon(
      <>
        <circle cx="12" cy="12" r="3" />
        <path
          d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
          strokeLinecap="round"
        />
      </>,
    ),
  },
];

const TITLE: Record<SectionId, string> = {
  overview: 'Overview',
  users: 'App users',
  services: 'Service health',
  admins: 'Administrators',
  alerts: 'Incidents & alerts',
  settings: 'Preferences',
};

export function Shell() {
  const [section, setSection] = useState<SectionId>('overview');
  const [live, setLive] = useState(true);
  const [region, setRegion] = useState('all');

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <span className={styles.brandGlyph} aria-hidden>
            <span />
          </span>
          Operations Console
        </div>

        <nav className={styles.nav} aria-label="Primary">
          <span className={styles.navHeading}>Monitor</span>
          {NAV.map((item) => {
            const active = item.id === section;
            return (
              <button
                key={item.id}
                type="button"
                className={active ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
                aria-current={active ? 'page' : undefined}
                onClick={() => setSection(item.id)}
              >
                <span className={styles.navIcon}>{item.glyph}</span>
                {item.label}
                {item.count !== undefined ? (
                  <Badge
                    variant={active ? 'accent' : 'neutral'}
                    size="sm"
                    className={styles.navCount}
                  >
                    {item.count}
                  </Badge>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button type="button" className={styles.navItem} aria-label="Account menu">
                <Avatar.Root>
                  <Avatar.Image src="" alt="" />
                  <Avatar.Fallback>SM</Avatar.Fallback>
                </Avatar.Root>
                <span className={styles.sidebarAccount}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 'var(--ds-text-sm)',
                      color: 'var(--ds-color-fg-default)',
                    }}
                  >
                    Sofia Marchetti
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 'var(--ds-text-xs)',
                      color: 'var(--ds-color-fg-muted)',
                    }}
                  >
                    Owner
                  </span>
                </span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="start" side="top">
                <DropdownMenu.Label>sofia@onersoft.dev</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onSelect={() => setSection('settings')}>
                  Preferences <DropdownMenu.Shortcut>⌘,</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => toast('Signed out')}>Sign out</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </aside>

      <div className={styles.main}>
        <div className={styles.mainTop}>
          <h1 className={styles.mainTitle}>{TITLE[section]}</h1>

          <span className={styles.toolbarSpacer} />

          <span className={styles.toolbarGroup}>
            <span
              className={live ? styles.liveDot : `${styles.liveDot} ${styles.liveDotOff}`}
              aria-hidden
            />
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <label
                  className={styles.metaLabel}
                  htmlFor="live-refresh"
                  style={{ cursor: 'pointer' }}
                >
                  {live ? 'Live · 30s' : 'Paused'}
                </label>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom">Auto-refresh interval</Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Switch
              id="live-refresh"
              checked={live}
              onCheckedChange={(next) => {
                setLive(next);
                toast(next ? 'Live refresh resumed' : 'Live refresh paused');
              }}
              aria-label="Toggle live refresh"
            />
          </span>

          <Select.Root value={region} onValueChange={setRegion}>
            <Select.Trigger aria-label="Region filter">
              <Select.Value />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content>
                <Select.Viewport>
                  <Select.Group>
                    <Select.Label>Region</Select.Label>
                    <Select.Item value="all">All regions</Select.Item>
                    <Select.Item value="us-east-1">us-east-1</Select.Item>
                    <Select.Item value="eu-west-1">eu-west-1</Select.Item>
                    <Select.Item value="ap-south-1">ap-south-1</Select.Item>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <span
            className={styles.metaLabel}
            style={{ display: 'inline-flex', gap: 'var(--ds-space-1)', alignItems: 'center' }}
          >
            <Kbd size="sm">⌘</Kbd>
            <Kbd size="sm">K</Kbd>
          </span>

          <Separator orientation="vertical" style={{ height: 'var(--ds-space-5)' }} />

          <ThemeToggle />
        </div>

        <div className={styles.inner} key={section}>
          <div className={styles.panel}>
            {section === 'overview' ? (
              <>
                <SignalStrip />
                <div style={{ marginTop: 'var(--ds-space-5)' }}>
                  <OverviewView />
                </div>
              </>
            ) : null}
            {section === 'users' ? <UsersTab /> : null}
            {section === 'services' ? <ServicesTab /> : null}
            {section === 'admins' ? <AdminsTab /> : null}
            {section === 'alerts' ? <AlertsView /> : null}
            {section === 'settings' ? <SettingsView /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
