import { v } from '../../../micrograd/engine'
import { MLP } from '../../../micrograd/nn'
import { ComputationGraph } from '../components/computation-graph'

export function DemoMLP() {
  const x = [v(2, { label: 'x1' }), v(3, { label: 'x2' })]
  const nn = new MLP(2, [4, 4, 1])
  const out = nn.forward(x)
  out[0].backward()

  return <ComputationGraph value={out[0]} />
}
