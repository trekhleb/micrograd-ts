import { ResponsiveLine, Serie } from '@nivo/line'
import { Block } from 'baseui/block'

type LossChartProps = {
  data: Serie[]
}

export const LossChart = (props: LossChartProps) => {
  const { data } = props

  return (
    <Block height="400px" $style={{ fontFamily: 'monospace' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 8, right: 8, bottom: 70, left: 60 }}
        curve="natural"
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
        pointSize={10}
        pointColor="black"
        pointBorderWidth={2}
        pointBorderColor="white"
        pointLabelYOffset={-12}
        useMesh
        colors="black"
      />
    </Block>
  )
}
