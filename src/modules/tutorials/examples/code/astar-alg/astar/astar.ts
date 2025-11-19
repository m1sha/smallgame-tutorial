import { MapSource } from "./game-map"
import { Node } from "./node"

const eqeals = (a: [number, number] | null, b: [number, number] | null) => {
  if (!a && !b) return false
  if (!a || !b) return false
  return a[0] === b[0] && a[1] === b[1]
}

export class AStar {
  is_path_found = false
  waiting: Node[] = []
  checked: Node[] = []
  path: Node[] = []

  start: [number, number] | null = null
  goal: [number, number] | null = null

  constructor (public map: MapSource) {}

  setStart (start: [number, number] | null) { this.start = start }
  setGoal (goal: [number, number] | null) { this.goal = goal }

  startConstructPath () {
    if (eqeals(this.start, this.goal)) {
      this.is_path_found = true
      return
    }

    this.is_path_found = false

    const start_node = new Node(0, this.start!, this.goal!, null)
    this.path = []
    this.checked = [start_node]
    this.waiting = this.__get_neighborhoods(start_node)
  }

  nextIteration () {
    if (this.waiting.length === 0) {
      this.is_path_found = true
      return
    }

    this.waiting.sort((a, b) => a.F - b.F)
    const node = this.waiting.shift()!
    if (eqeals(node!.current, this.goal)) {
      this.path = this.__calc_path(node)
      this.is_path_found = true
      return
    }

    if (this.checkSames(this.checked, node)) return

    this.checked.push(node)
    this.waiting.push(...this.__get_neighborhoods(node))
  }

  getPath () {
    const maxIteration = 2000
    let counter = 0
    if (eqeals(this.start, this.goal)) return []

    const start_node = new Node(0, this.start!, this.goal!, null)
    let path: Node[] = []
    const close_list = [start_node]
    const open_list = this.__get_neighborhoods(start_node)

    while (open_list.length > 0) {
      if (counter++ > maxIteration) break

      open_list.sort((a, b) => a.F - b.F)
      const node = open_list.shift()!

      if (eqeals(node.current, this.goal)) {
        path.push(...this.__calc_path(node))
        break
      }

      if (this.checkSames(close_list, node)) continue

      close_list.push(node)
      open_list.push(...this.__get_neighborhoods(node))
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

  private __get_neighborhoods (node: Node): Node[] {
    const result: Node[] = []
    this.__create_neighbor(result, node,  -1, 0)
    this.__create_neighbor(result, node, 1, 0)
    this.__create_neighbor(result, node, -1, 1)
    this.__create_neighbor(result, node, 1, 1)
    return result
  }

  private __create_neighbor (arr: Node[], node: Node, offset: number, axis: number) {
    const axis_val = node.current[axis] + offset
    const max_size =  (axis == 0) ? this.map.map.length  : this.map.map[0].length

    if (axis_val >= 0 && axis_val < max_size) {
      const y = axis == 0 ? axis_val : node.current[0]
      const x = axis == 1 ? axis_val : node.current[1]

      if (!node.parent || ( y !== 0 || x !== 0)){
        const g = this.__cal_g_index(y, x, node.G)
        arr.push(new Node(g, [y, x], [node.target[0], node.target[1]], node))
      }
    }
  }



  private __calc_path (node: Node): Node[] {
    const result = [node]
    let curr = node.parent
    while (curr) {
      result.push(curr)
      curr = curr.parent
    }
    return result
  }

  private __cal_g_index (y: any, x: any, g: any) {
    let n = 1
    if (this.map.get(y, x) == 1) n = g * 1000 + 1000
    if (this.map.get(y, x) == 4) n = g * 2
    if (this.map.get(y, x) == 5) n = g * 200
    return n
  }
}

// class AStar:
//   def __init__(self, map) -> None:
//     self.map = map
//     self.map_height = len(map)
//     self.map_width = len(map[0])
//     self.is_path_found = False
//     self.waiting = []
//     self.checked = []

//   def set_start(self, start):
//     self.start = start

//   def set_goal(self, goal):
//     self.goal = goal

//   def start_construct_path(self):
//     if self.start == self.goal:
//       self.is_path_found = True
//       return
//     self.is_path_found = False
//     start_node = Node(0, self.start, self.goal, None)
//     self.path = []
//     self.checked = [start_node]
//     self.waiting = self.__get_neighborhoods(start_node)

//   def next_iteration(self):
//     if len(self.waiting) == 0:
//       self.is_path_found = True
//       return

//     self.waiting.sort(key = lambda k: k.F)
//     node = self.waiting.pop(0)
//     if node.current == self.goal:
//       self.path = self.__calc_path(node)
//       self.is_path_found = True
//       return

//     sames = [ch for ch in self.checked if ch.current == node.current]
//     if len(sames) > 0:
//       for same in sames:
//         if same.F > node.F: same.F = node.F
//       return
//     self.checked.append(node)
//     self.waiting += self.__get_neighborhoods(node)

//   def get_path(self):
//     if self.start == self.goal: return []
//     start_node = Node(0, self.start, self.goal, None)
//     path = []
//     close_list = [start_node]
//     open_list = self.__get_neighborhoods(start_node)

//     while len(open_list) > 0:
//       open_list.sort(key = lambda k: k.F)
//       node = open_list.pop(0)
//       if node.current == self.goal:
//         path = self.__calc_path(node)
//         break

//       sames = [same for same in close_list if same.current == node.current]
//       if len(sames) > 0:
//         for same in sames:
//           if same.F > node.F: same.F = node.F
//         continue
//       close_list.append(node)
//       open_list += self.__get_neighborhoods(node)

//     path.reverse()
//     return path

//   def __get_neighborhoods(self, node):
//     result = []
//     self.__create_neighbor(result, node,  -1, 0)
//     self.__create_neighbor(result, node, 1, 0)
//     self.__create_neighbor(result, node, -1, 1)
//     self.__create_neighbor(result, node, 1, 1)
//     # result.sort(key=lambda k:k.F)
//     return result

//   def __create_neighbor(self, arr, node, offset, axis):
//     axis_val = node.current[axis] + offset
//     max_size = self.map_height if axis == 0 else self.map_width
//     if axis_val >= 0 and axis_val < max_size:
//       y = axis_val if axis == 0 else node.current[0]
//       x = axis_val if axis == 1 else node.current[1]
//       if node.parent == None or (y, x):
//         g = self.__cal_g_index(y, x, node.G)
//         arr.append(Node(g, (y, x), node.target, node))


//   def __calc_path(self, node):
//     result = [node]
//     curr = node.parent
//     while curr:
//       result.append(curr)
//       curr = curr.parent
//     return result

//   def __cal_g_index(self, y, x, g):
//     n = 1
//     if self.map[y][x] == 1: n = g * 1000 + 1000
//     if self.map[y][x] == 4: n = g * 2
//     if self.map[y][x] == 5: n = g * 200
//     return n