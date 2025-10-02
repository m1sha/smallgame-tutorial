import { loadImage, Rect, Sketch, Surface, SurfaceGL, Text } from "smallgame"
import { createScript } from "../script"
import { displayFps } from "../../../../utils/display-fps"

createScript('Simple Text (GL)', async ({ container, width, height, fps }) => {
  const img = await loadImage('beautiful-fall-nature-scenery-picjumbo-com.jpeg')
  
  console.time('Simple Text (GL)')
  
  const surface = new SurfaceGL(width, height)
  surface.create()
  surface.fill(0x0)
  
  const text = new Text('HELLO!', { 
    //fontName: 'Swis721 Blk BT', 
    fontName: 'Firlest', 
    fontSize: '200px', 
    letterSpacing: '8px', 
    color: '#789977',
    outlineColor: 'transparent',
    outlineWidth: 6
  })

  const fgText = text.toSurface(new Rect(6, -35, 450, 220))

  const textCopy = text.clone()
  textCopy.style.color = 'transparent'
  textCopy.style.outlineColor = '#fafdffff'

  const bgText = textCopy.toSurface(new Rect(6, -35, 450, 220))

  const bg = img.zoom(0.2).flip('x')
  fgText.rect.center = bg.rect.center
  
  const result = Surface.mix('destination-in', bg, fgText, fgText.rect).clip(fgText.rect)  
  result.rect.center = bgText.rect.center
  
  // const s = new Sketch()
  // s.rect({ stroke: '#fdf9f9ff' }, text.bounds)
  // const bound = s.toSurface()
  console.time('Simple Text (GL) Render')
  surface.blita(0.35, bg, bg.rect.move(surface.rect.center, 'center-center'))
  surface.blit(bgText, bgText.rect.move(surface.rect.center, 'center-center'))
  surface.blit(result, bgText.rect.move(surface.rect.center, 'center-center'))
  console.timeEnd('Simple Text (GL) Render')
  //surface.blit(bound, bgText.rect.move(surface.rect.center, 'center-center'))
  console.timeEnd('Simple Text (GL)')
  container.append(surface.origin as HTMLCanvasElement)
  displayFps(fps)
})