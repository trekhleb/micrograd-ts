import React from 'react'
import { Tabs, Tab, ORIENTATION } from 'baseui/tabs-motion'

import { DemoMLP } from './demos/demo-mlp'
import { DemoNeuron } from './demos/demo-neuron'
import { DemoValues } from './demos/demo-values'
import { Layout } from './layout'

enum TabKey {
  Value = 'value',
  Neuron = 'neuron',
  MLP = 'mlp',
}

type TabConfig = { title: string; content: React.ReactNode }

const TabsMap: Map<TabKey, TabConfig> = new Map([
  [TabKey.Value, { title: 'Value', content: <DemoValues /> }],
  [TabKey.Neuron, { title: 'Neuron', content: <DemoNeuron /> }],
  [TabKey.MLP, { title: 'MLP', content: <DemoMLP /> }],
])

export function App() {
  const [activeKey, setActiveKey] = React.useState<React.Key>(TabKey.Value)

  const tabs = Array.from(TabsMap.entries()).map(
    ([tabKey, tabConfig]: [TabKey, TabConfig]) => (
      <Tab title={tabConfig.title} key={tabKey}>
        {tabConfig.content}
      </Tab>
    )
  )

  return (
    <Layout>
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => setActiveKey(`${activeKey}`)}
        orientation={ORIENTATION.vertical}
        activateOnFocus
      >
        {tabs}
      </Tabs>
    </Layout>
  )
}
