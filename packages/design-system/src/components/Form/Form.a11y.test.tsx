import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { runAxe } from '../../test/axe';
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

function Harness() {
  const form = useForm({
    defaultValues: { email: 'invalid' },
    errors: { email: { type: 'manual', message: 'Invalid email.' } },
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
            <FormDescription>Use your work email.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}

describe('Form a11y', () => {
  it('has no axe violations with label, description, and error message', async () => {
    const { container } = render(<Harness />);
    const results = await runAxe(container);
    expect(results.violations).toEqual([]);
  });
});
