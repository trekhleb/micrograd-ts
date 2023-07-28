import React from 'react'
import { HeadingXSmall } from 'baseui/typography'

type H2Props = {
  children: React.ReactNode
}

export function H2(props: H2Props) {
  return <HeadingXSmall>{props.children}</HeadingXSmall>
}
