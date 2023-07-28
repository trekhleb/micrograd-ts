import { v } from '../../../micrograd/engine'
import { Neuron } from '../../../micrograd/nn'
import { ComputationGraph } from '../components/computation-graph'

export function DemoNeuron() {
  // Create a test input for a neuron.
  const x = [v(3, { label: 'x' })]

  // Create a simple neuron with one input.
  const n = new Neuron(x.length)

  // Run a test data through the neuron and see its output.
  // Forward pass.
  const out = n.forward(x)

  // Calculate the gradients (derivatives) of each value.
  // Backward pass.
  out.backward()

  return <ComputationGraph value={out} />
}
