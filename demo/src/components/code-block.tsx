import { CodeBlock, dracula } from 'react-code-blocks'
import { StyledBadge } from './badge'

type CodeProps = {
  code: string
}

export function Code(props: CodeProps) {
  return (
    <>
      <StyledBadge>Code Example</StyledBadge>
      <div style={{ fontFamily: "'Fira Code', monospace" }}>
        <CodeBlock
          // eslint-disable-next-line
          // @ts-ignore
          text={props.code.trim()}
          language="typescript"
          theme={dracula}
          showLineNumbers={false}
        />
      </div>
    </>
  )
}
