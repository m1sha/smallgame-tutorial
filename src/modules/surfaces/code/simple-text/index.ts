import { loadImage, Rect, Sketch, Surface, Text } from "smallgame"
import { createScript } from "../script"
import { displayFps } from "../../../../utils/display-fps"

createScript('Simple Text', async ({ container, width, height, fps }) => {
  const img = await loadImage('beautiful-fall-nature-scenery-picjumbo-com.jpeg')
  
  console.time('Simple Text')
  
  const surface = new Surface(width, height)
  surface.fill('#2b2b2bff')
  
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
  
  console.time('Simple Text Render')
  surface.blita(0.35, bg, bg.rect.move(surface.rect.center, 'center-center'))
  surface.blit(bgText, bgText.rect.move(surface.rect.center, 'center-center'))
  surface.blit(result, bgText.rect.move(surface.rect.center, 'center-center'))
  console.timeEnd('Simple Text Render')
  //surface.blit(bound, bgText.rect.move(surface.rect.center, 'center-center'))
  console.timeEnd('Simple Text')

  container.append(surface.origin as HTMLCanvasElement)
  displayFps(fps)
})