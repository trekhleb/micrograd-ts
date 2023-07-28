import React from 'react'
import { Tabs, Tab } from 'baseui/tabs-motion'

import { DemoMLP } from './demos/demo-mlp'
import { DemoNeuron } from './demos/demo-neuron'
import { DemoValues } from './demos/demo-values'
import { Layout } from './layout'

export function App() {
  const [activeKey, setActiveKey] = React.useState<string>('0')

  return (
    <Layout>
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => setActiveKey(`${activeKey}`)}
        activateOnFocus
      >
        <Tab title="Value"><DemoValues /></Tab>
        <Tab title="Neuron"><DemoNeuron /></Tab>
        <Tab title="MLP"><DemoMLP /></Tab>
      </Tabs>
      
      
    </Layout>
  )
}
