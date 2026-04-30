import type { ComponentProps } from 'react'
import { Card } from './Card'

export { Card, type CardRootProps } from './Card'

export type CardHeaderProps = ComponentProps<typeof Card.Header>
export type CardEyebrowProps = ComponentProps<typeof Card.Eyebrow>
export type CardTitleProps = ComponentProps<typeof Card.Title>
export type CardDescriptionProps = ComponentProps<typeof Card.Description>
export type CardBodyProps = ComponentProps<typeof Card.Body>
export type CardFooterProps = ComponentProps<typeof Card.Footer>
