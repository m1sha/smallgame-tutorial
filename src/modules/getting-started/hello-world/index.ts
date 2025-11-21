import { Game, gameloop, GMath, Point, Sketch, Surface, Text, Time } from "smallgame"
import { easeInOutQuad } from "../../tutorials/examples/code/movements/func"

export function main (root: HTMLDivElement) {
  const h = root.clientHeight
  const w = root.clientWidth
  const { screen } = Game.create(w, h, root)
  const surface = new Text('SmallGame', { fontSize: '10vh', color: '#424242ff' }).toSurface()
  surface.rect.center = screen.rect.center
  surface.rect.x = 0
  const max = screen.size.width - surface.width

  const img = new Surface(w, h)
  const sk1 = new Sketch().circle({ fill: '#888'}, new Point(screen.size.width / 2, 0), 60)
  const sk12 = new Sketch()

  const bgRect = surface.rect
  const textBg = new Sketch().circle({ fill: '#888 '}, bgRect.center, bgRect.width / 2).toSurface()

  let t = 0
  let flip = false
  const speed = 0.42
  gameloop(() => {
    screen.fill('#313131ff')

    img.clear()
    sk12.clear()
    sk12.line({ stroke: '#888', lineWidth: 8 }, new Point(screen.size.width / 2, 0), surface.rect.topLeft.shift(surface.width / 2, 4))
    
    sk1.draw(img)
    sk12.draw(img)
    screen.blit(img, img.rect)
    
    textBg.rect.x = surface.rect.x 
    textBg.rect.y = surface.rect.y 
    screen.blit(textBg, textBg.rect)
    screen.blit(surface, surface.rect)
    //

    if (flip) {
      if (t < 1) {
        t += Time.deltaTime * speed
      } else flip = false
    } else {
      if (t > 0) {
        t -= Time.deltaTime * speed
      } else flip = true
    }
    

    surface.rect.x = GMath.lerp(0, max, easeInOutQuad(t))
  })
}
