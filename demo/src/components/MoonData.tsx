import { ScatterPlot, ScatterPlotRawSerie, ScatterPlotDatum} from '@nivo/scatterplot'

type MoonChartProps = {
  data: ScatterPlotRawSerie<ScatterPlotDatum>[]
}

export const MoonChart = (props: MoonChartProps) => {
  const { data } = props

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
              {arr.map((val, idx) => {
                return (
                  <rect
                    x={props.xScale(val)}
                    y={props.yScale(val)}
                    width={20}
                    height={20}
                    fill={`rgba(255, 0, 0, 0.2)`}
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