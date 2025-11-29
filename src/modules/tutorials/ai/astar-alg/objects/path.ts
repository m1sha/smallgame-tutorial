import { Sketch, Rect, Sprite, Surface, Time } from "smallgame"
import { AStar, Node } from "../astar"
import { MapObject } from "./map-object"
import { euclideanHeuristic, manhattanHeuristic } from "../astar/heuristic"


export class Path extends Sprite {
  private aStar: AStar
  private pathImg: Surface
  private path: Node[] = []

  private started = false
  
  constructor (private map: MapObject) {
    super()

    this.image = new Surface(map.width, map.height, { useOffscreen: true })
    this.pathImg = new Surface(map.width, map.height, { useOffscreen: true })
    this.rect = this.image.rect

    this.aStar = new AStar(map.source, (y, x, g) => this.__cal_g_index(y, x, g))
    this.aStar.setStart(map.source.find_ij(2))
    this.aStar.setGoal(map.source.find_ij(3))
    
    if (!this.constPath) {
      this.path = this.aStar.getPath()
    }
  }

  private __cal_g_index (y: any, x: any, g: any) {
    let n = 1
    if (this.map.source.get(y, x) == 1) n = g * 1000 + 1000
    if (this.map.source.get(y, x) == 4) n = g * 2
    if (this.map.source.get(y, x) == 5) n = g * 200
    return n
  }

  updatePath () {
    this.aStar.setStart(this.map.source.find_ij(2))
    this.aStar.setGoal(this.map.source.find_ij(3))
    
    if (!this.constPath) {
      this.path = this.aStar.getPath()
    }
    

    this.started = false
    this.i = 0
  }
  
  constPath = false
  private i = 0

  update () {
    const { dx, dy} = this.map

    if (this.constPath) {
      if (!this.started) {
        this.aStar.startConstructPath()
        this.started = true
      } else {
        this.i += Time.deltaTime * 10
        const v =  (0 | this.i) % 2 === 0
        if (!this.aStar.isPathFound && v) this.aStar.nextIteration()
      }

      if (this.aStar.isPathFound) {
        this.path = this.aStar.path
      }
    }

   
    
    const sk = new Sketch()
    let j = -1
    for (const i of this.path) {
      j += 1
      if (j == 0) continue
      if (j >= this.path.length - 1) break
      
      sk.rect({ fill: '#62eba0d3'}, new Rect(dx * i.current[1], dy * i.current[0], dx, dy))
    }

    if (this.constPath) {
      for (const i of this.aStar.waiting) {
        sk.rect({ fill: '#a56c173f'}, new Rect(dx * i.current[1], dy * i.current[0], dx, dy))
      }

      for (const i of this.aStar.checked) {
        sk.rect({ fill: '#76a51e5e'}, new Rect(dx * i.current[1], dy * i.current[0], dx, dy))
      }
    }
   
    //const img = sk.toSurface(this.map.width, this.map.height)
    this.pathImg.clear()
    this.image.clear()
    sk.draw(this.pathImg)
    this.image.blit(this.pathImg, this.pathImg.rect)
    
  }

  setHeuristicType (val: 'Manhattan' | 'Euclidean') {
    this.aStar.heuristic = val === 'Manhattan' ? manhattanHeuristic : euclideanHeuristic
  }
}