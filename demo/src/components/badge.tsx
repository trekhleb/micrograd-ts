import React from 'react'
import { Block } from 'baseui/block'
import {
  Badge,
  COLOR as BADGE_COLOR,
  HIERARCHY as BADGE_HIERARCHY,
} from 'baseui/badge'

type StyledBadgeProps = {
  children: React.ReactNode
}

export function StyledBadge(props: StyledBadgeProps) {
  return (
    <Block marginBottom="10px">
      <Badge
        color={BADGE_COLOR.primary}
        hierarchy={BADGE_HIERARCHY.primary}
        content={<>{props.children}</>}
      />
    </Block>
  )
}
