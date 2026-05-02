import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './Form';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Select } from '../Select';

const meta: Meta = {
  title: 'Forms/Form',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'react-hook-form 기반 폼 프리미티브. `Form`(=`FormProvider`) 안에서 `FormField`가 `Controller`를 감싸고, `FormItem`이 id를 발급해 `FormLabel` / `FormControl` / `FormDescription` / `FormMessage`의 `id`·`aria-*` 배선과 에러 상태를 자동으로 연결합니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: function Basic() {
    const form = useForm({ defaultValues: { email: '' } });
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>회사 도메인 이메일을 사용해주세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  },
};

export const WithError: Story = {
  render: function WithError() {
    const form = useForm({
      defaultValues: { email: 'not-an-email' },
      errors: {
        email: { type: 'manual', message: '유효한 이메일 형식이 아닙니다.' },
      },
    });
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>회사 도메인 이메일을 사용해주세요.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  },
};

export const Interactive: Story = {
  render: function Interactive() {
    const form = useForm({ defaultValues: { email: '' }, mode: 'onChange' });
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          rules={{
            validate: (v) =>
              typeof v === 'string' && (v.length === 0 || v.includes('@'))
                ? true
                : '@ 가 포함되어야 합니다.',
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>입력하면 실시간 검증.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  },
};

export const WithTextarea: Story = {
  render: function WithTextarea() {
    const form = useForm({ defaultValues: { feedback: '' } });
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>피드백</FormLabel>
              <FormControl>
                <Textarea placeholder="자유롭게 작성해주세요" rows={4} {...field} />
              </FormControl>
              <FormDescription>최소 20자 이상 권장.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  },
};

export const WithSelect: Story = {
  render: function WithSelect() {
    const form = useForm({ defaultValues: { lang: 'ko' } });
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="lang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>언어</FormLabel>
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <Select.Trigger>
                    <Select.Value placeholder="선택" />
                  </Select.Trigger>
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    );
  },
};
