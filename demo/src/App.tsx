import { v } from '../../micrograd/engine'

function App() {

  // Initialize values.
  const a = v(5, { label: 'a' })
  const b = v(3, { label: 'b' })
  const c = v(2, { label: 'c' })

  // Start doing some math operations with values to form a chain of calculations.
  const ab = a.mul(b)
  ab.label = 'a*b'

  const abc = ab.add(c)
  abc.label = 'a*b+c'

  // Once we have a chain of calculations we may calculate gradients (derivatives).
  abc.backward()

  console.log(abc)

  return (
    <>
      Demo here...
    </>
  )
}

export default App
