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
import { ParagraphMedium, MonoLabelLarge } from 'baseui/typography'
import { Table } from 'baseui/table-semantic'

import { v, Value } from '../../../micrograd/engine'
import { MLP } from '../../../micrograd/nn'
import { Code } from '../components/code-block'
import { CodeLinks } from '../components/code-links'
import { H2 } from '../components/h2'
import { LossChart } from '../components/loss-chart'
import { toFloat, toInt } from '../utils/numbers'
import { convertDataToValue, generateCircleData } from '../utils/data'
import { TestPredChart, RectDrawInfo } from '../components/test-pred-chart'
import { LegendLayout } from '../components/legend-layout'
import { circleWorkerCode } from '../workers/circleWorker'

interface Data {
  data: number[][]
  labels: number[]
}

// Create a blob from the worker code string
const circleWorkerBlob = new Blob([circleWorkerCode], {
  type: 'application/javascript',
})

export function DemoMLPTesting() {
  const [epochsRaw, setEpochs] = React.useState<number | string>(30)
  const [learningRateRaw, setLearningRate] = React.useState<number | string>(
    0.2
  )

  const [startTraining, setStartTraining] = React.useState<boolean>(false)
  const [dataLoaded, setDataLoaded] = React.useState<boolean>(false)

  const [dataPointsRaw, setDataPoints] = React.useState<number | string>(150)

  const [losses, setLosses] = React.useState<number[]>([])
  const [trainingPredictions, setTrainingPredictions] = React.useState<
    number[]
  >([])
  const [testPredictions, setTestPredictions] = React.useState<RectDrawInfo[]>(
    []
  )

  const epochs = toInt(epochsRaw, 0)
  const learningRate = toFloat(learningRateRaw, 0)
  const dataPoints = toInt(dataPointsRaw, 0)

  const [circleData, setCircleData] = React.useState<Data>({
    data: [],
    labels: [],
  })
  const [hoverTrue, setHoverTrue] = React.useState<boolean>(false)
  const [hoverFalse, setHoverFalse] = React.useState<boolean>(false)

  React.useEffect(() => {
    setCircleData(generateCircleData(150))
  }, [])

  //Dynamically generate training dataset
  const circleDataValues = React.useMemo(() => {
    const vals = convertDataToValue(circleData)
    setDataLoaded(true)
    return vals
  }, [circleData])

  React.useEffect(() => {
    const circleWorkerUrl = URL.createObjectURL(circleWorkerBlob)
    const circleWorker = new Worker(circleWorkerUrl)
    setDataLoaded(false)
    circleWorker.onmessage = (event: MessageEvent<Data>) => {
      setCircleData(event.data)
    }
    circleWorker.postMessage(dataPoints)

    return () => {
      circleWorker.terminate()
      URL.revokeObjectURL(circleWorkerUrl)
    }
  }, [dataPoints])

  const trainCallback = React.useCallback(() => {
    // Create a Multi Layer Perceptron (MLP) network.
    // - 3 inputs
    // - 1st layer of 4 neurons
    // - 2nd layer of 4 neurons
    // - 1 output
    setStartTraining(true)
    const mlp = new MLP(2, [4, 4, 1])

    const lossHistory: number[] = []

    // Run training loops for a specified number of epochs.
    for (let epoch = 1; epoch <= epochs; epoch++) {
      // Forward pass
      const ypred: Value[] = []
      for (const x of circleDataValues.dataValues) {
        ypred.push(mlp.forward(x)[0])
      }

      // Calculate loss
      // Mean square error loss function.
      let loss = v(0)
      for (let i = 0; i < circleDataValues.labelValues.length; i++) {
        loss = loss.add(circleDataValues.labelValues[i].sub(ypred[i]).pow(2))
      }
      loss = loss.div(circleDataValues.labelValues.length)
      lossHistory.push(loss.data)

      // Backward pass
      // Stochastic gradient descent update
      mlp.zeroGrad() // reset grads to zero to start accumulating fresh gradients
      loss.backward()

      // Update
      for (const p of mlp.parameters()) {
        p.data += -learningRate * p.grad
      }

      setTrainingPredictions(ypred.map((out) => out.data))
    }
    setLosses([...lossHistory])
    const newTestPredictions = []
    for (let i = -5; i <= 5; i += 0.25) {
      for (let j = -5; j <= 5; j += 0.25) {
        const testValue = [v(i), v(j)]
        newTestPredictions.push({
          xVal: i,
          yVal: j,
          pred: mlp.forward(testValue)[0].data,
        })
      }
    }
    setTestPredictions(newTestPredictions)
  }, [epochs, learningRate, circleDataValues, circleData])

  React.useEffect(() => {
    //If there are no losses and dynamic data has been initialized
    if (losses.length === 0 && circleData.data.length !== 0) {
      // Initial training
      trainCallback()
    }
  }, [trainCallback, losses, circleData])

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

  const data: ScatterPlotRawSerie<ScatterPlotDatum>[] = [
    {
      id: 'circle_data',
      data: circleData.data.map((datum) => {
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
        against a set of dynamically generated data.
      </ParagraphMedium>

      <ParagraphMedium>
        Once the network has been trained, we test it against a uniform range of
        data between the points (-5, -5) and (5, 5). The accuracy of our test
        predictions provides an additional measure of clarity regarding how well
        our model is predicting the expected output.
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
            flexDirection={'column'}
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
            flexDirection={'column'}
            flex="1"
            marginRight={['0px', '0px', '10px']}
          >
            <FormControl
              label={() => 'Data Points'}
              caption="Scatterplot points generated"
            >
              <Input
                type="number"
                min={0}
                max={1000}
                maxLength={4}
                value={dataPointsRaw}
                onChange={(e) => {
                  setStartTraining(false)
                  setDataPoints(e.target.value)
                }}
              />
            </FormControl>
          </Block>

          <Block
            flex="1"
            flexDirection={'column'}
            width="100%"
            marginLeft={['0px', '0px', '10px']}
          >
            <FormControl
              label={() => 'Learning Rate'}
              caption="Gradient convergence step size"
            >
              <Input
                value={learningRateRaw}
                onChange={(e) => setLearningRate(e.target.value)}
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
          <Block marginRight={['0', '0', '30px']} flex={1}>
            <LegendLayout
              legend={[
                {
                  text: 'True (1)',
                  standardColor: 'rgba(0, 255, 0, 0.2)',
                  hovered: hoverTrue,
                  hoverColor: 'rgba(0, 255, 0, 0.5)',
                  onMouseEnter: () => setHoverTrue(true),
                  onMouseLeave: () => setHoverTrue(false),
                },
                {
                  text: 'False (-1)',
                  standardColor: 'rgba(255, 0, 0, 0.2)',
                  hovered: hoverFalse,
                  hoverColor: 'rgba(255, 0, 0, 0.5)',
                  onMouseEnter: () => setHoverFalse(true),
                  onMouseLeave: () => setHoverFalse(false),
                },
              ]}
            />
          </Block>
          <Block>
            <H2>Final Predictions</H2>
            <Table
              columns={['x', 'y', 'Label', 'Predict']}
              data={
                dataLoaded &&
                circleDataValues &&
                circleDataValues.dataValues.length !== 0 &&
                trainingPredictions.length !== 0 &&
                circleDataValues.labelValues.length >= 10
                  ? circleDataValues.labelValues
                      .slice(0, 10)
                      .map((y, trainingEntryIndex) => {
                        return [
                          circleDataValues.dataValues[
                            trainingEntryIndex
                          ][0].data.toFixed(2),
                          circleDataValues.dataValues[
                            trainingEntryIndex
                          ][1].data.toFixed(2),
                          y.data,
                          trainingPredictions[trainingEntryIndex].toFixed(4),
                        ]
                      })
                  : [['-1.00', '-1.00', '1', '-1.0000']]
              }
            />
          </Block>
        </Block>

        <Block
          marginLeft={['0', '0', '30px']}
          flex="1"
          display={'flex'}
          flexDirection={'column'}
        >
          <H2>{`Test Predictions Visualization ${
            startTraining ? '(Predicted)' : '(Actual)'
          }`}</H2>
          <Block height="440px" $style={{ fontFamily: 'monospace' }}>
            <TestPredChart
              data={data}
              nodeSize={10}
              labels={circleData.labels}
              trainingStarted={startTraining}
              predictionData={testPredictions ? testPredictions : []}
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
