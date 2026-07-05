'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Label,
  RadioGroup,
  Separator,
  Switch,
  toast,
} from '@onersoft/ui';
import { incidents, segments, services, type Service } from './data';
import styles from './dashboard.module.css';

function dotClass(state: Service['state']) {
  if (state === 'up') return `${styles.serviceDot} ${styles.dotUp}`;
  if (state === 'degraded') return `${styles.serviceDot} ${styles.dotDegraded}`;
  return `${styles.serviceDot} ${styles.dotDown}`;
}

export function OverviewView() {
  return (
    <div className={`${styles.grid} ${styles.gridUsers}`}>
      <Card>
        <Card.Header>
          <Card.Eyebrow>Fleet</Card.Eyebrow>
          <Card.Title>Service health</Card.Title>
          <Card.Description>Live status across all regions.</Card.Description>
        </Card.Header>
        <Card.Body>
          <ul className={styles.listReset}>
            {services.map((s, i) => (
              <li key={s.id}>
                {i > 0 ? <Separator /> : null}
                <div className={styles.row}>
                  <span className={dotClass(s.state)} aria-hidden />
                  <div className={styles.rowMain}>
                    <div className={`${styles.rowName} ${styles.mono}`}>{s.name}</div>
                    <div className={styles.rowMeta}>
                      {s.region} · uptime {s.uptime}
                    </div>
                  </div>
                  <Badge variant={s.stateVariant} size="sm">
                    {s.stateLabel}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Eyebrow>Composition</Card.Eyebrow>
          <Card.Title>User segments</Card.Title>
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
      </Card>
    </div>
  );
}

export function AlertsView() {
  return (
    <div style={{ maxWidth: '48rem' }}>
      <Card>
        <Card.Header>
          <Card.Eyebrow>Feed</Card.Eyebrow>
          <Card.Title>Incidents &amp; alerts</Card.Title>
          <Card.Description>
            Newest first. Expand for the current remediation status.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Accordion.Root type="single" collapsible defaultValue="i2">
            {incidents.map((inc) => (
              <Accordion.Item key={inc.id} value={inc.id}>
                <Accordion.Header>
                  <Accordion.Trigger>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--ds-space-2)',
                      }}
                    >
                      <Badge variant={inc.severity} size="sm">
                        {inc.severityLabel}
                      </Badge>
                      {inc.title}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <p style={{ margin: '0 0 var(--ds-space-2)', color: 'var(--ds-color-fg-muted)' }}>
                    {inc.detail}
                  </p>
                  <span className={styles.auditMeta}>{inc.time}</span>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Card.Body>
      </Card>
    </div>
  );
}

export function SettingsView() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [density, setDensity] = useState('comfortable');
  const [digest, setDigest] = useState(true);
  // Client-only mount flag: the theme preference control must not render
  // theme-dependent state during SSR/static export (avoids hydration mismatch).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div style={{ maxWidth: '40rem' }}>
      <Card>
        <Card.Header>
          <Card.Eyebrow>Console</Card.Eyebrow>
          <Card.Title>Preferences</Card.Title>
          <Card.Description>Applies to this browser only.</Card.Description>
        </Card.Header>
        <Card.Body>
          <div className={styles.controlCard}>
            <div className={styles.fieldCol}>
              <span className={styles.metaLabel} style={{ textTransform: 'none' }}>
                Appearance
              </span>
              <RadioGroup.Root
                value={mounted ? (theme ?? 'system') : 'system'}
                onValueChange={setTheme}
                aria-label="Theme preference"
              >
                {[
                  { v: 'light', l: 'Light' },
                  { v: 'dark', l: 'Dark' },
                  { v: 'system', l: 'Match system' },
                ].map((opt) => (
                  <div
                    key={opt.v}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-2)' }}
                  >
                    <RadioGroup.Item id={`theme-${opt.v}`} value={opt.v} />
                    <Label htmlFor={`theme-${opt.v}`}>{opt.l}</Label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>

            <Separator />

            <div className={styles.fieldCol}>
              <span className={styles.metaLabel} style={{ textTransform: 'none' }}>
                Row density
              </span>
              <RadioGroup.Root value={density} onValueChange={setDensity} aria-label="Row density">
                {[
                  { v: 'comfortable', l: 'Comfortable' },
                  { v: 'compact', l: 'Compact' },
                ].map((opt) => (
                  <div
                    key={opt.v}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-2)' }}
                  >
                    <RadioGroup.Item id={`density-${opt.v}`} value={opt.v} />
                    <Label htmlFor={`density-${opt.v}`}>{opt.l}</Label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldCol} style={{ gap: 0 }}>
                <Label htmlFor="daily-digest">Daily digest email</Label>
                <span className={styles.inlineHint}>A summary of overnight incidents at 08:00</span>
              </div>
              <Switch
                id="daily-digest"
                checked={digest}
                onCheckedChange={setDigest}
                aria-label="Daily digest email"
              />
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button size="sm" onClick={() => toast.success('Preferences saved')}>
            Save preferences
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
