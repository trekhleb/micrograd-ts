import {
  Badge,
  COLOR as BADGE_COLOR,
  HIERARCHY as BADGE_HIERARCHY,
} from 'baseui/badge'

type CodeBlockProps = {
  code: string
}

export function CodeBlock(props: CodeBlockProps) {
  return (
    <>
      <Badge
        color={BADGE_COLOR.primary}
        hierarchy={BADGE_HIERARCHY.primary}
        content={<>Code Example</>}
      />
      <div>{props.code}</div>
    </>
  )
}
