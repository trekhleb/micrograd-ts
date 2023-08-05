import { Block } from 'baseui/block'

import { v } from '../../../micrograd/engine'
import { ComputationGraph } from '../components/computation-graph'
import { Code } from '../components/code-block'
import { H2 } from '../components/h2'
import { CodeLinks } from '../components/code-links'
import { ParagraphMedium } from 'baseui/typography'
import { StyledLink } from 'baseui/link'

export function DemoValue() {
  return (
    <>
      <ParagraphMedium>
        This demo shows how to create scalar values and how to build an{' '}
        expression out of them. Once the expression is build we may do a{' '}
        <StyledLink href="https://en.wikipedia.org/wiki/Backpropagation">
          backpropagation
        </StyledLink>
      </ParagraphMedium>

      <H2>Code Context</H2>
      <CodeLinks
        links={[
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/micrograd/engine.ts',
            name: 'micrograd-ts/micrograd/engine.ts',
          },
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/demo/src/demos/demo-value.tsx',
            name: 'micrograd-ts/demo/src/demos/demo-value.tsx',
          },
        ]}
      />

      <H2>Simple Expression</H2>
      <DemoValueSimple />

      <H2>Simulate the Neuron Expression</H2>
      <DemoValueMoreComplex />
    </>
  )
}

function DemoValueSimple() {
  // Initialize values.
  const a = v(5, { label: 'a' })
  const b = v(3, { label: 'b' })
  const c = v(2, { label: 'c' })

  // Start doing some math operations with values to form a chain of calculations.
  const ab = a.mul(b)
  ab.label = 'a*b'

  const abc = ab.add(c)
  abc.label = 'a*b+c'

  // Once we have a chain of calculations we may calculate gradients (derivatives).
  abc.backward()

  return (
    <>
      <Block marginBottom="40px">
        <Code
          code={`
// Initialize values.
const a = v(5, { label: 'a' })
const b = v(3, { label: 'b' })
const c = v(2, { label: 'c' })

// Start doing some math operations with values to form a chain of calculations.
const ab = a.mul(b)
ab.label = 'a*b'

const abc = ab.add(c)
abc.label = 'a*b+c'

// Once we have a chain of calculations we may calculate gradients (derivatives).
abc.backward()
    `}
        />
      </Block>
      <ComputationGraph value={abc} />
    </>
  )
}

function DemoValueMoreComplex() {
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

  return (
    <>
      <Block marginBottom="40px">
        <Code
          code={`
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

// Once we have a chain of calculations we may calculate gradients (derivatives).
o.backward()
    `}
        />
      </Block>
      <ComputationGraph value={o} />
    </>
  )
}
