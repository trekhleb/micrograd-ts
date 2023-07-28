import { attribute, Digraph, Node, Edge, toDot, NodeModel } from 'ts-graphviz'
import sum from 'hash-sum'
import { Value } from '../../../micrograd/engine'

function trace(root: Value) {
  const nodes = new Set<Value>()
  const edges = new Set<[Value, Value]>()
  const build = (current: Value) => {
    if (nodes.has(current)) return
    nodes.add(current)
    for (const parent of current.prev) {
      edges.add([parent, current])
      build(parent)
    }
  }
  build(root)
  return { nodes, edges }
}

// @see: https://graphviz.org/doc/info/lang.html
// @see: https://github.com/ts-graphviz/ts-graphviz
export function valToDot(val: Value): string {
  const fontName = 'Arial';
  const g = new Digraph(sum(val), { [attribute.rankdir]: 'LR' })
  const { nodes, edges } = trace(val)
  for (const node of nodes) {
    const uid = sum(node)
    const data = node.data.toFixed(4)
    const grad = node.grad.toFixed(4)
    g.addNode(
      new Node(uid, {
        [attribute.shape]: 'record',
        [attribute.fontname]: fontName,
        [attribute.label]: `{${node.label}} | {data ${data} | grad ${grad}}`,
      })
    )
    if (node.op) {
      const opUid = uid + node.op
      g.addNode(
        new Node(opUid, {
          [attribute.fontname]: fontName,
          [attribute.label]: node.op,
        })
      )
      g.addEdge(
        new Edge([g.getNode(opUid) as NodeModel, g.getNode(uid) as NodeModel])
      )
    }
  }
  for (const [parent, current] of edges) {
    g.addEdge(
      new Edge([
        g.getNode(sum(parent)) as NodeModel,
        g.getNode(sum(current) + current.op) as NodeModel,
      ])
    )
  }
  return toDot(g)
}
