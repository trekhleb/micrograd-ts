import { v } from '../../../micrograd/engine'
import { Neuron } from '../../../micrograd/nn'
import { drawGraph } from './utils'

// Create a test input for a neuron.
const x = [
  v(3, {label: 'x'}),
  v(2, {label: 'x'}),
  v(-1.5, {label: 'x'}),
]

// Create a simple neuron with one input.
const n = new Neuron(x.length)

// Run a test data through the neuron and see its output.
// Forward pass.
const out = n.forward(x)

// Calculate the gradients (derivatives) of each value.
// Backward pass.
out.backward()

// Preview the computation graph of the neuron
// See the generated image in ./images/03-demo-neuron-multiple-inputs.png
drawGraph(out, '03-demo-neuron-multiple-inputs')