import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components/layout'
import { Demos } from './components/demos'
import { Header } from './components/header'

const router = createBrowserRouter([
  {
    path: '/',
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
