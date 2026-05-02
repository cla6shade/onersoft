import type { Meta, StoryObj } from '@storybook/react-vite';
import demo from '../../stories/demo.module.css';
import { Button } from '../Button';
import { Toaster, toast } from '.';

const meta: Meta = {
  title: 'Primitives/Toaster (imperative)',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "`<Toaster />`를 앱 루트에 한 번 마운트하고, 어디서든 `toast()` 함수로 띄웁니다. React context가 아니라 module-level store라 라우트 핸들러·이벤트 리스너·form submit 등 컴포넌트 외부에서도 호출 가능합니다.\n\n```tsx\nimport { Toaster, toast } from '@onersoft/ui'\n\n// app root\n<Toaster />\n\n// 어디서든\ntoast.success('저장됨')\ntoast.error('실패', { description: '다시 시도해주세요', duration: 6000 })\ntoast.dismiss(id)\n```",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const AllIntents: Story = {
  render: () => (
    <>
      <div className={demo.demoFlexWrap}>
        <Button
          variant="ghost"
          onClick={() => toast('저장됨', { description: '기본 neutral 인텐트.' })}
        >
          Default
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            toast.success('저장됨', {
              description: '변경 사항이 적용되었습니다.',
              action: { label: '실행 취소', onClick: () => {} },
            })
          }
        >
          Success
        </Button>
        <Button
          variant="ghost"
          onClick={() => toast.warning('주의', { description: '연결이 불안정합니다.' })}
        >
          Warning
        </Button>
        <Button
          variant="ghost"
          onClick={() => toast.error('저장 실패', { description: '서버에 연결할 수 없습니다.' })}
        >
          Error
        </Button>
        <Button variant="ghost" onClick={() => toast.info('새 업데이트가 있습니다.')}>
          Info
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`action: { label, onClick }` 옵션으로 Toast 안에 액션 버튼을 둘 수 있습니다. 사용자가 작업 결과를 즉시 되돌리거나 재시도할 수 있게 해주세요.',
      },
    },
  },
  render: () => (
    <>
      <Button
        onClick={() =>
          toast.error('파일을 삭제했습니다', {
            description: 'project-spec.pdf',
            action: { label: '실행 취소', onClick: () => toast.success('복원됨') },
          })
        }
      >
        삭제 + Undo
      </Button>
      <Toaster />
    </>
  ),
};

export const UpdateInPlace: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '같은 `id`를 재사용하면 기존 toast를 in-place로 업데이트합니다. "저장 중…" → "저장됨" 같은 상태 전이에 유용합니다.',
      },
    },
  },
  render: () => {
    const startSave = () => {
      const id = toast('저장 중…', { duration: Infinity });
      setTimeout(() => {
        toast.success('저장됨', { id, description: '변경 사항이 안전하게 저장되었습니다.' });
      }, 1500);
    };
    return (
      <>
        <Button onClick={startSave}>저장 시작</Button>
        <Toaster />
      </>
    );
  },
};

export const Stacking: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '여러 toast가 동시에 viewport에 쌓일 수 있습니다. `toast.dismissAll()` 로 한 번에 정리.',
      },
    },
  },
  render: () => (
    <>
      <div className={demo.demoFlexWrap}>
        <Button
          onClick={() => {
            toast('첫 번째');
            toast.success('두 번째');
            toast.warning('세 번째');
          }}
        >
          3개 띄우기
        </Button>
        <Button variant="ghost" onClick={() => toast.dismissAll()}>
          전체 닫기
        </Button>
      </div>
      <Toaster />
    </>
  ),
};
