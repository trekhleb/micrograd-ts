import { ScatterPlot, ScatterPlotRawSerie, ScatterPlotDatum} from '@nivo/scatterplot'

type MoonChartProps = {
  data: ScatterPlotRawSerie<ScatterPlotDatum>[]
  labels: number[],
}

export const MoonChart = (props: MoonChartProps) => {
  const { data, labels } = props
  console.log(data)

  return (
    <ScatterPlot
      width={800}
      height={400}
      data={data}
      margin={{ top: 8, right: 8, bottom: 70, left: 60 }}
      xScale={{type: 'linear', min: -10, max: 10}}
      yScale={{type: 'linear', min: -10, max: 10}}
      axisBottom={{
        legend: 'Epochs',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        legend: 'Loss',
        legendOffset: -50,
        legendPosition: 'middle',
      }}
      layers={[
        'grid',
        'axes',
        'nodes',
        'markers',
        'mesh',
        'legends',
        (props: any) => {
          const arr = [-2, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0];
          return (
            <>
              {data[0].data.map((val, idx) => {
                return (
                  <rect
                    x={props.xScale(val.x - 0.13)}
                    y={props.yScale(val.y + 0.3)}
                    width={10}
                    height={10}
                    fill={labels[idx] === -1 ? `rgba(255, 0, 0, 0.5)` : `rgba(0, 255, 0, 0.5)`}
                    pointerEvents={'none'}
                  >
                  </rect>
                )
              })}
            </>
          );
        }
      ]}
      yFormat=" >-.2f"
      useMesh
      colors="black"
    />
  )
}