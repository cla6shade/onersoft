/**
 * Mock telemetry for the operations console demo. English only.
 * Static, deterministic values so the static export renders identically.
 */

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export type ServiceState = 'up' | 'degraded' | 'down';

export interface Signal {
  key: string;
  label: string;
  value: string;
  unit?: string;
  delta: string;
  deltaVariant: BadgeVariant;
  foot: string;
  history: number[];
}

export const signals: Signal[] = [
  {
    key: 'active',
    label: 'Active now',
    value: '2,418',
    delta: '+124',
    deltaVariant: 'success',
    foot: 'vs. 5 min ago',
    history: [38, 42, 40, 47, 51, 49, 55, 62, 58, 66, 71, 78],
  },
  {
    key: 'signups',
    label: 'Signups today',
    value: '512',
    delta: '+8.4%',
    deltaVariant: 'success',
    foot: 'vs. yesterday',
    history: [30, 34, 33, 40, 44, 42, 48, 45, 52, 55, 60, 63],
  },
  {
    key: 'p95',
    label: 'p95 latency',
    value: '312',
    unit: 'ms',
    delta: '+41ms',
    deltaVariant: 'warning',
    foot: 'threshold 400ms',
    history: [22, 24, 21, 26, 30, 28, 33, 40, 44, 42, 48, 52],
  },
  {
    key: 'errbudget',
    label: 'Error budget',
    value: '78',
    unit: '%',
    delta: '-4%',
    deltaVariant: 'neutral',
    foot: '30-day window',
    history: [88, 86, 85, 84, 84, 83, 82, 81, 80, 79, 79, 78],
  },
];

export interface AppUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  segment: string;
  status: 'active' | 'idle' | 'offline';
  statusLabel: string;
  statusVariant: BadgeVariant;
  seen: string;
}

export const users: AppUser[] = [
  {
    id: 'u1',
    name: 'Mara Whitfield',
    email: 'mara@northwind.io',
    initials: 'MW',
    segment: 'Enterprise',
    status: 'active',
    statusLabel: 'Active',
    statusVariant: 'success',
    seen: 'now',
  },
  {
    id: 'u2',
    name: 'Devin Osei',
    email: 'devin@lumen.app',
    initials: 'DO',
    segment: 'Pro',
    status: 'active',
    statusLabel: 'Active',
    statusVariant: 'success',
    seen: '2m ago',
  },
  {
    id: 'u3',
    name: 'Priya Nandakumar',
    email: 'priya@vector.dev',
    initials: 'PN',
    segment: 'Pro',
    status: 'idle',
    statusLabel: 'Idle',
    statusVariant: 'warning',
    seen: '14m ago',
  },
  {
    id: 'u4',
    name: 'Tomas Berg',
    email: 'tomas@harbor.co',
    initials: 'TB',
    segment: 'Free',
    status: 'offline',
    statusLabel: 'Offline',
    statusVariant: 'neutral',
    seen: '3h ago',
  },
  {
    id: 'u5',
    name: 'Wei Chen',
    email: 'wei@atlas.systems',
    initials: 'WC',
    segment: 'Enterprise',
    status: 'active',
    statusLabel: 'Active',
    statusVariant: 'success',
    seen: 'now',
  },
];

export interface Segment {
  label: string;
  share: number;
  count: string;
}

export const segments: Segment[] = [
  { label: 'Enterprise', share: 46, count: '1,112' },
  { label: 'Pro', share: 34, count: '822' },
  { label: 'Free', share: 20, count: '484' },
];

export interface Service {
  id: string;
  name: string;
  region: string;
  state: ServiceState;
  stateLabel: string;
  stateVariant: BadgeVariant;
  uptime: string;
  cpu: number;
  memory: number;
  latency: number;
  refreshing?: boolean;
}

