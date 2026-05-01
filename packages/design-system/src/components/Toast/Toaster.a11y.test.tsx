import { describe, it, expect, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { runAxe } from '../../test/axe';
import { Toaster } from './Toaster';
import { toast } from './store';

describe('Toaster a11y', () => {
  afterEach(() => {
    toast.dismissAll();
  });

  it('has no axe violations with multiple intents rendered', async () => {
    render(<Toaster />);
    toast('저장됨', { description: '기본.' });
    toast.success('성공', {
      description: '변경 사항이 적용되었습니다.',
      action: { label: '실행 취소', onClick: () => {} },
    });
    toast.error('에러 발생');
    await waitFor(() => {
      expect(document.body.textContent).toMatch(/저장됨|성공|에러 발생/);
    });
    const results = await runAxe(document.body);
    expect(results.violations).toEqual([]);
  });
});
