import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Avatar } from '.';

describe('Avatar e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Avatar,
    renderFor: ({ className }) => (
      <Avatar.Root className={className}>
        <Avatar.Image src="" alt="User avatar" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    ),
  });
});
