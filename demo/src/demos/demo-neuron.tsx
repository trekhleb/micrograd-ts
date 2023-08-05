import { Block } from 'baseui/block'
import { ParagraphMedium } from 'baseui/typography'

import { v } from '../../../micrograd/engine'
import { Neuron } from '../../../micrograd/nn'
import { ComputationGraph } from '../components/computation-graph'
import { H2 } from '../components/h2'
import { Code } from '../components/code-block'
import { CodeLinks } from '../components/code-links'

export function DemoNeuron() {
  return (
    <>
      <ParagraphMedium>
        This demo shows how to create a simple Neuron and how to do a forward
        and backward pass on it.
      </ParagraphMedium>

      <H2>Code Context</H2>
      <CodeLinks
        links={[
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/micrograd/nn.ts',
            name: 'micrograd-ts/micrograd/nn.ts',
          },
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/demo/src/demos/demo-neuron.tsx',
            name: 'micrograd-ts/demo/src/demos/demo-neuron.tsx',
          },
        ]}
      />

      <H2>Single Input</H2>
      <DemoNeuronSingleInput />

      <H2>Multiple Inputs</H2>
      <DemoNeuronMultipleInputs />
    </>
  )
}

function DemoNeuronSingleInput() {
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

  return (
    <>
      <Block marginBottom="40px">
        <Code
          code={`
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
    `}
        />
      </Block>
      <ComputationGraph value={out} />
    </>
  )
}

function DemoNeuronMultipleInputs() {
  // Create a test input for a neuron.
  const x = [
    v(3, { label: 'x1' }),
    v(2, { label: 'x2' }),
    v(-1.5, { label: 'x3' }),
  ]

  // Create a simple neuron with one input.
  const n = new Neuron(x.length)

  // Run a test data through the neuron and see its output.
  // Forward pass.
  const out = n.forward(x)

  // Calculate the gradients (derivatives) of each value.
  // Backward pass.
  out.backward()

  return (
    <>
      <Block marginBottom="40px">
        <Code
          code={`
// Create a test input for a neuron.
const x = [
  v(3, { label: 'x1' }),
  v(2, { label: 'x2' }),
  v(-1.5, { label: 'x3' }),
]

// Create a simple neuron with one input.
const n = new Neuron(x.length)

// Run a test data through the neuron and see its output.
// Forward pass.
const out = n.forward(x)

// Calculate the gradients (derivatives) of each value.
// Backward pass.
out.backward()
    `}
        />
      </Block>
      <ComputationGraph value={out} />
    </>
  )
}
