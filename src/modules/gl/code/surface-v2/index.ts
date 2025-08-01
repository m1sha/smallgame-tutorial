import { Color, Game, SurfaceGL, FragmnetShaderSource, Rect, Point, loadImage, gameloop } from 'smallgame'
import { createGLScript } from '../script'
import { displayFps } from '../../../../utils/display-fps'
// import shapes2d from './shapes2d'
import { createCrossSurface } from './helpers'


// const fragmnetShader = /*glsl*/`
//   uniform vec4 uColor;
//   uniform sampler2D uSampler;
//   uniform mat4 uMatrix;
//   in  vec2 v_TexCoord;

 
//   #import * from 'shapes_2d'

//   void mainImage(out vec4 fragColor, in vec2 iResolution) {
//     vec2 p = (2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;
    
//     float d = sdCircle(p, 0.20);
//     float dBox = sdBox(p, vec2(0.15, 0.1));

//     vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    
//     if (d < 0.0)
//       color += 1.0 - smoothstep(0.01, 0.4, uColor);

//     if (dBox < 0.0 && dBox > -0.001350009)
//       color  +=   vec4(1.0, 1.0, 1.9, 1.0);

    

//     // pos *= 0.20;
//   //  pos.x += 16.0 / 352.0;
    
//     fragColor = texture(uSampler, v_TexCoord) ;//+ color;
//   }
// `

createGLScript('SurfaceGL v2', async ({ container, fps }) => {
  const img1 = await loadImage('workflow.png')
  const imgTv = await loadImage('tv.png')
  const tilemap = await loadImage('terrain.png')
  const maskDude = await loadImage('maskDude.png')
  
  const w = 800
  const h = 800

  const surface = new SurfaceGL(w, h)
  // surface.fragmnetShader = new FragmnetShaderSource(fragmnetShader)
  // surface.fragmnetShader.imports.add('shapes_2d', shapes2d)
  surface.imageRendering = 'pixelated'
  surface.create()

  //surface.uniform('uColor', 'vec4').value = Color.from('#667711').toArray()

  const s = 32
  const d = 128
   
  //surface.blit(tilemap, tilemap.rect)
  //surface.blit(imgTv, Rect.size(250, 150).move(0,0, 'center-center'))
  //surface.blit(img1, new Point(0, 0).move(-img1.width / 2, 0))
  
  const { screen } = Game.create(w, h, container)
  
  

  const cross = createCrossSurface(w, h)
 

  let x = 0
  let i = 0

  gameloop(() => {
    screen.fill('#d4d1fcff')
    surface.clear()
    surface.blit(tilemap, tilemap.rect)
    surface.blit(maskDude, new Rect(0, 0, d , d), new Rect(x, 0,  s, s))
    screen.blit(surface, surface.rect)
    screen.blit(cross, cross.rect)
    displayFps(fps)

    i += 0.1
    x = s * (0 | i)
    if (i > 10) i = 0
  })

  


})




