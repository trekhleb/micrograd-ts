import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components/layout'
import { Demos } from './components/demos'
import { Header } from './components/header'
import { MICROGRAD_TS_BASE_DEMO_PATH } from './config/links'

const router = createBrowserRouter([
  {
    path: MICROGRAD_TS_BASE_DEMO_PATH,
    element: <Demos />,
  },
])

export function App() {
  return (
    <Layout>
      <Header />
      <RouterProvider router={router} />
    </Layout>
  )
}
