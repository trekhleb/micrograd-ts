import React from 'react'
import { Tabs, Tab, ORIENTATION } from 'baseui/tabs-motion'

import { DemoMLP } from '../demos/demo-mlp'
import { DemoNeuron } from '../demos/demo-neuron'
import { DemoValues } from '../demos/demo-values'
import { H1 } from './h1'

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

export function Demos() {
  const [activeKey, setActiveKey] = React.useState<React.Key>(TabKey.Value)

  const tabs = Array.from(TabsMap.entries()).map(
    ([tabKey, tabConfig]: [TabKey, TabConfig]) => (
      <Tab title={tabConfig.title} key={tabKey}>
        <H1>{tabConfig.title}</H1>
        {tabConfig.content}
      </Tab>
    )
  )

  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => setActiveKey(`${activeKey}`)}
      orientation={ORIENTATION.horizontal}
      activateOnFocus
    >
      {tabs}
    </Tabs>
  )
}
