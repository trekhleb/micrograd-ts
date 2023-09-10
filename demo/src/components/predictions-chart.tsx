import {
  ScatterPlotRawSerie,
  ScatterPlotDatum,
  ResponsiveScatterPlot,
} from '@nivo/scatterplot'

export interface RectDrawInfo {
  xVal: number
  yVal: number
  pred: number
}

interface TestPredChartProps {
  data: ScatterPlotRawSerie<ScatterPlotDatum>[]
  nodeSize: number
  predictionData?: RectDrawInfo[]
  labels: number[]
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export const PredictionsChart = (props: TestPredChartProps) => {
  const { data, labels, predictionData, nodeSize, minX, maxX, minY, maxY } =
    props

  return (
    <ResponsiveScatterPlot
      data={data}
      margin={{ top: 8, right: 8, bottom: 20, left: 20 }}
      xScale={{ type: 'linear', min: minX, max: maxX }}
      yScale={{ type: 'linear', min: minY, max: maxY }}
      nodeSize={nodeSize}
      layers={[
        'grid',
        'axes',
        'nodes',
        'markers',
        'mesh',
        'legends',
        (props) => {
          if (predictionData && predictionData.length) {
            return (
              <>
                {predictionData.map((data, idx) => {
                  return (
                    <circle
                      key={`pred_highlight_${idx}`}
                      cx={props.xScale(data.xVal)}
                      cy={props.yScale(data.yVal)}
                      r={nodeSize / 2}
                      fill={
                        Math.floor(data.pred) === -1
                          ? `rgba(255, 0, 0, ${0.6 * Math.abs(data.pred)})`
                          : `rgba(0, 200, 0, ${0.8 * Math.abs(data.pred)})`
                      }
                      pointerEvents={'none'}
                    ></circle>
                  )
                })}
              </>
            )
          } else {
            return (
              <>
                {data[0].data.map((val, idx) => {
                  return (
                    <circle
                      key={`plot_highlight_${idx}`}
                      cx={props.xScale(val.x as number)}
                      cy={props.yScale(val.y as number)}
                      r={nodeSize / 2 + 1}
                      fill={
                        labels[idx] === -1
                          ? `rgba(255, 0, 0, 0.9)`
                          : `rgba(0, 200, 0, 0.9)`
                      }
                      pointerEvents={'none'}
                    ></circle>
                  )
                })}
              </>
            )
          }
        },
      ]}
      yFormat=" >-.2f"
      useMesh
      colors="black"
    />
  )
}
