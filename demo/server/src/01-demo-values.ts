import { v } from '../../../micrograd/engine'
import { drawGraph } from './utils'

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

// The calculation graph may be exported to the image
// See the generated image in ./images/01-demo-values.png 
drawGraph(abc, '01-demo-values')
