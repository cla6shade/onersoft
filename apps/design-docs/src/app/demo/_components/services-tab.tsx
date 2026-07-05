'use client';

import { useState } from 'react';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Label,
  Progress,
  Select,
  Separator,
  Slider,
  Spinner,
  Switch,
  Tooltip,
  toast,
} from '@onersoft/ui';
import { incidents, services, type Service } from './data';
import styles from './dashboard.module.css';

function dotClass(state: Service['state']) {
  if (state === 'up') return `${styles.serviceDot} ${styles.dotUp}`;
  if (state === 'degraded') return `${styles.serviceDot} ${styles.dotDegraded}`;
  return `${styles.serviceDot} ${styles.dotDown}`;
}

function Metric({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <div className={styles.metricRow}>
      <span className={styles.metricLabel}>{label}</span>
      <Progress value={value} aria-label={`${label} ${value}${unit ?? '%'}`} />
      <span className={styles.metricValue}>
        {value}
        {unit ?? '%'}
      </span>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card>
      <Card.Header>
        <div className={styles.cardHeadRow}>
          <div className={styles.serviceHead}>
            <span className={dotClass(service.state)} aria-hidden />
            <Card.Title
              style={{ fontFamily: 'var(--ds-font-mono)', fontSize: 'var(--ds-text-md)' }}
            >
              {service.name}
            </Card.Title>
            {service.refreshing ? <Spinner size="sm" label="Refreshing" /> : null}
          </div>
          <Badge variant={service.stateVariant} size="sm">
            {service.stateLabel}
          </Badge>
        </div>
        <Card.Description>
          {service.region} · uptime <span className={styles.mono}>{service.uptime}</span>
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <div style={{ display: 'grid', gap: 'var(--ds-space-3)' }}>
          <Metric label="CPU" value={service.cpu} />
          <Metric label="Memory" value={service.memory} />
          <Metric label="Latency" value={service.latency} unit="ms" />
        </div>
      </Card.Body>
    </Card>
  );
}

export function ServicesTab() {
  const [threshold, setThreshold] = useState([400]);
  const [notify, setNotify] = useState('page');
  const [autoRemediate, setAutoRemediate] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--ds-space-5)' }}>
      <div className={`${styles.grid} ${styles.gridServices}`}>
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>

      <div className={`${styles.grid} ${styles.gridUsers}`}>
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
                    <p
                      style={{ margin: '0 0 var(--ds-space-2)', color: 'var(--ds-color-fg-muted)' }}
                    >
                      {inc.detail}
                    </p>
                    <span className={styles.auditMeta}>{inc.time}</span>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Eyebrow>Alerting</Card.Eyebrow>
            <Card.Title>Thresholds</Card.Title>
            <Card.Description>Applies to every service in the selected region.</Card.Description>
          </Card.Header>
          <Card.Body>
            <div className={styles.controlCard}>
              <div className={styles.fieldCol}>
                <div className={styles.fieldRow}>
                  <Label htmlFor="latency-threshold">Latency alert</Label>
                  <span className={styles.mono} style={{ fontSize: 'var(--ds-text-sm)' }}>
                    {threshold[0]}ms
                  </span>
                </div>
                <Slider
                  value={threshold}
                  onValueChange={setThreshold}
                  min={100}
                  max={800}
                  step={10}
                  aria-label="Latency alert threshold"
                />
              </div>

              <Separator />

              <div className={styles.fieldCol}>
                <Label htmlFor="notify-channel">When breached</Label>
                <Select.Root value={notify} onValueChange={setNotify}>
                  <Select.Trigger id="notify-channel" aria-label="Notification channel">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content>
                      <Select.Viewport>
                        <Select.Item value="page">Page on-call</Select.Item>
                        <Select.Item value="slack">Post to Slack</Select.Item>
                        <Select.Item value="email">Email the team</Select.Item>
                        <Select.Item value="silent">Log silently</Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.fieldCol} style={{ gap: 0 }}>
                  <Label htmlFor="auto-remediate">Auto-remediate</Label>
                  <span className={styles.inlineHint}>Scale replicas before paging</span>
                </div>
                <Switch
                  id="auto-remediate"
                  checked={autoRemediate}
                  onCheckedChange={setAutoRemediate}
                  aria-label="Toggle auto-remediation"
                />
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  size="sm"
                  onClick={() =>
                    toast.success('Alert policy saved', {
                      description: `Latency > ${threshold[0]}ms`,
                    })
                  }
                >
                  Save policy
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="top">Applies immediately</Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
