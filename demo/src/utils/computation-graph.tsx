import { CSSProperties } from 'react'
import { Graphviz } from 'graphviz-react'

import { Value } from '../../../micrograd/engine'
import { valToDot } from './utils'

type ComputationGraphProps = {
  value: Value
}

export function ComputationGraph(props: ComputationGraphProps) {
  const { value } = props

  if (value === undefined) return

  const containerStyles: CSSProperties = {
    backgroundColor: '#ccc',
    overflow: 'scroll',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderStyle: 'solid',
    fontFamily: 'monospace',
  }

  return (
    <div style={containerStyles}>
      <Graphviz
        dot={valToDot(value)}
        options={{ fade: true, fit: true, scale: 1, width: 1000 }}
        className="computation-graph"
      />
    </div>
  )
}
