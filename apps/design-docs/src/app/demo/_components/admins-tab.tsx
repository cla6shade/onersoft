'use client';

import { useMemo, useState } from 'react';
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  Input,
  Kbd,
  Label,
  Popover,
  RadioGroup,
  Select,
  Separator,
  Switch,
  Textarea,
  Tooltip,
  toast,
} from '@onersoft/ui';
import { type Admin, admins as seedAdmins, auditLog } from './data';
import styles from './dashboard.module.css';

const ROLE_LABEL: Record<Admin['role'], string> = {
  owner: 'Owner',
  operator: 'Operator',
  viewer: 'Viewer',
};

function AdminRow({ admin }: { admin: Admin }) {
  const [role, setRole] = useState(admin.role);
  const [deploy, setDeploy] = useState(admin.deploy);
  const [billing, setBilling] = useState(admin.billing);

  return (
    <li className={styles.row}>
      <Avatar.Root>
        <Avatar.Image src="" alt="" />
        <Avatar.Fallback>{admin.initials}</Avatar.Fallback>
      </Avatar.Root>
      <div className={styles.rowMain}>
        <div className={styles.rowName}>{admin.name}</div>
        <div className={styles.rowMeta}>
          <span className={styles.mono}>{admin.email}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-4)' }}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span
              style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--ds-space-2)' }}
            >
              <Switch
                id={`deploy-${admin.id}`}
                checked={deploy}
                onCheckedChange={(v) => {
                  setDeploy(v);
                  toast(`${admin.name}: deploy ${v ? 'enabled' : 'disabled'}`);
                }}
                aria-label={`Deploy permission for ${admin.name}`}
              />
              <Label htmlFor={`deploy-${admin.id}`} className={styles.metaLabel}>
                Deploy
              </Label>
            </span>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content side="top">Can promote releases to the fleet</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--ds-space-2)' }}>
          <Checkbox
            id={`billing-${admin.id}`}
            checked={billing}
            onCheckedChange={(v) => setBilling(v === true)}
          />
          <Label htmlFor={`billing-${admin.id}`} className={styles.metaLabel}>
            Billing
          </Label>
        </span>

        <Select.Root value={role} onValueChange={(v) => setRole(v as Admin['role'])}>
          <Select.Trigger aria-label={`Role for ${admin.name}`} style={{ minWidth: '8rem' }}>
            <Select.Value />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.Viewport>
                <Select.Item value="owner">Owner</Select.Item>
                <Select.Item value="operator">Operator</Select.Item>
                <Select.Item value="viewer">Viewer</Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </li>
  );
}

function InviteDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');
  const [note, setNote] = useState('');
  const invalid = email.length > 0 && !email.includes('@');

  const submit = () => {
    if (email.trim() === '' || invalid) return;
    toast.success('Invitation sent', {
      description: `${email} · ${ROLE_LABEL[role as Admin['role']]}`,
    });
    setOpen(false);
    setEmail('');
    setRole('viewer');
    setNote('');
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm">Invite admin</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Invite an admin</Dialog.Title>
          <Dialog.Description>
            They receive an email invitation and join with the role you pick. Permissions can be
            tuned afterwards.
          </Dialog.Description>

          <div className={styles.dialogForm}>
            <div className={styles.fieldCol}>
              <Label htmlFor="invite-email">Work email</Label>
              <Input
                id="invite-email"
                type="email"
                value={email}
                invalid={invalid}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@onersoft.dev"
                aria-describedby="invite-email-hint"
              />
              <span id="invite-email-hint" className={styles.inlineHint}>
                {invalid ? 'Enter a valid email address.' : 'Company domain addresses only.'}
              </span>
            </div>

            <div className={styles.fieldCol}>
              <span className={styles.metaLabel} style={{ textTransform: 'none' }}>
                Role
              </span>
              <RadioGroup.Root value={role} onValueChange={setRole} aria-label="Invite role">
                {(['owner', 'operator', 'viewer'] as const).map((r) => (
                  <div
                    key={r}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-2)' }}
                  >
                    <RadioGroup.Item id={`role-${r}`} value={r} />
                    <Label htmlFor={`role-${r}`}>{ROLE_LABEL[r]}</Label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>

            <div className={styles.fieldCol}>
              <Label htmlFor="invite-note">Note (optional)</Label>
              <Textarea
                id="invite-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Add context for the invitee"
                resize="vertical"
              />
            </div>
          </div>

          <Dialog.Footer>
            <span className={styles.inlineHint} style={{ marginRight: 'auto' }}>
              Press <Kbd size="sm">Enter</Kbd> to send
            </span>
            <Dialog.Close asChild>
              <Button variant="ghost">Cancel</Button>
            </Dialog.Close>
            <Button onClick={submit} disabled={email.trim() === '' || invalid}>
              Send invite
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function AdminsTab() {
  const [roleFilter, setRoleFilter] = useState('all');
  const visible = useMemo(
    () => seedAdmins.filter((a) => roleFilter === 'all' || a.role === roleFilter),
    [roleFilter],
  );

  return (
    <div className={`${styles.grid} ${styles.gridAdmins}`}>
      <Card>
        <Card.Header>
          <div className={styles.cardHeadRow}>
            <div>
              <Card.Eyebrow>Access</Card.Eyebrow>
              <Card.Title>Admin roster</Card.Title>
              <Card.Description>Roles and permissions take effect immediately.</Card.Description>
            </div>
            <div style={{ display: 'flex', gap: 'var(--ds-space-2)' }}>
              <Popover.Root>
                <Popover.Trigger asChild>
                  <Button variant="secondary" size="sm">
                    Filter
                  </Button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content align="end">
                    <div className={styles.popoverBody}>
                      <span className={styles.metaLabel} style={{ textTransform: 'none' }}>
                        Filter by role
                      </span>
                      <RadioGroup.Root
                        value={roleFilter}
                        onValueChange={setRoleFilter}
                        aria-label="Filter by role"
                      >
                        {[
                          { v: 'all', l: 'All roles' },
                          { v: 'owner', l: 'Owner' },
                          { v: 'operator', l: 'Operator' },
                          { v: 'viewer', l: 'Viewer' },
                        ].map((opt) => (
                          <div
                            key={opt.v}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--ds-space-2)',
                            }}
                          >
                            <RadioGroup.Item id={`filter-${opt.v}`} value={opt.v} />
                            <Label htmlFor={`filter-${opt.v}`}>{opt.l}</Label>
                          </div>
                        ))}
                      </RadioGroup.Root>
                    </div>
                    <Popover.Arrow />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
              <InviteDialog />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <ul className={styles.listReset}>
            {visible.map((a, i) => (
              <li key={a.id}>
                {i > 0 ? <Separator /> : null}
                <AdminRow admin={a} />
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Eyebrow>Trail</Card.Eyebrow>
          <Card.Title>Audit log</Card.Title>
          <Card.Description>Every privileged action, retained for 90 days.</Card.Description>
        </Card.Header>
        <Card.Body>
          <Accordion.Root type="single" collapsible>
            {auditLog.map((entry) => (
              <Accordion.Item key={entry.id} value={entry.id}>
                <Accordion.Header>
                  <Accordion.Trigger>
                    <span style={{ display: 'grid', gap: 'var(--ds-space-px)', textAlign: 'left' }}>
                      <span style={{ fontSize: 'var(--ds-text-sm)' }}>
                        <strong style={{ fontWeight: 'var(--ds-weight-medium)' }}>
                          {entry.actor}
                        </strong>{' '}
                        {entry.action}
                      </span>
                      <span className={styles.auditMeta}>{entry.time}</span>
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <p style={{ margin: '0 0 var(--ds-space-2)', color: 'var(--ds-color-fg-muted)' }}>
                    {entry.detail}
                  </p>
                  <Badge size="sm">{entry.target}</Badge>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Card.Body>
      </Card>
    </div>
  );
}
