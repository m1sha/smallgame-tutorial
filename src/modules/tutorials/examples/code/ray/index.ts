import { Color, Point, Sketch } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../../core"

class Ray {
  point: Point
  constructor (point: Point, public angle: number, public length) {
    this.point = point
  }

  get x () { return this.point.x }
  get y () { return this.point.y }

  get end () {
    return this.point.rotate(this.angle, this.length)
  }
}

export default async ({ container, containerSize, fps, builders, garbageCollect, globalViewport }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, globalViewport })

  const ray = new Ray(viewer.viewportRect.center, 30, 100)
  const ray2 = new Ray(ray.end, 30, 35)
  const ray3 = new Ray(ray2.end, 60, 125)
  const ray4 = new Ray(ray3.end, 90, 40)
  const ray5 = new Ray(ray4.end, 40, 100)
  const ray6 = new Ray(ray5.end, 60, 25)
  const ray7 = new Ray(ray6.end, 90, 50)
  const ray8 = new Ray(ray7.end, -90, 25)

  const colors = ['#aaa', '#37884b', '#1cadb8', '#b8ae1c', '#ca0a43' , '#4245e0', '#a5ca1d', '#9440a5']
  const velocities = [0.1, -1.2, 0.4, -0.2, 0.6, 3.2, 0.4, 4.8]
  const speed = 0.5
  const rays = [ ray, ray2, ray3, ray4, ray5,  ray6, ray7, ray8].slice(0, 8)
  let lineColor ='#ca0a43'
  let oldlineColor = lineColor

  const points: Point[] = []
  const oldpoints: Point[] = []
  let frameCount = 0
  viewer.onFrameChanged = frame => {
    frame.clear()
    const sketch = new Sketch()
    for (let i = 0; i < rays.length; i++) {
      drawRay(sketch, rays[i].point, rays[i].end, colors[i])

      if (i > 0) {
        rays[i].point.moveSelf(rays[i-1].end)
      }

      rays[i].angle += velocities[i] * speed
      rays[i].angle = rays[i].angle % 360
    }
    sketch.circle({ fill: colors.at(-1) }, rays.at(-1).end, 3)

    sketch.polygon({ stroke: oldlineColor }, oldpoints)
    sketch.polygon({ stroke: lineColor }, points)
    sketch.draw(frame)

    if (frameCount % 2 === 0) points.push(rays.at(-1).end)
    const cycle = (360 / (velocities[0] * speed))
    if (frameCount > cycle) {
      while (oldpoints.pop());
      oldpoints.push(...points)
      while (points.pop());
      oldlineColor = lineColor
      lineColor = new Color(Math.random(), Math.random(), Math.random()).toString('rgb')
      frameCount = 0
    }
    frameCount++
   
    displayFps(fps)
  }
  
  const drawRay = (sketch: Sketch, start: Point, end: Point, color: string) => {
    sketch.circle( { fill: color }, start, 8)
    sketch.line({ stroke: color, lineWidth: 4 }, start, end)
  }
}
