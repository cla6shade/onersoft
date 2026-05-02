import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menubar } from '.';

const meta: Meta = {
  title: 'Navigation/Menubar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '데스크톱 앱 상단 메뉴 패턴. 키보드 화살표로 메뉴 간 이동, Enter/Space로 항목 실행, Esc로 닫기. Web에서는 보통 NavigationMenu가 더 적절하지만, 도큐먼트 편집기·IDE·DAW 같은 에디터형 인터페이스에 어울립니다. Built on Radix Menubar.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Menubar.Root defaultValue="view">
      <Menubar.Menu value="file">
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
            <Menubar.Item>
              다른 이름으로 저장 <Menubar.Shortcut>⌘⇧S</Menubar.Shortcut>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content>
            <Menubar.Item>
              실행 취소 <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
              다시 실행 <Menubar.Shortcut>⌘⇧Z</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>잘라내기</Menubar.Item>
            <Menubar.Item>복사</Menubar.Item>
            <Menubar.Item>붙여넣기</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu value="view">
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content>
            <Menubar.Label>레이아웃</Menubar.Label>
            <Menubar.Item>사이드바</Menubar.Item>
            <Menubar.Item>전체 화면</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item>줌 인</Menubar.Item>
            <Menubar.Item>줌 아웃</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger>Help</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content>
            <Menubar.Item>문서</Menubar.Item>
            <Menubar.Item>키보드 단축키</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item disabled>업데이트 확인 (최신)</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  ),
};
