import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Accordion,
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  DropdownMenu,
  EmptyState,
  Field,
  Input,
  Kbd,
  Label,
  Menubar,
  NavigationMenu,
  Popover,
  Progress,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  Textarea,
  toast,
  Toaster,
  Toggle,
  ToggleGroup,
  Tooltip,
} from '..'
import s from './Overview.module.css'

const meta: Meta = {
  title: 'Overview',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
}

export default meta
type Story = StoryObj

/* ---------- helpers --------------------------------------------------- */

function Swatch({ name, varName }: { name: string; varName: string }) {
  return (
    <div className={s.swatch}>
      <div className={s.swatchChip} style={{ backgroundColor: `var(${varName})` }} />
      <span className={s.swatchName}>{name}</span>
      <span className={s.swatchHint}>{varName}</span>
    </div>
  )
}

function TypeRow({ name, varName }: { name: string; varName: string }) {
  return (
    <>
      <span className={s.typeName}>{name}</span>
      <p className={s.typeSample} style={{ fontSize: `var(${varName})` }}>
        디자인은 의도된 단순함이다.
      </p>
    </>
  )
}

function SpacingRow({ name, valueRem }: { name: string; valueRem: number }) {
  const px = Math.round(valueRem * 16)
  return (
    <>
      <span className={s.spacingName}>{name}</span>
      <span className={s.spacingValue}>
        {valueRem}rem · {px}px
      </span>
      <div className={s.spacingBar} style={{ width: `${valueRem}rem` }} />
    </>
  )
}

/* ---------- Brand knobs (live retheming) ------------------------------ */

function BrandKnobs() {
  const [hue, setHue] = useState(232)
  const [chroma, setChroma] = useState(0.06)

  useEffect(() => {
    document.documentElement.style.setProperty('--ds-brand-hue', String(hue))
    document.documentElement.style.setProperty('--ds-brand-chroma', String(chroma))
  }, [hue, chroma])

  return (
    <div className={s.knobs}>
      <span className={s.knobLabel}>--ds-brand-hue</span>
      <input
        className={s.knobRange}
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
        aria-label="Brand hue"
      />
      <span className={s.knobValue}>{hue}°</span>

      <span className={s.knobLabel}>--ds-brand-chroma</span>
      <input
        className={s.knobRange}
        type="range"
        min={0}
        max={0.18}
        step={0.005}
        value={chroma}
        onChange={(e) => setChroma(Number(e.target.value))}
        aria-label="Brand chroma"
      />
      <span className={s.knobValue}>{chroma.toFixed(3)}</span>
    </div>
  )
}

/* ---------- Sections -------------------------------------------------- */

function Foundations() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Foundations</h2>
        <p className={s.sectionNote}>
          모든 컴포넌트가 동일한 토큰 위에 서있고, 위 슬라이더로 hue/chroma만 바꿔도 전 시스템이 동시에 반응합니다.
        </p>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Surface</span>
        <div className={s.swatchGrid}>
          <Swatch name="Sunken" varName="--ds-color-bg-sunken" />
          <Swatch name="Surface" varName="--ds-color-bg-surface" />
          <Swatch name="Elevated" varName="--ds-color-bg-elevated" />
          <Swatch name="Overlay" varName="--ds-color-bg-overlay" />
        </div>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Foreground</span>
        <div className={s.swatchGrid}>
          <Swatch name="Default" varName="--ds-color-fg-default" />
          <Swatch name="Muted" varName="--ds-color-fg-muted" />
          <Swatch name="Subtle" varName="--ds-color-fg-subtle" />
        </div>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Brand & Status</span>
        <div className={s.swatchGrid}>
          <Swatch name="Accent" varName="--ds-color-accent" />
          <Swatch name="Accent (muted)" varName="--ds-color-accent-muted" />
          <Swatch name="Info" varName="--ds-color-info" />
          <Swatch name="Success" varName="--ds-color-success" />
          <Swatch name="Warning" varName="--ds-color-warning" />
          <Swatch name="Danger" varName="--ds-color-danger" />
        </div>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Typography</span>
        <div className={s.typeSpecimen}>
          <TypeRow name="3xl" varName="--ds-text-3xl" />
          <TypeRow name="2xl" varName="--ds-text-2xl" />
          <TypeRow name="xl" varName="--ds-text-xl" />
          <TypeRow name="lg" varName="--ds-text-lg" />
          <TypeRow name="md / base" varName="--ds-text-md" />
          <TypeRow name="sm" varName="--ds-text-sm" />
          <TypeRow name="xs" varName="--ds-text-xs" />
        </div>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Spacing (4pt scale)</span>
        <div className={s.spacingTable}>
          <SpacingRow name="space-1" valueRem={0.25} />
          <SpacingRow name="space-2" valueRem={0.5} />
          <SpacingRow name="space-3" valueRem={0.75} />
          <SpacingRow name="space-4" valueRem={1} />
          <SpacingRow name="space-5" valueRem={1.25} />
          <SpacingRow name="space-6" valueRem={1.5} />
          <SpacingRow name="space-7" valueRem={2} />
          <SpacingRow name="space-8" valueRem={3} />
        </div>
      </div>
    </section>
  )
}

