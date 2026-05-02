import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Slider } from './Slider';

describe('Slider e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Slider,
    renderFor: ({ className }) => (
      <Slider
        className={className}
        defaultValue={[40]}
        min={0}
        max={100}
        step={1}
        aria-label="Volume"
      />
    ),
  });
});
