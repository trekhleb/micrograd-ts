import { v } from '../../../micrograd/engine'
import { ComputationGraph } from '../utils/computation-graph'

export function DemoMLP() {
  // Inputs x1, x2
  const x1 = v(2, { label: 'x1' })
  const x2 = v(0, { label: 'x2' })

  // Weights w1, w2
  const w1 = v(-3, { label: 'w1' })
  const w2 = v(1, { label: 'w2' })

  // bias of the neuron
  const b = v(6.8813735870195432, { label: 'b' })

  // x1w1 + x2w2 + b
  const x1w1 = x1.mul(w1)
  x1w1.label = 'x1w1'

  const x2w2 = x2.mul(w2)
  x2w2.label = 'x2w2'

  const x1w1x2w2 = x1w1.add(x2w2)
  x1w1x2w2.label = 'x1w1x2w2'

  const n = x1w1x2w2.add(b)
  n.label = 'n'

  const o = n.tanh()
  o.label = 'o'

  o.backward()

  return <ComputationGraph value={o} />
}
