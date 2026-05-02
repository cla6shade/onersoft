import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Toast } from '.';

describe('Toast e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Toast,
    renderFor: ({ className }) => (
      <Toast.Provider swipeDirection="right" duration={4000}>
        <Toast.Root open className={className}>
          <Toast.Title>Saved successfully</Toast.Title>
          <Toast.Description>Your changes are now live.</Toast.Description>
          <Toast.Close aria-label="Dismiss">×</Toast.Close>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    ),
  });
});
