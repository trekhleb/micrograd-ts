import { Layout } from './components/layout'
import { Demos } from './components/demos'
import { Header } from './components/header'

export function App() {
  return (
    <Layout>
      <Header />
      <Demos />
    </Layout>
  )
}
