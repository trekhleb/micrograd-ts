import {
  Badge,
  COLOR as BADGE_COLOR,
  HIERARCHY as BADGE_HIERARCHY,
} from 'baseui/badge'
import { Block } from 'baseui/block'
import { CodeBlock, dracula } from 'react-code-blocks'

type CodeProps = {
  code: string
}

export function Code(props: CodeProps) {
  return (
    <>
      <Block marginBottom="10px">
        <Badge
          color={BADGE_COLOR.primary}
          hierarchy={BADGE_HIERARCHY.secondary}
          content={<>Code Example</>}
        />
      </Block>
      <div style={{ fontFamily: "'Fira Code', monospace" }}>
        <CodeBlock
          text={props.code.trim()}
          language="typescript"
          theme={dracula}
          showLineNumbers={false}
        />
      </div>
    </>
  )
}
