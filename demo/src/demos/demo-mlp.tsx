import { Block } from 'baseui/block'

import { v } from '../../../micrograd/engine'
import { MLP } from '../../../micrograd/nn'
import { Code } from '../components/code-block'
import { ComputationGraph } from '../components/computation-graph'
import { ParagraphMedium } from 'baseui/typography'
import { CodeLinks } from '../components/code-links'
import { H2 } from '../components/h2'
import { StyledLink } from 'baseui/link'

export function DemoMLP() {
  // Create a test input for MLP (Multi Layer Perceptron).
  const x = [v(2, { label: 'x1' }), v(3, { label: 'x2' })]

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
      <ParagraphMedium>
        This demo shows how to create a simple{' '}
        <StyledLink href="https://en.wikipedia.org/wiki/Multilayer_perceptron">
          Multilayer perceptron
        </StyledLink>{' '}
        (MLP) with 3 layers (2 inputs, 4 neurons, 4 neurons, 1 output neuron).
      </ParagraphMedium>

      <H2>Code Context</H2>
      <CodeLinks
        links={[
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/micrograd/nn.ts',
            name: 'micrograd-ts/micrograd/nn.ts',
          },
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/demo/src/demos/demo-mlp.tsx',
            name: 'micrograd-ts/demo/src/demos/demo-mlp.tsx',
          },
        ]}
      />

      <H2>Three layers perceptron</H2>
      <Block marginBottom="40px">
        <Code
          code={`
// Create a test input for MLP (Multilayer perceptron).
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
