import { Viewer } from "../../../shared"
import { displayFps } from "../../../../utils/display-fps"
import { type ScriptModule, type ScriptSettings } from "../../../../components/example"
import { loadImage, MemSurface, Point, Sketch, StdGamepad } from "smallgame"

export default async ({ container, containerSize, fps }: ScriptSettings): Promise<ScriptModule> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true })
  
  const img = await loadImage('Xbox-Controller-PNG.png')
  const surface = new MemSurface(img.rect.size)
  surface.rect.absCenter = img.rect.absCenter = containerSize.half().toPoint()
  
  const sketch = new Sketch()
  sketch.defineStyle('style1', { fill: '#e623006c' })
  sketch.defineStyle('style2', { fill: '#e62300' })
  sketch.defineStyle('style3', { fill: '#777' })
  sketch.defineStyle('style4', { fill: '#8f8f8fe0' })
  sketch.defineStyle('style5', { fill: '#929292af' })
  sketch.defineStyle('style6', { fill: '#cfcfcf' })
  sketch.defineStyle('style7', { fill: '#fff' })
  sketch.defineStyle('style8', { fill: '#cfcfcfd2' })
  const circle = (s: string, x: number, y: number, r: number) => sketch.circle(s, new Point(x, y), r)

  const gpad = new StdGamepad()
  const onGamepadActions = () => {
    surface.clear()
    sketch.clear()

    if (gpad.connected) {
      circle('style1', 181, 64, 8)
      circle('style2', 181, 64, 3)
    }
    if (gpad.buttonLB) circle('style3', 87, 59, 10)
    if (gpad.buttonRB) circle('style3', 378, 59, 10)
    if (gpad.buttonLT) circle('style4', 100, 13, gpad.buttonLT * 8)
    if (gpad.buttonRT) circle('style4', 360, 13, gpad.buttonRT * 8)
    if (gpad.buttonBack) circle('style3', 180, 146, 10)
    if (gpad.buttonStart) circle('style3', 283, 146, 10)
    if (gpad.buttonA) circle('style5', 370, 172, 15)
    if (gpad.buttonB) circle('style5', 409, 138, 15)
    if (gpad.buttonX) circle('style5', 333, 143, 15)
    if (gpad.buttonY) circle('style5', 373, 110, 15)
    if (gpad.dpadLeft) circle('style6', 133, 218, 5)
    if (gpad.dpadRight) circle('style6', 182, 218, 5)
    if (gpad.dpadUp) circle('style6', 160, 198, 5)
    if (gpad.dpadDown) circle('style6', 160, 233, 5)
    if (gpad.buttonLS) circle('style7', 90, 166, 5)
    if (gpad.buttonRS) circle('style7', 295, 230, 5)
    
    circle('style8', 90 + gpad.leftStick.x * 20, 166 + gpad.leftStick.y * 20, 3)
    circle('style8', 295 + gpad.rightStick.x * 20, 230 + gpad.rightStick.y * 20, 3)

    sketch.draw(surface)
  }

  viewer.onFrameChanged = frame => {
    onGamepadActions()
    frame.clear()
    frame.blit(img, img.rect)
    frame.blit(surface, surface.rect)
    displayFps(fps)
  }

  return {
    dispose: () => viewer.remove()
  }
}