function Actions() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Action</h2>
        <p className={s.sectionNote}>
          Button — 세 variant × 세 size. <code>asChild</code>로 다른 요소에 스타일만 입힐 수 있습니다.
        </p>
      </div>
      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Variants</span>
        <div className={s.row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Sizes</span>
        <div className={s.row}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    </section>
  )
}

function FormControls() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Forms</h2>
        <p className={s.sectionNote}>
          <code>Field</code> 컴포지션이 label · control · description · error 의 <code>id</code>/<code>aria-*</code>를 자동 연결합니다.
        </p>
      </div>

      <div className={s.formGrid}>
        <Field>
          <Field.Label>이름</Field.Label>
          <Field.Control>
            <Input placeholder="홍길동" />
          </Field.Control>
          <Field.Description>표시될 이름.</Field.Description>
        </Field>

        <Field invalid>
          <Field.Label>이메일</Field.Label>
          <Field.Control>
            <Input type="email" defaultValue="not-an-email" />
          </Field.Control>
          <Field.Description>회사 도메인 이메일을 사용해주세요.</Field.Description>
          <Field.Error>유효한 이메일 형식이 아닙니다.</Field.Error>
        </Field>

        <Field>
          <Field.Label>피드백</Field.Label>
          <Field.Control>
            <Textarea rows={3} placeholder="자유롭게 작성해주세요" />
          </Field.Control>
        </Field>

        <Field>
          <Field.Label>언어</Field.Label>
          <Select.Root defaultValue="ko">
            <Field.Control>
              <Select.Trigger>
                <Select.Value placeholder="선택" />
              </Select.Trigger>
            </Field.Control>
            <Select.Portal>
              <Select.Content>
                <Select.Viewport>
                  <Select.Item value="ko">한국어</Select.Item>
                  <Select.Item value="en">English</Select.Item>
                  <Select.Item value="ja">日本語</Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </Field>
      </div>

      <Separator />

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Choice</span>
        <div className={s.row}>
          <Label>
            <Checkbox defaultChecked /> 알림 받기
          </Label>
          <RadioGroup.Root defaultValue="balanced" orientation="horizontal" style={{ flexDirection: 'row', gap: 'var(--ds-space-4)' }}>
            <Label>
              <RadioGroup.Item value="efficient" /> 효율
            </Label>
            <Label>
              <RadioGroup.Item value="balanced" /> 균형
            </Label>
            <Label>
              <RadioGroup.Item value="performance" /> 성능
            </Label>
          </RadioGroup.Root>
          <Label>
            <Switch defaultChecked /> 다크 모드
          </Label>
        </div>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Range / Toggle</span>
        <div className={s.column}>
          <Slider defaultValue={[40]} max={100} step={1} style={{ maxWidth: '24rem' }} aria-label="Volume" />
          <div className={s.row}>
            <Toggle defaultPressed>Bold</Toggle>
            <ToggleGroup.Root type="single" defaultValue="left">
              <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
              <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
              <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
        </div>
      </div>
    </section>
  )
}

function Display() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Display</h2>
        <p className={s.sectionNote}>상태와 정체성을 표현하는 미세한 요소들.</p>
      </div>
      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Badge</span>
        <div className={s.rowSm}>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </div>
      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Kbd</span>
        <div className={s.rowSm}>
          <span style={{ color: 'var(--ds-color-fg-muted)', fontSize: 'var(--ds-text-sm)' }}>
            검색 열기 —
          </span>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      </div>
      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Avatar</span>
        <div className={s.row}>
          <Avatar.Root>
            <Avatar.Image src="https://i.pravatar.cc/64?img=12" alt="" />
            <Avatar.Fallback>OS</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Fallback>한</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>
      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Progress</span>
        <Progress value={64} style={{ maxWidth: '24rem' }} />
      </div>
    </section>
  )
}

