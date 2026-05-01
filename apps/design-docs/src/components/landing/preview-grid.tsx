'use client';

import { Badge, Button, Card, Input, Label, Switch } from '@onersoft/design-system';

export function PreviewGrid() {
  return (
    <div
      className="rounded-[var(--ds-radius-lg)] border p-6 sm:p-8"
      style={{
        borderColor: 'var(--ds-color-border-default)',
        background: 'var(--ds-color-bg-surface)',
      }}
    >
      <div className="flex flex-wrap gap-x-6 gap-y-7 items-start">
        {/* Buttons */}
        <div className="flex items-center gap-2 grow basis-[280px]">
          <Button size="md">Get started</Button>
          <Button size="md" variant="secondary">
            Docs
          </Button>
          <Button size="md" variant="ghost">
            Cancel
          </Button>
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-2 basis-[140px]">
          <Badge variant="accent">Stable</Badge>
          <Badge variant="neutral">v0.0.1</Badge>
        </div>

        {/* Switch */}
        <div className="flex items-center gap-3 basis-[180px]">
          <Switch id="auto-theme-preview" defaultChecked />
          <Label htmlFor="auto-theme-preview" style={{ color: 'var(--ds-color-fg-default)' }}>
            Auto-theme
          </Label>
        </div>

        {/* Input + Label */}
        <div className="flex flex-col gap-1.5 grow basis-[260px]">
          <Label htmlFor="email-preview">Email</Label>
          <Input id="email-preview" type="email" placeholder="you@onersoft.com" defaultValue="" />
        </div>

        {/* Card */}
        <Card className="grow basis-[300px]">
          <Card.Header>
            <Card.Eyebrow>Pricing</Card.Eyebrow>
            <Card.Title>Free forever</Card.Title>
            <Card.Description>MIT-licensed. No seats, no usage limits.</Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button size="sm" variant="secondary">
              See license
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
