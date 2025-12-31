import { PolyRect, Rect, setPoint, Sketch, Surface } from "smallgame"
import { displayFps } from "../../../../../utils/display-fps"
import { createSelect, type ScriptSettings, type ScriptModule, createColor, createButton, ButtonParameter, createTracker } from "../../../../../components/example"
import { Viewer } from "../../../../shared"

const funcName = 'Rectangle'
let func = rect
let strokeColor = '#d81414ff'
let fillColor = '#052441ff'
//let bgColor = '#0d6d48ff'
let strokeWidth = 1


export default async ({ container, width, height, fps }: ScriptSettings): Promise<ScriptModule> => {
  displayFps(fps)
  
  const viewer = new Viewer({ width, height }, container)
  
  func(viewer.surface)

  const shapeParam = createSelect('Shape', ['Rectangle', 'Polyrectangle', 'Polygon', 'Dots', 'Circle', 'Arrows' ], value => {
    if (value == 'Polyrectangle') func = polyRect
    if (value == 'Polygon') func =polygon
    if (value == 'Circle') func = circle
    if (value == 'Dots') func = dots
    if (value == 'Arrows') func = arrows
    if (value == 'Rectangle') func = rect

    func(viewer.surface)
  }, funcName)

  // const bgParam = createColor('BG Color', color => { 
  //   bgColor = color 
  //   func(viewer.surface)
  // }, bgColor)

  const strokeParam = createColor('Stroke Color', color => { 
    strokeColor = color 
    func(viewer.surface)
  }, strokeColor)

  const fillParam = createColor('Fill Color', color => { 
    fillColor = color
    func(viewer.surface)
  }, fillColor)

  const sizeParam = createTracker('Stroke Size', 1, 50, 1, v => { strokeWidth = v; func(viewer.surface) }, 1)
  // const size2Param = createTracker('Size', 0, 100, 10, v => {}, 50)


  // const butParam = createButton('ccc', s => {
  //  s.caption = 'aaa'
  // })

  return {
    parameters: [shapeParam, /*bgParam, */ strokeParam, fillParam, sizeParam],
    dispose () {
      viewer.remove()
    }
  }
}


function polyRect (screen: Surface) {
  const rect = new Rect(80, 80, 80, 80)
  const sketch0 = new Sketch()
  const rect0 = new PolyRect(rect.x, rect.y, rect.width, rect.height)
  sketch0.polyrect({ stroke: 'black' }, rect0)
  const surf0 = sketch0.toSurface(200, 200)

  const sketch = new Sketch()
  const rect1 = new PolyRect(rect.x, rect.y, rect.width, rect.height)
  
  rect1.rotateSelf(30, 'center-center')
  sketch.polyrect({ stroke: strokeColor, fill: fillColor, lineWidth: strokeWidth }, rect1)
  const surf = sketch.toSurface(200, 200)

  screen.clear()
  screen.blit(surf0, surf0.rect.move(screen.rect.center, 'center-center'))
  screen.blit(surf, surf.rect.move(screen.rect.center, 'center-center'))
}

function polygon (screen: Surface) {
  const sketch = new Sketch()
  sketch.polygon({ stroke: strokeColor, lineWidth: strokeWidth }, [ setPoint(30, 40), setPoint(130, 40), setPoint(10, 40), setPoint(30, 40) ])
  drawSketch(sketch, screen, 400, 400)
}

function dots (screen: Surface) {
  const sketch = new Sketch()
  sketch.dots({ stroke: strokeColor, fill: fillColor, lineWidth: strokeWidth }, [ setPoint(10, 10), setPoint(150, 10), setPoint(150, 80), setPoint(70, 120) ], 10)
  drawSketch(sketch, screen, 400, 400)
}


function circle (screen: Surface) {
  const sketch = new Sketch()
  sketch.circle({ stroke: strokeColor, fill: fillColor, lineWidth: strokeWidth  }, setPoint(50, 50), 40)
  drawSketch(sketch, screen)
}

function arrows (screen: Surface) {
  const sketch = new Sketch()
  sketch.arrows({ stroke: strokeColor, fill: fillColor, lineWidth: strokeWidth }, [
    { p0: setPoint(10, 10), p1:setPoint(150, 10) },
    { p0: setPoint(150, 10), p1:setPoint(150, 120) },
    { p0: setPoint(150, 120), p1:setPoint(10, 120) },
    { p0: setPoint(10, 120), p1:setPoint(10, 10) },
  ])
  drawSketch(sketch, screen, 200, 200)
}

function rect (screen: Surface) {
  const sketch = new Sketch()
  sketch.rect({ stroke: strokeColor, fill: fillColor, lineWidth: strokeWidth  }, new Rect(0, 0, 200, 200))
  drawSketch(sketch, screen)
}

  
function drawSketch (sketch: Sketch, screen: Surface, width?: number, height?: number) {
  screen.clear()
  const surf = sketch.toSurface(width, height)
  screen.blit(surf, surf.rect.move(screen.rect.center, 'center-center'))
}