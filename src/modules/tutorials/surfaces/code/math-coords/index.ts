import { Color, Coords, loadImage, Point, Rect, Sketch, Surface } from "smallgame"
import { type ScriptModule, type ScriptSettings } from "../../../../../components/example"

export default async ({ container, width, height }: ScriptSettings): Promise<ScriptModule> => {
  const screen = new Surface(width, height)
  screen.fill(0x118845)
  

  const zero = Coords.fromCartesian(Point.zero, screen.rect)

  const xn = new Point(50, 50)
  const xn2 = xn.scale(2)

  const n = Coords.fromCartesian(xn, screen.rect)
  const n2 = Coords.fromCartesian(xn2, screen.rect)

  
  
  const sketch = new Sketch()
  
  //sketch.circle({ fill: '#333' }, zero, 3 )

  //sketch.circle({ fill: '#971f1fff' }, n, 4 )

  sketch.arrow({ lineWidth: 2, stroke: '#530a97ff'}, zero, n, {  end: { arrowAngle: Math.PI / 6, arrowRadius: 10} })
  sketch.arrow({ lineWidth: 2, stroke: '#530a97ff'}, zero, n2, {  end: { arrowAngle: Math.PI / 6, arrowRadius: 10} })

  

  sketch.draw(screen)

  container.append(screen.draw.origin.canvas)

  return {}
}