function Disclosure() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Navigation & Disclosure</h2>
        <p className={s.sectionNote}>가벼운 정보 계층화.</p>
      </div>

      <Tabs.Root defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
          <Tabs.Trigger value="changelog">Changelog</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview" className={s.tabsBody}>
          토큰 기반의 미니멀 컴포넌트 셋. 모든 표면이 brand hue로 미세 tint되어 있습니다.
        </Tabs.Content>
        <Tabs.Content value="usage" className={s.tabsBody}>
          <code>import {'{'} Button {'}'} from '@onersoft/design-system'</code>
        </Tabs.Content>
        <Tabs.Content value="changelog" className={s.tabsBody}>
          v0.0.1 — 초기 토큰 정리, Field 도입, @layer 적용.
        </Tabs.Content>
      </Tabs.Root>

      <Accordion.Root type="single" collapsible defaultValue="a">
        <Accordion.Item value="a">
          <Accordion.Header>
            <Accordion.Trigger>왜 OKLCH를 쓰나요?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            지각적으로 균일한 lightness 단계를 보장합니다. HSL의 같은 lightness 값이 색마다 다르게 보이는 문제를 피할 수 있습니다.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b">
          <Accordion.Header>
            <Accordion.Trigger>호스트가 색을 바꾸려면?</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <code>:root {'{'} --ds-brand-hue: 280; {'}'}</code> 한 줄로 전 시스템이 동시에 반응합니다.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  )
}

function Overlays() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Overlay</h2>
        <p className={s.sectionNote}>
          Overlay 표면은 elevated 위에 한 단계 더 올라오는 <code>--ds-color-bg-overlay</code>를 사용합니다.
        </p>
      </div>

      <div className={s.row}>
        <Tooltip.Provider delayDuration={150}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button variant="ghost">Tooltip</Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content sideOffset={6}>도움말 텍스트</Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="secondary">Popover</Button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content sideOffset={6}>
              <div className={s.column}>
                <strong style={{ fontSize: 'var(--ds-text-sm)' }}>Popover 내용</strong>
                <span style={{ color: 'var(--ds-color-fg-muted)', fontSize: 'var(--ds-text-sm)' }}>
                  비-modal floating panel.
                </span>
                <Button size="sm">Action</Button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="secondary">Menu</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content sideOffset={6} align="start">
              <DropdownMenu.Label>Workspace</DropdownMenu.Label>
              <DropdownMenu.Item>새 프로젝트</DropdownMenu.Item>
              <DropdownMenu.Item>설정</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>로그아웃</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>변경 사항을 저장할까요?</Dialog.Title>
              <Dialog.Description>저장하지 않으면 이 페이지의 작업 내용이 사라집니다.</Dialog.Description>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="ghost">취소</Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button>저장</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button variant="ghost">Alert</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Title>계정을 삭제할까요?</AlertDialog.Title>
              <AlertDialog.Description>
                이 동작은 되돌릴 수 없으며 모든 데이터가 영구 삭제됩니다.
              </AlertDialog.Description>
              <AlertDialog.Footer>
                <AlertDialog.Cancel asChild>
                  <Button variant="ghost">취소</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button>삭제</Button>
                </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>

        <ToastDemo />
      </div>
    </section>
  )
}

function ToastDemo() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost">Toast</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={6} align="end">
          <DropdownMenu.Item onSelect={() => toast('저장됨', { description: '기본 neutral 인텐트.' })}>
            Default
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => toast.success('저장됨', { description: '변경 사항이 적용되었습니다.' })}
          >
            Success
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => toast.warning('주의', { description: '연결이 불안정합니다.' })}
          >
            Warning
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() =>
              toast.error('저장 실패', {
                description: '서버에 연결할 수 없습니다.',
                action: { label: '재시도', onClick: () => toast.info('재시도 중…') },
              })
            }
          >
            Error + action
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

