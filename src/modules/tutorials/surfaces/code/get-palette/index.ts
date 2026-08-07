import { Color, loadImage, MemSurface, Rect, Size, Sketch } from "smallgame"
import { Assets, type ScriptSettings, Viewer, displayFps } from "../../../core"
import { Pixel } from "smallgame/src/utils/pixels"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls, messanger }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })

  const img = await loadImage('img/solder-1w.png')
  
  
  const pixels = img.pixels
  const buffer: Pixel[] = []
  

  
  

  pixels.forEach(pixel => {
    if (!buffer.some(p => p.inRadius(pixel, 16))) {
      buffer.push(pixel)
      
    }
  })

  function getColorDistance(c1, c2) {
    return Math.sqrt(
        Math.pow(c1.r - c2.r, 2) + 
        Math.pow(c1.g - c2.g, 2) + 
        Math.pow(c1.b - c2.b, 2)
    );
}

const targetColor = { r: 0, g: 0, b: 0 }

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // ахроматический
    } else {
        const d = max - min;
        s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

  buffer.sort((a, b) => {
    //const lumA = 0.299 * a.r + 0.587 * a.g + 0.114 * a.b;
    //const lumB = 0.299 * b.r + 0.587 * b.g + 0.114 * b.b;
    //return lumA - lumB;
    //return getColorDistance(a, targetColor) - getColorDistance(b, targetColor)

     const hslA = rgbToHsl(a.r, a.g, a.b);
    const hslB = rgbToHsl(b.r, b.g, b.b);
    return hslA.h - hslB.h;
  })

  const pal = new MemSurface(new Size(1256, 20))

  const sk = Sketch.new()
  buffer.forEach((v, i) => {
    const color = new Color(v.r / 255, v.g / 255, v.b / 255)
    sk.rect({ fill: color.toString() }, new Rect(i * 20, 0, 20, 20))
    //console.log(color.toString())
  })
  sk.draw(pal)

  img.rect.center = viewer.viewportRect.center

  let i =0
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      messanger.info('<div style="width:20px;height:20px;background-color: #129911"></div> #129911' + ' ' + (i++))
    }
  }

  viewer.surface.imageRendering = 'pixelated'
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(img, img.rect.scalesize(4))
    frame.blit(pal, pal.rect.move(400, 100))
    displayFps(fps)
  }
}
