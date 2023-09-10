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
  labels: number[],
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
}

export const PredictionsChart = (props: TestPredChartProps) => {
  const { data, labels, predictionData, nodeSize, minX, maxX, minY, maxY } = props

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
          if (predictionData) {
            return (
              <>
                {predictionData.map((data, idx) => {
                  return (
                    <rect
                      key={`pred_highlight_${idx}`}
                      x={props.xScale(data.xVal)}
                      y={props.yScale(data.yVal)}
                      width={10}
                      height={10}
                      fill={
                        Math.floor(data.pred) === -1
                          ? `rgba(255, 0, 0, ${0.25 * Math.abs(data.pred)})`
                          : `rgba(0, 255, 0, ${0.25 * Math.abs(data.pred)})`
                      }
                    ></rect>
                  )
                })}
              </>
            )
          } else {
            return (
              <>
                {data[0].data.map((val, idx) => {
                  return (
                    <rect
                      key={`plot_highlight_${idx}`}
                      x={props.xScale(val.x as number) - nodeSize / 2}
                      y={props.yScale(val.y as number) - nodeSize / 2}
                      width={10}
                      height={10}
                      fill={
                        labels[idx] === -1
                          ? `rgba(255, 0, 0, 0.5)`
                          : `rgba(0, 255, 0, 0.5)`
                      }
                      pointerEvents={'none'}
                    ></rect>
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