function CardsAndEmpty() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Surfaces</h2>
        <p className={s.sectionNote}>Card는 container query로 자기 폭에 맞춰 패딩이 줄어듭니다.</p>
      </div>

      <div className={s.cardGrid}>
        <Card>
          <Card.Header>
            <Card.Title>월간 활성 사용자</Card.Title>
            <Card.Description>지난 30일 기준</Card.Description>
          </Card.Header>
          <Card.Body>
            <strong style={{ fontSize: 'var(--ds-text-2xl)' }}>12,847</strong>
          </Card.Body>
        </Card>

        <Card interactive>
          <Card.Header>
            <Card.Title>대시보드 열기</Card.Title>
            <Card.Description>분석 도구 전체 보기 →</Card.Description>
          </Card.Header>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>저장 공간</Card.Title>
            <Card.Description>3.2 GB / 10 GB 사용 중</Card.Description>
          </Card.Header>
          <Card.Body>
            <Progress value={32} />
          </Card.Body>
          <Card.Footer>
            <Button size="sm" variant="ghost">
              관리
            </Button>
          </Card.Footer>
        </Card>
      </div>

      <Card>
        <EmptyState>
          <EmptyState.Media>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3 7l9 5 9-5M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </EmptyState.Media>
          <EmptyState.Title>받은 메시지가 없습니다</EmptyState.Title>
          <EmptyState.Description>
            첫 메시지가 도착하면 여기에 표시됩니다. 알림을 켜두면 즉시 받아볼 수 있습니다.
          </EmptyState.Description>
          <EmptyState.Actions>
            <Button variant="ghost">알림 설정</Button>
            <Button>메시지 작성</Button>
          </EmptyState.Actions>
        </EmptyState>
      </Card>
    </section>
  )
}

function StatusComponents() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Status</h2>
        <p className={s.sectionNote}>로딩과 부재 상태.</p>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Spinner</span>
        <div className={s.row}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Button disabled>
            <Spinner size="sm" label="" /> 저장 중…
          </Button>
        </div>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Skeleton</span>
        <div style={{ maxWidth: '24rem' }} className={s.column}>
          <div className={s.row} style={{ alignItems: 'center' }}>
            <Skeleton variant="circle" width={40} />
            <div className={s.column} style={{ flex: 1, gap: 'var(--ds-space-2)' }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
          <Skeleton height={8} />
          <Skeleton height={8} width="80%" />
        </div>
      </div>
    </section>
  )
}

function NavMenus() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Menus</h2>
        <p className={s.sectionNote}>Menubar는 데스크톱 앱의 상단 메뉴, NavigationMenu는 마케팅/도큐 사이트 헤더에.</p>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>Menubar</span>
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content>
                <Menubar.Item>
                  새 파일 <Menubar.Shortcut>⌘N</Menubar.Shortcut>
                </Menubar.Item>
                <Menubar.Item>
                  열기 <Menubar.Shortcut>⌘O</Menubar.Shortcut>
                </Menubar.Item>
                <Menubar.Separator />
                <Menubar.Item>
                  저장 <Menubar.Shortcut>⌘S</Menubar.Shortcut>
                </Menubar.Item>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content>
                <Menubar.Item>실행 취소</Menubar.Item>
                <Menubar.Item>다시 실행</Menubar.Item>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>View</Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content>
                <Menubar.Item>사이드바</Menubar.Item>
                <Menubar.Item>전체 화면</Menubar.Item>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
        </Menubar.Root>
      </div>

      <div className={s.subsection}>
        <span className={s.subsectionLabel}>NavigationMenu</span>
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>제품</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <div style={{ padding: 'var(--ds-space-4)', minWidth: '20rem' }} className={s.column}>
                  <strong style={{ fontSize: 'var(--ds-text-sm)' }}>플랫폼</strong>
                  <NavigationMenu.Link href="#">Cloud</NavigationMenu.Link>
                  <NavigationMenu.Link href="#">Edge</NavigationMenu.Link>
                  <NavigationMenu.Link href="#">Self-hosted</NavigationMenu.Link>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">가격</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#">문서</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
      </div>
    </section>
  )
}

/* ---------- Story ----------------------------------------------------- */

export const Showcase: Story = {
  render: () => (
    <div className={s.page}>
      <header className={s.header}>
        <div className={s.headerMeta}>
          <span className={s.eyebrow}>@onersoft/design-system · v0.0.1</span>
          <h1 className={s.title}>Refined. Calm. Precise.</h1>
          <p className={s.tagline}>
            Radix Primitives 기반의 토큰-우선 컴포넌트 라이브러리. 표현은 여백, 타이포 계층, 모션 타이밍으로.
            상단 슬라이더로 brand hue/chroma를 조정하면 전 시스템이 즉시 반응합니다.
          </p>
        </div>
        <BrandKnobs />
      </header>

      <Foundations />
      <Actions />
      <FormControls />
      <Display />
      <StatusComponents />
      <CardsAndEmpty />
      <Disclosure />
      <NavMenus />
      <Overlays />

      <Toaster />
    </div>
  ),
}
