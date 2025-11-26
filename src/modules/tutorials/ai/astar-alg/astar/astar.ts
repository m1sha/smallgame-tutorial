import { MapSource } from "./game-map"
import { Node, TPoint2 } from "./node"

const eqeals = (a: TPoint2 | null, b: TPoint2 | null) => {
  if (!a && !b) return false
  if (!a || !b) return false
  return a[0] === b[0] && a[1] === b[1]
}

export class AStar {
  isPathFound = false
  waiting: Node[] = []
  checked: Node[] = []
  path: Node[] = []

  start: TPoint2 | null = null
  goal: TPoint2 | null = null

  constructor (public map: MapSource, private gCallback: (y: number, x: number, g: number) => number) {}

  setStart (start: TPoint2 | null) { this.start = start }
  setGoal (goal: TPoint2 | null) { this.goal = goal }

  startConstructPath () {
    if (eqeals(this.start, this.goal)) {
      this.isPathFound = true
      return
    }

    this.isPathFound = false

    const start_node = new Node(0, this.start!, this.goal!, null)
    this.path = []
    this.checked = [start_node]
    this.waiting = this.getNeighborhoods(start_node)
  }

  nextIteration () {
    if (this.waiting.length === 0) {
      this.isPathFound = true
      return
    }

    this.waiting.sort((a, b) => a.F - b.F)
    const node = this.waiting.shift()!
    if (eqeals(node!.current, this.goal)) {
      this.path = this.calcPath(node)
      this.isPathFound = true
      return
    }

    if (this.checkSames(this.checked, node)) return

    this.checked.push(node)
    this.waiting.push(...this.getNeighborhoods(node))
  }

  getPath () {
    const maxIteration = 2000
    let counter = 0
    if (eqeals(this.start, this.goal)) return []

    const startNode = new Node(0, this.start!, this.goal!, null)
    let path: Node[] = []
    const closeList = [startNode]
    const openList = this.getNeighborhoods(startNode)

    while (openList.length > 0) {
      if (counter++ > maxIteration) break

      openList.sort((a, b) => a.F - b.F)
      const node = openList.shift()!

      if (eqeals(node.current, this.goal)) {
        path.push(...this.calcPath(node))
        break
      }

      if (this.checkSames(closeList, node)) continue

      closeList.push(node)
      openList.push(...this.getNeighborhoods(node))
    }

    path.reverse()
    return path
  }

  private checkSames (close_list: Node[], node: Node) {
    const sames = close_list.filter(p => eqeals(p.current, node.current))

    if (sames.length > 0) {
      for (const same of sames)
        if (same.F > node.F) same.F = node.F
      return true
    }
    return false
  }

  private getNeighborhoods (node: Node): Node[] {
    const result: Node[] = []
    this.createNeighbor(result, node,  -1, 0)
    this.createNeighbor(result, node, 1, 0)
    this.createNeighbor(result, node, -1, 1)
    this.createNeighbor(result, node, 1, 1)
    return result
  }

  private createNeighbor (arr: Node[], node: Node, offset: number, axis: number) {
    const axis_val = node.current[axis] + offset
    const max_size =  (axis == 0) ? this.map.map.length  : this.map.map[0].length

    if (axis_val >= 0 && axis_val < max_size) {
      const y = axis == 0 ? axis_val : node.current[0]
      const x = axis == 1 ? axis_val : node.current[1]

      if (!node.parent || ( y !== 0 || x !== 0)){
        const g = this.gCallback(y, x, node.G)
        arr.push(new Node(g, [y, x], [node.target[0], node.target[1]], node))
      }
    }
  }

  private calcPath (node: Node): Node[] {
    const result = [node]
    let curr = node.parent
    while (curr) {
      result.push(curr)
      curr = curr.parent
    }
    return result
  }
}

