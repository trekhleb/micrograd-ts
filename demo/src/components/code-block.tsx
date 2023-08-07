import { CodeBlock, dracula } from 'react-code-blocks'
import { styled } from 'baseui'

import { StyledBadge } from './badge'

type CodeProps = {
  code: string
}

export function Code(props: CodeProps) {
  return (
    <>
      <StyledBadge>Code Example</StyledBadge>
      <CodeContainer>
        <CodeBlock
          // eslint-disable-next-line
          // @ts-ignore
          text={props.code.trim()}
          language="typescript"
          theme={dracula}
          showLineNumbers={false}
        />
      </CodeContainer>
    </>
  )
}

const CodeContainer = styled('div', ({$theme}) => ({
  fontFamily: $theme.typography.MonoLabelSmall.fontFamily,
  fontSize: $theme.typography.MonoLabelSmall.fontSize
}))
