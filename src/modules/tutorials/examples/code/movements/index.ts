import { displayFps } from "../../../../../utils/display-fps"
import { Game, gameloop, Group, killgameloop, Point, Rect, setSize, Sketch, Sprite, Surface, Time, TPoint, TSize } from "smallgame"
import { lerp, easeOutBounce, funcMap } from "./func"
import { createSelect, type ScriptSettings, type ScriptModule, createButton } from "../../../../../components/example"

import { Ball, Markers, Path } from './objects'

export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  //const screen = new Surface(width, height)
  //container.append(screen.origin as any)
  const { screen, game } = Game.create( width, height, container)
  

  let t  = 0
  let speed = 0.2
  let func = easeOutBounce
  const { topLeft, bottomRight} = screen.rect.outline(300)
  const startPoint = topLeft
  const endPoint = bottomRight

  const ball = new Ball()
  
  const path = new Path(startPoint, endPoint, screen.rect)
  const markers = new Markers(startPoint, endPoint)

  gameloop(() => {
    for (const event of game.event.get()) {
      if (event.type === 'MOUSEDOWN') {
        markers.setActive(event.pos)
      }

      if (event.type === 'MOUSEMOVE') {
        markers.hittest(event.pos)
        if (event.button === 1) {
          markers.shiftActive(event.shift)
        }
      }

      if (event.type === 'MOUSEUP') {
        markers.releaseActive()
      }
    }

    screen.fill('#38393dff')
    //screen.clear()
    
    path.draw(screen as any)
    markers.draw(screen as any)
    if (!markers.hasActive)
      ball.draw(screen as any)

    if (t < 1) t +=  Time.deltaTime * speed

    ball.setPath(startPoint, endPoint, func(t))
    path.setPath(startPoint, endPoint)
    displayFps(fps)
  })

  
  const curveTypeParam = createSelect(
    'Curve Type', 
    [...funcMap.keys()], 
    name => {
      t = 0
      func = funcMap.get(name)!
    }, 
    'easeOutBounce'
  )

  const speedParam = createSelect('Speed', ['Slow', 'Noraml', 'Fast'], v => {
    if (v === 'Slow') speed = 0.05
    if (v === 'Noraml') speed = 0.2
    if (v === 'Fast') speed = 0.5
  }, 'Noraml')

  const resetButtonParam = createButton('Reset', () => t = 0)

  return {
    parameters: [
      curveTypeParam,
      speedParam,
      resetButtonParam
    ],
    dispose () {
      killgameloop()
    }
  }
}




// class Ball extends Sprite {
//   constructor () {
//     super()

//     const circleSketch = new Sketch()
//     const rect = Rect.size(100, 100)
//     circleSketch.circle({ fill: '#2f553cff' }, rect.center, rect.width * 0.5)
//     const surface = circleSketch.toSurface()
//     this.image = surface
//     this.rect = surface.rect
//   }

//   setPath (startPoint: Point, endPoint: Point, value: number) {
//     this.rect.moveSelf(lerp(startPoint, endPoint, value), 'center-center')  
//   }
// }

// class Path extends Sprite {
//   constructor (private startPoint: Point, private endPoint: Point, private size: TSize) {
//     super()

//     this.image = this.createPathLine(startPoint, endPoint)
//     this.rect = this.image.rect
//   }

//   setPath (startPoint: Point, endPoint: Point) {
//     if (!this.startPoint.equals(startPoint) || !this.endPoint.equals(endPoint)) {
//       this.image = this.createPathLine(startPoint, endPoint)
//       this.rect = this.image.rect
//     }

//     this.startPoint = startPoint
//     this.endPoint = endPoint
//   }

//   private createPathLine (startPoint: Point, endPoint: Point) {
//     const lineSketch = new Sketch()
//     lineSketch.line({ stroke: '#6e6e6eff', lineWidth: 4, lineDash: [3, 5] }, startPoint, endPoint)
//     const surface2 = lineSketch.toSurface(this.size.width, this.size.height)
//     return surface2
//   }
// }

// class Marker extends Sprite {
//   private normalImg: Surface
//   private hoverImg: Surface
//   size = setSize(20, 20)
//   hovered = false
//   constructor (private point: Point) {
//     super()

//     this.rect = Rect.fromCenter(point, this.size.width, this.size.height)
    
//     this.normalImg = new Sketch()
//       .circle({ fill: '#4a4a86ff' }, this.rect.center, this.rect.width / 2)
//       .toSurface()
//     this.hoverImg = new Sketch()
//       .circle({ fill: '#787899' }, this.rect.center, this.rect.width / 2)
//       .toSurface()

//     this.image = this.normalImg
//   }

//   protected update(): void {
//     this.image = this.hovered ? this.hoverImg: this.normalImg
//   }

//   hover () {
//     this.hovered = true
//   }

//   shift (point: TPoint) {
//     //this.rect.shiftSelf(point, 'center-center')
//     this.point.shiftSelf(point)
//   }
// }

// class Markers extends Group<Marker> {
//   private active: Marker | null = null
//   constructor (startPoint: Point, endPoint: Point) {
//     super()

//     this.add(new Marker(startPoint))
//     this.add(new Marker(endPoint))
//   }

//   hittest (pos: TPoint) {
//     this.unhover()
//     this.collidePoint(pos, mkr => {
//       mkr.hover()
//     }, { once: true })
//   }

//   shiftActive (pos: TPoint) {
//     if (this.active) this.active.shift(pos)
//   }

//   setActive (pos: TPoint) {
//     this.active = null
//     this.collidePoint(pos, mkr => {
//       this.active = mkr
//     }, { once: true })
//   }

//   releaseActive () {
//     this.active = null
//   }

//   private unhover () {
//     this.sprites.forEach(p => p.hovered = false)
//   }
// }

