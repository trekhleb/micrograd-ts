import { MonoLabelSmall } from 'baseui/typography'
import { Block } from 'baseui/block'

type LegendProps = {
  label: string
  color: string
}

export function Legend(props: LegendProps) {
  const { label, color } = props
  return (
    <Block display="flex" marginRight="30px" alignItems="center">
      <div
        style={{
          backgroundColor: color,
          width: '20px',
          height: '20px',
          marginRight: '10px',
        }}
      />
      <MonoLabelSmall>{label}</MonoLabelSmall>
    </Block>
  )
}