export const services: Service[] = [
  {
    id: 's1',
    name: 'api-gateway',
    region: 'us-east-1',
    state: 'up',
    stateLabel: 'Operational',
    stateVariant: 'success',
    uptime: '99.98%',
    cpu: 42,
    memory: 61,
    latency: 38,
  },
  {
    id: 's2',
    name: 'auth-service',
    region: 'us-east-1',
    state: 'degraded',
    stateLabel: 'Degraded',
    stateVariant: 'warning',
    uptime: '99.42%',
    cpu: 78,
    memory: 84,
    latency: 71,
    refreshing: true,
  },
  {
    id: 's3',
    name: 'billing-worker',
    region: 'eu-west-1',
    state: 'up',
    stateLabel: 'Operational',
    stateVariant: 'success',
    uptime: '99.99%',
    cpu: 29,
    memory: 47,
    latency: 44,
  },
  {
    id: 's4',
    name: 'search-index',
    region: 'ap-south-1',
    state: 'down',
    stateLabel: 'Outage',
    stateVariant: 'danger',
    uptime: '97.10%',
    cpu: 0,
    memory: 12,
    latency: 0,
  },
];

export interface Incident {
  id: string;
  title: string;
  severity: BadgeVariant;
  severityLabel: string;
  time: string;
  detail: string;
}

export const incidents: Incident[] = [
  {
    id: 'i1',
    title: 'Elevated latency on auth-service',
    severity: 'warning',
    severityLabel: 'SEV-3',
    time: '11 min ago',
    detail:
      'p95 crossed 400ms for the login endpoint in us-east-1. Autoscaler added two replicas; latency is trending back toward baseline.',
  },
  {
    id: 'i2',
    title: 'search-index unreachable in ap-south-1',
    severity: 'danger',
    severityLabel: 'SEV-1',
    time: '26 min ago',
    detail:
      'Primary node lost quorum after a network partition. Failover to the standby cluster is in progress; queries are being served stale.',
  },
  {
    id: 'i3',
    title: 'Deploy edge-canary #482 promoted',
    severity: 'success',
    severityLabel: 'INFO',
    time: '1h ago',
    detail:
      'Canary held 2.4% of traffic for 30 minutes with no error-rate regression, then promoted to full fleet.',
  },
];

export interface Admin {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: 'owner' | 'operator' | 'viewer';
  deploy: boolean;
  billing: boolean;
  status: 'active' | 'idle';
}

export const admins: Admin[] = [
  {
    id: 'a1',
    name: 'Sofia Marchetti',
    email: 'sofia@onersoft.dev',
    initials: 'SM',
    role: 'owner',
    deploy: true,
    billing: true,
    status: 'active',
  },
  {
    id: 'a2',
    name: 'Julian Reyes',
    email: 'julian@onersoft.dev',
    initials: 'JR',
    role: 'operator',
    deploy: true,
    billing: false,
    status: 'active',
  },
  {
    id: 'a3',
    name: 'Nadia Farouk',
    email: 'nadia@onersoft.dev',
    initials: 'NF',
    role: 'viewer',
    deploy: false,
    billing: false,
    status: 'idle',
  },
];

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  detail: string;
}

export const auditLog: AuditEntry[] = [
  {
    id: 'l1',
    actor: 'Sofia Marchetti',
    action: 'rotated production API key',
    target: 'sk_live_••••a4f3',
    time: '2026-07-05 14:22 UTC',
    detail:
      'Key rotated after the quarterly credential review. The previous key was revoked immediately.',
  },
  {
    id: 'l2',
    actor: 'Julian Reyes',
    action: 'changed alert threshold',
    target: 'p95 latency → 400ms',
    time: '2026-07-05 13:47 UTC',
    detail:
      'Raised the paging threshold from 350ms to 400ms to reduce noise from cold-start spikes.',
  },
  {
    id: 'l3',
    actor: 'Sofia Marchetti',
    action: 'invited admin',
    target: 'nadia@onersoft.dev',
    time: '2026-07-04 09:10 UTC',
    detail: 'Invited with the Viewer role. Deploy and billing permissions were left disabled.',
  },
];
