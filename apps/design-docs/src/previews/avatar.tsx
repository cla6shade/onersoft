'use client'

import { Avatar } from '@onersoft/design-system'

export function AvatarDemo() {
  return (
    <>
      <Avatar.Root>
        <Avatar.Image
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=128&h=128&fit=crop"
          alt="User"
        />
        <Avatar.Fallback delayMs={300}>HM</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src="" alt="" />
        <Avatar.Fallback>SK</Avatar.Fallback>
      </Avatar.Root>
    </>
  )
}
