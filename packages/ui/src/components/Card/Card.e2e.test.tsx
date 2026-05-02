import { describe } from 'vitest';

import { componentMatrix } from '../../test/utils';
import { runComponentMatrix } from '../../test/e2eMatrix';
import { Card } from './Card';

describe('Card e2e', () => {
  runComponentMatrix({
    ...componentMatrix.Card,
    renderFor: ({ className }) => (
      <Card>
        <Card.Header>
          <Card.Eyebrow>Section</Card.Eyebrow>
          <Card.Title className={className}>Card title</Card.Title>
          <Card.Description>Supporting description goes here.</Card.Description>
        </Card.Header>
        <Card.Body>Body content.</Card.Body>
      </Card>
    ),
  });
});
