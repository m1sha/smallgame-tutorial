import { Sketch, Rect, Sprite, Surface, Time } from "smallgame"
import { AStar, MapSource, Node } from "../astar"


export class Path extends Sprite {
  private aStar: AStar

  private path: Node[] = []

  private started = false
  
  constructor (private map: MapSource) {
    super()

    this.image = new Surface(map.width, map.height)
    this.rect = this.image.rect

    this.aStar = new AStar(map)
    this.aStar.setStart(map.find_ij(2))
    this.aStar.setGoal(map.find_ij(3))
    
    if (!this.constPath) {
      this.path = this.aStar.getPath()
    }
  }

  updatePath () {
    this.aStar.setStart(this.map.find_ij(2))
    this.aStar.setGoal(this.map.find_ij(3))
    
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
        if (!this.aStar.is_path_found && v) this.aStar.nextIteration()
      }

      if (this.aStar.is_path_found) {
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
   
    const img = sk.toSurface(this.map.width, this.map.height)
    this.image.clear()
    this.image.blit(img, img.rect)
  }
}