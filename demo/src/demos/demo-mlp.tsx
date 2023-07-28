import { Block } from 'baseui/block'
import { v } from '../../../micrograd/engine'
import { MLP } from '../../../micrograd/nn'
import { Code } from '../components/code-block'
import { ComputationGraph } from '../components/computation-graph'

export function DemoMLP() {
  // Create a test input for MLP (Multi Layer Perceptron).
  const x = [
    v(2, { label: 'x1' }),
    v(3, { label: 'x2' }),
  ]

  // Create MLP network
  // - 2 inputs
  // - 1st layer of 4 neurons
  // - 2nd layer of 4 neurons
  // - 1 output
  const nn = new MLP(2, [4, 4, 1])

  // Run a test data through the neuron and see its output.
  // Forward pass.
  const out = nn.forward(x)

  // Calculate the gradients (derivatives) of each value of each neuron inside the MLP network.
  // Backward pass.
  out[0].backward()

  return (
    <>
      <Block marginBottom="40px">
        <Code
          code={`
// Create a test input for MLP (Multi Layer Perceptron).
const x = [
  v(2, { label: 'x1' }),
  v(3, { label: 'x2' }),
]

// Create MLP network
// - 2 inputs
// - 1st layer of 4 neurons
// - 2nd layer of 4 neurons
// - 1 output
const nn = new MLP(2, [4, 4, 1])

// Run a test data through the neuron and see its output.
// Forward pass.
const out = nn.forward(x)

// Calculate the gradients (derivatives) of each value of each neuron inside the MLP network.
// Backward pass.
out[0].backward()
          `}
        />
      </Block>
      <ComputationGraph value={out[0]} />
    </>
  )
}
