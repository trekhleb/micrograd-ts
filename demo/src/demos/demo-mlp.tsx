import { Block } from 'baseui/block'
import { v } from '../../../micrograd/engine'
import { MLP } from '../../../micrograd/nn'
import { CodeBlock } from '../components/code-block'
import { ComputationGraph } from '../components/computation-graph'

export function DemoMLP() {
  const x = [v(2, { label: 'x1' }), v(3, { label: 'x2' })]
  const nn = new MLP(2, [4, 4, 1])
  const out = nn.forward(x)
  out[0].backward()

  return (
    <>
      <Block marginBottom="40px">
        <CodeBlock
          code={`
const x = [v(2, { label: 'x1' }), v(3, { label: 'x2' })]
const nn = new MLP(2, [4, 4, 1])
const out = nn.forward(x)
out[0].backward()
          `}
        />
      </Block>

      <ComputationGraph value={out[0]} />
    </>
  )
}
