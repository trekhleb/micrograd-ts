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
      yFormat=" >-.2f"
      useMesh
      colors="black"
    />
  )
}