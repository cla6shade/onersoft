import type { ComponentProps } from 'react'
import { EmptyState } from './EmptyState'

export { EmptyState }

export type EmptyStateRootProps = ComponentProps<typeof EmptyState>
export type EmptyStateMediaProps = ComponentProps<typeof EmptyState.Media>
export type EmptyStateTitleProps = ComponentProps<typeof EmptyState.Title>
export type EmptyStateDescriptionProps = ComponentProps<typeof EmptyState.Description>
export type EmptyStateActionsProps = ComponentProps<typeof EmptyState.Actions>
