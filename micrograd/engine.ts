type ValueParams = { op?: string; label?: string; prev?: Value[] }

// Stores a single scalar value and its gradient.
export class Value {
  data: number
  grad: number = 0
  label: string
  prev: Value[]
  op: string | null

  constructor(data: number, params: ValueParams = {}) {
    this.data = data
    this.op = params?.op ?? null
    this.label = params?.label ?? ''
    this.prev = params?.prev ?? []
  }

  private toVal(v: Value | number): Value {
    return typeof v === 'number' ? new Value(v) : v
  }

  private backwardStep() {}

  add(v: Value | number): Value {
    const other = this.toVal(v)
    const out = new Value(this.data + other.data, {
      prev: [this, other],
      op: '+',
    })
    out.backwardStep = () => {
      this.grad += 1 * out.grad
      other.grad += 1 * out.grad
    }
    return out
  }

  sub(v: Value | number): Value {
    const other = this.toVal(v)
    const out = new Value(this.data - other.data, {
      prev: [this, other],
      op: '-',
    })
    out.backwardStep = () => {
      this.grad += 1 * out.grad
      other.grad += -1 * out.grad
    }
    return out
  }

  mul(v: Value | number): Value {
    const other = this.toVal(v)
    const out = new Value(this.data * other.data, {
      prev: [this, other],
      op: '*',
    })
    out.backwardStep = () => {
      this.grad += other.data * out.grad
      other.grad += this.data * out.grad
    }
    return out
  }

  div(v: Value | number): Value {
    const other = this.toVal(v)
    const out = new Value(this.data / other.data, {
      prev: [this, other],
      op: '/',
    })
    out.backwardStep = () => {
      this.grad += (1 / other.data) * out.grad
      other.grad += (-this.data / other.data ** 2) * out.grad
    }
    return out
  }

  pow(other: number): Value {
    if (typeof other !== 'number')
      throw new Error('Only supporting int/float powers')
    const out = new Value(this.data ** other, {
      prev: [this],
      op: '^',
    })
    out.backwardStep = () => {
      this.grad += other * this.data ** (other - 1) * out.grad
    }
    return out
  }

  exp(): Value {
    const out = new Value(Math.exp(this.data), { prev: [this], op: 'e' })
    out.backwardStep = () => {
      this.grad += out.data * out.grad
    }
    return out
  }

  tanh(): Value {
    const out = new Value(Math.tanh(this.data), { prev: [this], op: 'tanh' })
    out.backwardStep = () => (this.grad += (1 - out.data ** 2) * out.grad)
    return out
  }

  relu(): Value {
    const reluVal = this.data < 0 ? 0 : this.data
    const out = new Value(reluVal, { prev: [this], op: 'relu' })
    out.backwardStep = () => (this.grad += (out.data > 0 ? 1 : 0) * out.grad)
    return out
  }

  backward(): void {
    // Topological order of all the children in the graph.
    const topo: Value[] = []
    const visited = new Set()
    const buildTopo = (v: Value) => {
      if (visited.has(v)) return
      visited.add(v)
      for (const parent of v.prev) buildTopo(parent)
      topo.push(v)
    }
    buildTopo(this)
    topo.reverse()

    // Go one variable at a time and apply the chain rule to get its gradient.
    this.grad = 1
    for (const node of topo) node.backwardStep()
  }
}

// Shortcut for: new Value(data, params)
export const v = (d: number, p: ValueParams = {}): Value => new Value(d, p)
