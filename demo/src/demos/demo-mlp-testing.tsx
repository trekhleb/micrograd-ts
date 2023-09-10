import React from 'react'
import { Block } from 'baseui/block'
import { FormControl } from 'baseui/form-control'
import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { Datum, Serie } from '@nivo/line'
import {
  ScatterPlotRawSerie,
  ScatterPlotDatum,
} from '@nivo/scatterplot/dist/types/types'
import { StyledLink } from 'baseui/link'
import {
  ParagraphMedium,
  MonoLabelLarge,
  MonoLabelSmall,
} from 'baseui/typography'
import { Table } from 'baseui/table-semantic'

import { v, Value } from '../../../micrograd/engine'
import { MLP } from '../../../micrograd/nn'
import { Code } from '../components/code-block'
import { CodeLinks } from '../components/code-links'
import { H2 } from '../components/h2'
import { LossChart } from '../components/loss-chart'
import { toFloat, toInt } from '../utils/numbers'
import { convertDataToValue, generateCircleData } from '../utils/data'
import { PredictionsChart, RectDrawInfo } from '../components/predictions-chart'

interface Data {
  data: number[][]
  labels: number[]
}

const minX = -8
const maxX = 8
const minY = -8
const maxY = 8
const testPointsStep = 0.25
const defaultPointsNum = 150
const defaultEpochs = 30
const defaultLearningRate = 0.2

