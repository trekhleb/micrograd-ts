import { ScatterPlot, ScatterPlotRawSerie, ScatterPlotDatum, ResponsiveScatterPlot} from '@nivo/scatterplot'
import { Value } from '../../../micrograd/engine'

export interface RectDrawInfo {
  xVal: number,
  yVal: number,
  pred: number,
}

interface MoonChartProps {
  data: ScatterPlotRawSerie<ScatterPlotDatum>[],
  predictionData: RectDrawInfo[],
  labels: number[],
  trainingStarted: boolean
}

export const MoonChart = ({data, labels, predictionData, trainingStarted}: MoonChartProps) => {

  return (
    <ResponsiveScatterPlot
      data={data}
      margin={{ top: 8, right: 8, bottom: 70, left: 60 }}
      xScale={{type: 'linear', min: -10, max: 10}}
      yScale={{type: 'linear', min: -10, max: 10}}

      layers={[
        'grid',
        'axes',
        'nodes',
        'markers',
        'mesh',
        'legends',
        (props: any) => {
          const arr = [-2, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0];
          if (trainingStarted) {
            return (
              <>
                {predictionData.map((data, idx) => {
                  return (
                    <rect 
                      key={`pred_highlight_${idx}`}
                      x={props.xScale(data.xVal)}
                      y={props.yScale(data.yVal)}
                      width={10}
                      height={5}
                      fill={Math.floor(data.pred) === -1 ? `rgba(255, 0, 0, ${0.5 * Math.abs(data.pred)})` : `rgba(0, 255, 0, ${0.5 * Math.abs(data.pred)})`}
                    >
                    </rect>
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
                    x={props.xScale((val.x as number) - 0.2)}
                    y={props.yScale((val.y as number) + 0.3)}
                    width={10}
                    height={10}
                    fill={labels[idx] === -1 ? `rgba(255, 0, 0, 0.5)` : `rgba(0, 255, 0, 0.5)`}
                    pointerEvents={'none'}
                  >
                  </rect>
                )
              })}
              </>
            )
          }
        }
      ]}
      yFormat=" >-.2f"
      useMesh
      colors="black"
    />
  )
}
