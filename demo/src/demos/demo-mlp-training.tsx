import React from 'react'
import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import { GiWeightLiftingUp } from 'react-icons/gi'

import { v, Value } from '../../../micrograd/engine'
import { MLP } from '../../../micrograd/nn'
import { Code } from '../components/code-block'
import { StyledLink } from 'baseui/link'
import { ParagraphMedium } from 'baseui/typography'
import { CodeLinks } from '../components/code-links'
import { H2 } from '../components/h2'

// Create a training dataset with 4 entries.
// Each dataset entry consists of 3 inputs (features).
const xs = [
  [v(2), v(3), v(-1)],
  [v(3), v(-1), v(0.5)],
  [v(0.5), v(1), v(1)],
  [v(1), v(1), v(-1)],
]

// Create training labels.
// One label for each dataset entry.
// Here we're saying that with the xs[i] input we expect the network to have y[i] in the output.
const ys = [v(1), v(-1), v(-1), v(1)]

// Create a Multi Layer Perceptron (MLP) network.
// - 3 inputs
// - 1st layer of 4 neurons
// - 2nd layer of 4 neurons
// - 1 output
const mlp = new MLP(3, [4, 4, 1])

export function DemoMLPTraining() {
  const [epochs, setEpochs] = React.useState<number>(20)
  const [learningRate, setLearningRate] = React.useState<number>(0.1)

  const [losses, setLosses] = React.useState<number[]>([])
  const [yPred, setYpred] = React.useState<number[]>([])

  const trainCallback = React.useCallback(() => {
    // Reset loss history and current epoch.
    setLosses([])

    // Run training loops for a specified number of epochs.
    for (let epoch = 1; epoch <= epochs; epoch++) {
      // Forward pass
      const ypred: Value[] = []
      for (const x of xs) {
        ypred.push(mlp.forward(x)[0])
      }

      // Calculate loss
      // Mean square error loss function.
      let loss = v(0)
      for (let i = 0; i < ys.length; i++) {
        loss = loss.add(ys[i].sub(ypred[i]).pow(2))
      }
      loss = loss.div(ys.length)
      setLosses([...losses, loss.data])

      // Backward pass
      // Stochastic gradient descent update
      mlp.zeroGrad() // reset grads to zero to start accumulating fresh gradients
      loss.backward()

      // Update
      for (const p of mlp.parameters()) {
        p.data += -learningRate * p.grad
      }

      setYpred(ypred.map((o) => o.data))
    }
  }, [epochs, losses, learningRate])

  const onSetEpochs = (value: string | number) => {
    const valueNumber = typeof value === 'number' ? value : parseInt(value)
    setEpochs(valueNumber > 0 ? valueNumber : 0)
  }

  const onLearningRate = (value: string | number) => {
    const valueNumber = typeof value === 'number' ? value : parseFloat(value)
    setLearningRate(valueNumber > 0 ? valueNumber : 0.1)
  }

  React.useEffect(() => {
    // Initial training
    trainCallback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ParagraphMedium>
        This demo illustrates the training process of the{' '}
        <StyledLink href="https://en.wikipedia.org/wiki/Multilayer_perceptron">
          Multilayer perceptron
        </StyledLink>{' '}
        (MLP) which consists of the forward pass, loss calculation, backward
        pass, and adjusting weights.
      </ParagraphMedium>

      <H2>Code Context</H2>
      <CodeLinks
        links={[
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/micrograd/nn.ts',
            name: 'micrograd-ts/micrograd/nn.ts',
          },
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/demo/src/demos/demo-mlp-training.tsx',
            name: 'micrograd-ts/demo/src/demos/demo-mlp-training.tsx',
          },
        ]}
      />

      <H2>Training Parameters</H2>
      <Block marginBottom="40px">
        <Block display="flex" flexDirection={['column', 'column', 'row']}>
          <Block flex="1" marginRight={['0px', '0px', '10px']}>
            <FormControl
              label={() => 'Epochs'}
              caption={() =>
                'For how many training session we plan tro train the network'
              }
            >
              <Input
                type="number"
                min={0}
                value={epochs}
                onChange={(e) => onSetEpochs(e.target.value)}
              />
            </FormControl>
          </Block>

          <Block flex="1" marginLeft={['0px', '0px', '10px']}>
            <FormControl
              label={() => 'Learning Rate'}
              caption={() =>
                'Defines how big should be the gradient convergence steps'
              }
            >
              <Input
                value={learningRate}
                onChange={(e) => onLearningRate(e.target.value)}
              />
            </FormControl>
          </Block>
        </Block>

        <Button
          startEnhancer={() => <GiWeightLiftingUp />}
          onClick={trainCallback}
        >
          Start Training
        </Button>
      </Block>
      {/* <ComputationGraph value={out[0]} /> */}

      <Code
        code={`
// Create a training dataset with 4 entries.
// Each dataset entry consists of 3 inputs (features).
const xs = [
  [v(2), v(3), v(-1)],
  [v(3), v(-1), v(0.5)],
  [v(0.5), v(1), v(1)],
  [v(1), v(1), v(-1)],
]

// Create training labels.
// One label for each dataset entry.
// Here we're saying that with the xs[i] input we expect the network to have y[i] in the output.
const ys = [v(1), v(-1), v(-1), v(1)]

// Create a Multi Layer Perceptron (MLP) network.
// - 3 inputs
// - 1st layer of 4 neurons
// - 2nd layer of 4 neurons
// - 1 output
const mlp = new MLP(3, [4, 4, 1])
          `}
      />
    </>
  )
}
