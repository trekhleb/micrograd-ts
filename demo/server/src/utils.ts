import graphviz from 'graphviz'
import fs from 'fs'
import { Value } from '../../../micrograd/engine'

// You may need to update this constant based on your setup.
// For example it may be equal to '/usr/local/bin' in your case.
const GRAPH_VIZ_BIN_PATH = '/opt/homebrew/bin'

const GRAPH_VIZ_DEBUG_IMAGE_FOLDER = './images'

let idCount = 0
const ids = new WeakMap()
function id(obj: Object): string {
  const id = ids.get(obj)
  if (!id) {
    idCount++
    ids.set(obj, idCount)
    return `${idCount}`
  }
  return `${id}`
}

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

export function drawGraph(val: Value, imageName: string = 'graph') {
  const g = graphviz.digraph('G')
  g.set('rankdir', 'LR') // LR = Left to Right
  const { nodes, edges } = trace(val)
  for (const node of nodes) {
    const uid = id(node)
    const n = g.addNode(uid)
    n.set(
      'label',
      `{${node.label}} | {data ${node.data.toFixed(
        4
      )} | grad ${node.grad.toFixed(4)}}`
    )
    n.set('shape', 'record')
    if (node.op) {
      const o = g.addNode(uid + node.op)
      o.set('label', node.op)
      g.addEdge(uid + node.op, uid)
    }
  }
  for (const [parent, current] of edges) {
    g.addEdge(id(parent), id(current) + current.op)
  }
  g.setGraphVizPath(GRAPH_VIZ_BIN_PATH)

  if (!fs.existsSync(GRAPH_VIZ_DEBUG_IMAGE_FOLDER)) {
    fs.mkdirSync(GRAPH_VIZ_DEBUG_IMAGE_FOLDER)
  }

  const imageFormat = 'png'
  const imagePath = `${GRAPH_VIZ_DEBUG_IMAGE_FOLDER}/${imageName}.${imageFormat}`

  g.output(imageFormat, imagePath)

  console.log(`Debug image: ${imagePath}`)
}