export function DemoMLPTesting() {
  // Learning rate
  const [lrRaw, setLr] = React.useState<number | string>(defaultLearningRate)
  // Training predictions
  const [trainPredicts, setTrainPredicts] = React.useState<number[]>([])
  // Test predictions
  const [testPredicts, setTestPredicts] = React.useState<RectDrawInfo[]>([])
  const [epochsRaw, setEpochs] = React.useState<number | string>(defaultEpochs)
  const [pointsNumRaw, setPointsNum] = React.useState<number | string>(
    defaultPointsNum
  )
  const [losses, setLosses] = React.useState<number[]>([])

  const epochs = toInt(epochsRaw, 0)
  const lr = toFloat(lrRaw, 0)
  const pointsNum = toInt(pointsNumRaw, 0)

  const [trainSet, setTrainSet] = React.useState<Data>({ data: [], labels: [] })

  const trainSetValues = React.useMemo(
    () => convertDataToValue(trainSet),
    [trainSet]
  )

  // Inference.
  const testCallback = React.useCallback((mlp: MLP) => {
    console.log('+++ Inference')
    const newTestPredictions = []
    for (let xVal = minX; xVal <= maxX; xVal += testPointsStep) {
      for (let yVal = minY; yVal <= maxY; yVal += testPointsStep) {
        const testValue = [v(xVal), v(yVal)]
        const pred = mlp.forward(testValue)[0].data
        newTestPredictions.push({ xVal, yVal, pred })
      }
    }
    setTestPredicts(newTestPredictions)
  }, [])

  // Training.
  const trainCallback = React.useCallback(() => {
    console.log('+++ Training')
    // Create a Multi Layer Perceptron (MLP) network.
    // - 3 inputs
    // - 1st layer of 4 neurons
    // - 2nd layer of 4 neurons
    // - 1 output
    const mlp = new MLP(2, [4, 4, 1])
    const lossHistory: number[] = []

    // Run training loops for a specified number of epochs.
    for (let epoch = 1; epoch <= epochs; epoch++) {
      // Forward pass
      const ypred: Value[] = []
      for (const x of trainSetValues.dataValues) {
        ypred.push(mlp.forward(x)[0])
      }

      // Calculate loss
      // Mean square error loss function.
      let loss = v(0)
      for (let i = 0; i < trainSetValues.labelValues.length; i++) {
        loss = loss.add(trainSetValues.labelValues[i].sub(ypred[i]).pow(2))
      }
      loss = loss.div(trainSetValues.labelValues.length)
      lossHistory.push(loss.data)

      // Backward pass
      // Stochastic gradient descent update
      mlp.zeroGrad() // reset grads to zero to start accumulating fresh gradients
      loss.backward()

      // Update
      for (const p of mlp.parameters()) {
        p.data += -lr * p.grad
      }

      setTrainPredicts(ypred.map((out) => out.data))
    }
    setLosses([...lossHistory])

    testCallback(mlp)
  }, [epochs, lr, trainSetValues, testCallback])

  // Update training set once the data points num is updated.
  React.useEffect(() => {
    console.log('+++ Generate training set')
    setTrainSet(generateCircleData(pointsNum))
  }, [pointsNum])

  // Once the training set is updated, launch the training process.
  React.useEffect(() => {
    if (!trainSet.data.length) return
    console.log('+++ Launch the training')
    trainCallback()
  }, [trainCallback, trainSet])

  const lossChartData: Serie[] = [
    {
      id: 'loss',
      data: losses.map((loss: number, epoch: number): Datum => {
        return {
          x: epoch,
          y: loss,
        }
      }),
    },
  ]

  const trainScatterData: ScatterPlotRawSerie<ScatterPlotDatum>[] = [
    {
      id: 'circle_data',
      data: trainSet.data.map((datum) => {
        return {
          x: datum[0],
          y: datum[1],
        }
      }),
    },
  ]

  return (
    <>
      <ParagraphMedium>
        This demo illustrates the training process of the{' '}
        <StyledLink href="https://en.wikipedia.org/wiki/Multilayer_perceptron">
          Multilayer perceptron
        </StyledLink>{' '}
        against a set of dynamically generated "circular" data, where the inner
        circle has positive labels (1), and the outer circle has negative labels
        (-1)
      </ParagraphMedium>

      <ParagraphMedium>
        Once the network has been trained, we test it against a uniform range of
        data. The accuracy of our test predictions provides an additional
        measure of clarity regarding how well our model is predicting the
        expected output.
      </ParagraphMedium>

      <H2>Code Context</H2>
      <CodeLinks
        links={[
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/micrograd/nn.ts',
            name: 'micrograd-ts/micrograd/nn.ts',
          },
          {
            url: 'https://github.com/trekhleb/micrograd-ts/blob/main/demo/src/demos/demo-mlp-testing.tsx',
            name: 'micrograd-ts/demo/src/demos/demo-mlp-testing.tsx',
          },
        ]}
      />

      <H2>Training Parameters</H2>
      <Block>
        <Block display="flex" flexDirection={['column', 'column', 'row']}>
          <Block
            display="flex"
            flexDirection="column"
            flex="1"
            marginRight={['0px', '0px', '10px']}
          >
            <FormControl
              label={() => 'Epochs'}
              caption="Network training iterations"
            >
              <Input
                type="number"
                min={0}
                maxLength={4}
                value={epochsRaw}
                onChange={(e) => setEpochs(e.target.value)}
              />
            </FormControl>
          </Block>

          <Block
            display="flex"
            flexDirection="column"
            flex="1"
            marginLeft={['0px', '0px', '10px']}
            marginRight={['0px', '0px', '10px']}
          >
            <FormControl
              label={() => 'Learning Rate'}
              caption="Gradient convergence step size"
            >
              <Input value={lrRaw} onChange={(e) => setLr(e.target.value)} />
            </FormControl>
          </Block>

          <Block
            display="flex"
            flexDirection="column"
            flex="1"
            marginLeft={['0px', '0px', '10px']}
          >
            <FormControl
              label={() => 'Data Points'}
              caption="Number of generated scatterplot points"
            >
              <Input
                type="number"
                min={0}
                max={1000}
                maxLength={4}
                value={pointsNumRaw}
                onChange={(e) => {
                  setPointsNum(e.target.value)
                }}
              />
            </FormControl>
          </Block>
        </Block>

        <Button
          startEnhancer={() => <GiWeightLiftingUp />}
          onClick={trainCallback}
        >
          Retrain
        </Button>
      </Block>

      <Block
        marginBottom="-20px"
        display="flex"
        flexDirection={['column', 'column', 'row']}
      >
        <Block marginRight={['0', '0', '30px']}>
          <Block marginBottom="40px">
            <H2>Final Loss (MSE)</H2>
            <MonoLabelLarge>
              {(losses[losses.length - 1] || 0).toFixed(4)}
            </MonoLabelLarge>
          </Block>

          <Block>
            <H2>Training Predictions</H2>
            <Table
              columns={['x', 'y', 'Label', 'Predict']}
              data={
                trainSetValues?.labelValues?.length
                  ? trainSetValues.labelValues.slice(0, 10).map((y, idx) => {
                      return [
                        trainSetValues.dataValues[idx][0]?.data?.toFixed(2),
                        trainSetValues.dataValues[idx][1]?.data?.toFixed(2),
                        y?.data,
                        trainPredicts[idx]?.toFixed(4),
                      ]
                    })
                  : []
              }
            />
          </Block>
        </Block>

        <Block
          marginLeft={['0', '0', '30px']}
          flex="1"
          display={'flex'}
          flexDirection={'column'}
          overflow="hidden"
        >
          <Block marginRight={['0', '0', '40px']} flex={1}>
            <H2>Legend</H2>
            <MonoLabelSmall>
              <Block display="flex" flexDirection="row" alignItems="center">
                <Block display="flex" marginRight="30px" alignItems="center">
                  <div
                    style={{
                      backgroundColor: 'rgba(0, 255, 0, 0.2)',
                      width: '20px',
                      height: '20px',
                      marginRight: '10px',
                    }}
                  />
                  <div>Positive (1)</div>
                </Block>
                <Block display="flex" alignItems="center">
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 0, 0, 0.2)',
                      width: '20px',
                      height: '20px',
                      marginRight: '10px',
                    }}
                  />
                  <div>Negative (-1)</div>
                </Block>
              </Block>
            </MonoLabelSmall>
          </Block>

          <H2>MLP Predictions</H2>
          <Block
            display="flex"
            width="100%"
            flexDirection="row"
            height="440px"
            $style={{ fontFamily: 'monospace' }}
          >
            <PredictionsChart
              data={trainScatterData}
              nodeSize={10}
              labels={trainSet.labels}
              predictionData={testPredicts ? testPredicts : []}
              minX={-8}
              maxX={8}
              minY={-8}
              maxY={8}
            />
          </Block>

          <H2>Training Loss History</H2>
          <Block
            height="440px"
            $style={{ fontFamily: 'monospace' }}
            width="100%"
          >
            <LossChart data={lossChartData} />
          </Block>
        </Block>
      </Block>

      <Code
        code={`
// Dynamically create a training dataset.
// Each dataset entry consists of 2 inputs (features).
const points = generateData(150)

points.data == [
  [v(2), v(3)],
  [v(4), v(7)],
  ...points.data
]

// One label for each dataset entry.
// Here we're saying that with the points.data[i] input we expect the network to have points.labels[i] in the output.
points.labels == [v(1), v(-1), v(1), ...points.labels]

// Create a Multi Layer Perceptron (MLP) network.
// - 2 inputs
// - 1st layer of 4 neurons
// - 2nd layer of 4 neurons
// - 1 output
const mlp = new MLP(2, [4, 4, 1])

// Run training loops for a specified number of epochs.
for (let epoch = 1; epoch <= epochs; epoch++) {
  // Forward pass
  const ypred: Value[] = []
  for (const x of points.data) {
    //Push 1st dimension of 1d output at index 0.
    ypred.push(mlp.forward(x)[0])
  }

  // Calculate loss
  // Mean square error loss function.
  let loss = v(0)
  for (let i = 0; i < points.labels.length; i++) {
    loss = loss.add(points.labels[i].sub(ypred[i]).pow(2))
  }
  loss = loss.div(points.labels.length)

  // Backward pass
  // Stochastic gradient descent update
  mlp.zeroGrad() // reset grads to zero to start accumulating fresh gradients
  loss.backward()

  // Update
  for (const p of mlp.parameters()) {
    p.data += -learningRate * p.grad
  }

  setPredictions(ypred.map((out) => out.data))
}
          `}
      />
    </>
  )
}
