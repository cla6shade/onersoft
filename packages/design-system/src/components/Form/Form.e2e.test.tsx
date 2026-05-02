import { describe } from 'vitest';
import { useForm } from 'react-hook-form';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './Form';
import { Input } from '../Input';

function Harness({ descriptionClassName }: { descriptionClassName?: string }) {
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
            <FormDescription className={descriptionClassName}>
              Use your work email.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}

describe('Form e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Form,
    renderFor: ({ className }) => <Harness descriptionClassName={className} />,
  });
});
