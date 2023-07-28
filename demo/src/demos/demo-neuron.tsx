import { v } from '../../../micrograd/engine'
import { Neuron } from '../../../micrograd/nn'
import { ComputationGraph } from '../components/computation-graph'

export function DemoNeuron() {
  const x = v(5, { label: 'x' })
  const n1 = new Neuron(1)
  const out = n1.forward([x])
  out.backward()

  return <ComputationGraph value={out} />
}
