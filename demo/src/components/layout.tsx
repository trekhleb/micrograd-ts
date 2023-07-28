import React from 'react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'

const engine = new Styletron()

type LayoutProps = {
  children: React.ReactNode,
}

export function Layout(props: LayoutProps) {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        {props.children}
      </BaseProvider>
    </StyletronProvider>
  )
}
