import React from 'react'
import { HeadingLarge } from 'baseui/typography'

type H1Props = {
  children: React.ReactNode
}

export function H1(props: H1Props) {
  return <HeadingLarge>{props.children}</HeadingLarge>
}
