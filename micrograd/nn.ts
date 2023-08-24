import { Value } from './engine'

class Module {
  zeroGrad() {
    for (const p of this.parameters()) p.grad = 0
  }
  parameters(): Value[] {
    return []
  }
}
export class Neuron extends Module {
  w: Value[] = []
  b: Value

  constructor(nin: number) {
    super()
    for (let i = 0; i < nin; i++) {
      const wi = new Value(Math.random() * 2 - 1)
      this.w.push(wi)
    }
    this.b = new Value(Math.random() * 2 - 1)
  }

  // w * x + b
  forward(x: Value[]): Value {
    if (!x.length) throw new Error('Empty x')
    let act = x[0].mul(this.w[0])
    for (let i = 1; i < x.length; i++) {
      act = act.add(x[i].mul(this.w[i]))
    }
    act = act.add(this.b)
    return act.tanh()
  }

  parameters(): Value[] {
    return [...this.w, this.b]
  }
}

export class Layer extends Module {
  neurons: Neuron[] = []

  constructor(nin: number, nout: number) {
    super()
    for (let i = 0; i < nout; i++) this.neurons.push(new Neuron(nin))
  }

  forward(x: Value[]): Value[] {
    const outs: Value[] = []
    for (const neuron of this.neurons) outs.push(neuron.forward(x))
    return outs
  }

  parameters(): Value[] {
    const params: Value[] = []
    for (const neuron of this.neurons) params.push(...neuron.parameters())
    return params
  }
}

export class MLP extends Module {
  layers: Layer[] = []

  constructor(nin: number, nouts: number[]) {
    super()
    const sz = [nin, ...nouts]
    for (let i = 0; i < nouts.length; i++) {
      this.layers.push(new Layer(sz[i], sz[i + 1]))
    }
  }

  forward(xin: Value[]): Value[] {
    let xout = [...xin]
    for (const layer of this.layers) xout = layer.forward(xout)
    console.log(xout[0]);
    return xout
  }

  parameters(): Value[] {
    const params: Value[] = []
    for (const layer of this.layers) params.push(...layer.parameters())
    return params
  }
}
