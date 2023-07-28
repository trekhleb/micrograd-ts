import React from 'react'
import { Tabs, Tab, ORIENTATION } from 'baseui/tabs-motion'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { DemoMLP } from '../demos/demo-mlp'
import { DemoNeuron } from '../demos/demo-neuron'
import { DemoValue } from '../demos/demo-value'
import { H1 } from './h1'

enum TabKey {
  Value = 'value',
  Neuron = 'neuron',
  MLP = 'mlp',
}

type TabConfig = { title: string; content: React.ReactNode }

const TabsMap: Map<TabKey, TabConfig> = new Map([
  [TabKey.Value, { title: 'Value', content: <DemoValue /> }],
  [TabKey.Neuron, { title: 'Neuron', content: <DemoNeuron /> }],
  [TabKey.MLP, { title: 'MLP', content: <DemoMLP /> }],
])

export function Demos() {
  const location = useLocation()
  const navigate = useNavigate()

  const defaultTabKey: React.Key = location.hash
    ? location.hash.replace('#', '')
    : TabKey.Value

  console.log(location.hash)

  const [activeKey, setActiveKey] = React.useState<React.Key>(defaultTabKey)

  const tabs = Array.from(TabsMap.entries()).map(
    ([tabKey, tabConfig]: [TabKey, TabConfig]) => (
      <Tab title={tabConfig.title} key={tabKey}>
        <H1>{tabConfig.title}</H1>
        {tabConfig.content}
      </Tab>
    )
  )

  const onTabSelect = (tabKey: TabKey) => {
    setActiveKey(tabKey)
    navigate(`#${tabKey}`)
  }

  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => onTabSelect(activeKey as TabKey)}
      orientation={ORIENTATION.horizontal}
      activateOnFocus
    >
      {tabs}
    </Tabs>
  )
}
