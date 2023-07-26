import { v } from '../../../micrograd/engine'
import { Neuron } from '../../../micrograd/nn'
import { drawGraph } from './utils'

// Create a test input for a neuron.
const x = [v(3, {label: 'x'})]

// Create a simple neuron with one input.
const n = new Neuron(x.length)

// Run a test data through the neuron and see its output.
// Forward pass.
const out = n.forward(x)

// Calculate the gradients (derivatives) of each value.
// Backward pass.
out.backward()

// Preview the computation graph of the neuron
// See the generated image in ./images/02-demo-neuron-single-input.png
drawGraph(out, '02-demo-neuron-single-input')