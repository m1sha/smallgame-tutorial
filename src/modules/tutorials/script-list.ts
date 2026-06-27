import { ScriptDef } from '../../components/example/code/script-def'

const cat0 = 'Physics'
const cat1 = 'Examples'
const cat2 = 'Surfaces'
const cat3 = 'Raw GLSL'
const cat4 = 'WebGL'
const cat5 = 'AI'
const cat6 = 'Orientation'
const isometricCat = 'Isometric'
const player = 'Player'
const platformer = 'Platformer'


const scriptList: ScriptDef[] = [
  { name: 'Viewer Navigations', category: cat6, codeDir: 'orientation/viewer-navigations', module: async (state: any) => (await import('./orientation/viewer-navigations')).default(state)  },
  { name: 'Rect Move + Pivote', category: cat6, codeDir: 'orientation/rect-shift-pivote', module: async (state: any) => (await import('./orientation/rect-shift-pivote')).default(state)  },
  { name: 'Rect Scale + Pivote', category: cat6, codeDir: 'orientation/rect-scale-pivote', module: async (state: any) => (await import('./orientation/rect-scale-pivote')).default(state)  },
  { name: 'Rect Scale to Cursor', category: cat6, codeDir: 'orientation/rect-scale-to-cursor', module: async (state: any) => (await import('./orientation/rect-scale-to-cursor')).default(state)  },
  { name: 'Movement To Cursor', category: cat6, codeDir: 'orientation/movement-to-cursor', module: async (state: any) => (await import('./orientation/movement-to-cursor')).default(state)  },
  { name: 'Zoom Pan', category: cat6, codeDir: 'orientation/zoom-pan', module: async (state: any) => (await import('./orientation/zoom-pan')).default(state)  },
  { name: 'Camera 2D', category: cat6, codeDir: 'orientation/camera', module: async (state: any) => (await import('./orientation/camera')).default(state)  },
  { name: 'Camera 2D Control', category: cat6, codeDir: 'orientation/camera-control', module: async (state: any) => (await import('./orientation/camera-control')).default(state)  },
  { name: 'Objects In Space', category: cat6, codeDir: 'orientation/objects', module: async (state: any) => (await import('./orientation/objects')).default(state)  },
  { name: 'Scaling', category: cat6, codeDir: 'orientation/scaling', module: async (state: any) => (await import('./orientation/scaling')).default(state)  },
  { name: 'Zoom To Cursor (Image)', category: cat6, codeDir: 'orientation/scaling', module: async (state: any) => (await import('./orientation/zoom-to-cursor-image')).default(state)  },

  { name: 'Linear Movement', category: cat0, codeDir: 'examples/code/linear-movement', module: async (state: any) => (await import('./examples/code/linear-movement')).default(state)  },
  { name: 'Movements', category: cat0, codeDir: 'examples/code/movements', module: async (state: any) => (await import('./examples/code/movements')).default(state)  },
  { name: 'Move & Rotate', category: cat0, codeDir: 'examples/code/rotate-move', module: async (state: any) => (await import('./examples/code/rotate-move')).default(state)  },
  { name: 'Rotation', category: cat0, codeDir: 'examples/code/rotation', module: async (state: any) => (await import('./examples/code/rotation')).default(state)  },
  { name: 'Force Bar', category: cat0, codeDir: 'examples/code/force-bar', module: async (state: any) => (await import('./examples/code/force-bar')).default(state)  },
  { name: 'Flappy', category: cat0, codeDir: 'examples/code/flappy', module: async (state: any) => (await import('./examples/code/flappy')).default(state)  },
  { name: 'One Direction Shooter', category: cat0, codeDir: 'examples/code/one-dir-shooting', module: async (state: any) => (await import('./examples/code/one-dir-shooting')).default(state)  },
  { name: 'Collision', category: cat0, codeDir: 'examples/code/collision', module: async (state: any) => (await import('./examples/code/collision')).default(state)  },
  
  { name: 'A* Alogorithm', category: cat5, codeDir: 'ai/astar-alg', module: async (state: any) => (await import('./ai/astar-alg')).default(state)  },
  { name: 'Concentration Places', category: cat5, codeDir: 'ai/concentration-places', module: async (state: any) => (await import('./ai/concentration-places')).default(state)  },
  { name: 'Persecution By Emeny', category: cat5, subCategory: platformer, codeDir: 'ai/concentration-places', module: async (state: any) => (await import('./ai/persecution-by-enemy')).default(state)  },

  { name: 'Movement', category: player, subCategory: platformer, codeDir: 'player/platformer-movement', module: async (state: any) => (await import('./player/platformer-movement')).default(state)  },
  { name: 'Platformers', category: player, subCategory: platformer, codeDir: 'player/platformers', module: async (state: any) => (await import('./player/platformers')).default(state)  },
  { name: 'Gamepad', category: player, subCategory: platformer, codeDir: 'player/gamepad', module: async (state: any) => (await import('./player/gamepad')).default(state)  },
  

  { name: 'Hello World', category: cat1, codeDir: 'examples/code/hello-world', module: async (state: any) => (await import('./examples/code/hello-world')).default(state)  },
  { name: 'Car Movement', category: cat1, codeDir: 'examples/code/car-movement', module: async (state: any) => (await import('./examples/code/car-movement')).default(state)  },
  { name: 'Parallax', category: cat1, codeDir: 'examples/code/parallax', module: async (state: any) => (await import('./examples/code/parallax')).default(state)  },
  { name: 'Sketching', category: cat1, codeDir: 'examples/code/sketching', module: async (state: any) => (await import('./examples/code/sketching')).default(state)  },
  { name: 'Paint', category: cat1, codeDir: 'examples/code/paint', module: async (state: any) => (await import('./examples/code/paint')).default(state)  },
  { name: 'Bezier Lines', category: cat1, codeDir: 'examples/code/bezier-lines', module: async (state: any) => (await import('./examples/code/bezier-lines')).default(state)  },
  { name: 'Bezier Interpolation', category: cat1, codeDir: 'examples/code/bezier-interpolation', module: async (state: any) => (await import('./examples/code/bezier-interpolation')).default(state)  },
  { name: 'Path Interpolation', category: cat1, codeDir: 'examples/code/path-interpolation', module: async (state: any) => (await import('./examples/code/path-interpolation')).default(state)  },
  { name: 'Numeric Table', category: cat1, codeDir: 'examples/code/table', module: async (state: any) => (await import('./examples/code/table')).default(state)  },
  { name: 'Vector Editor', category: cat1, codeDir: 'examples/code/vector-editor-test', module: async (state: any) => (await import('./examples/code/vector-editor-test')).default(state)  },
  

  { name: 'Blit', category: cat2, codeDir: 'surfaces/code/rectangle', module: async (state: any) => (await import('./surfaces/code/rectangle')).default(state)  },
  { name: 'Blit Distribute Rect', category: cat2, codeDir: 'surfaces/code/dist-rect', module: async (state: any) => (await import('./surfaces/code/dist-rect')).default(state)  },
  { name: 'Math Coords', category: cat2, codeDir: 'surfaces/code/math-coords', module: async (state: any) => (await import('./surfaces/code/math-coords')).default(state)  },
  { name: 'Textured Text', category: cat2, codeDir: 'surfaces/code/simple-text', module: async (state: any) => (await import('./surfaces/code/simple-text')).default(state)  },
  { name: 'Textured Text (GL)', category: cat2, codeDir: 'surfaces/code/surface-gl', module: async (state: any) => (await import('./surfaces/code/surface-gl')).default(state)  },
  { name: 'Surface Combiner', category: cat2, codeDir: 'examples/code/surface-combiner', module: async (state: any) => (await import('./examples/code/surface-combiner')).default(state)  },
  { name: 'Sprite Sheet', category: cat2, codeDir: 'surfaces/code/sprite-sheet', module: async (state: any) => (await import('./surfaces/code/sprite-sheet')).default(state)  },
  { name: 'Sprite Sheet Editor', category: cat2, codeDir: 'surfaces/code/sprite-sheet-editor', module: async (state: any) => (await import('./surfaces/code/sprite-sheet-editor')).default(state)  },
  { name: 'Pixel Mask', category: cat2, codeDir: 'surfaces/code/pixel-mask', module: async (state: any) => (await import('./surfaces/code/pixel-mask')).default(state)  },
  { name: 'Pixel Collision', category: cat2, codeDir: 'surfaces/code/pixel-collision', module: async (state: any) => (await import('./surfaces/code/pixel-collision')).default(state)  },
  { name: 'Mask', category: cat2, codeDir: 'surfaces/code/mask', module: async (state: any) => (await import('./surfaces/code/mask')).default(state)  },
  { name: 'Combine Sufaces', category: cat2, codeDir: 'surfaces/code/combine-sufaces', module: async (state: any) => (await import('./surfaces/code/combine-sufaces')).default(state)  },

  { name: 'Isometric Projection', category: isometricCat, codeDir: 'isometric/iso-projection', module: async (state: any) => (await import('./isometric/iso-projection')).default(state)  },

  { name: 'Hello World (GLSL)', category: cat3, codeDir: 'gl-effects/code/hello-world', module: async (state: any) => (await import('./gl-effects/code/hello-world')).default(state)  },
  { name: 'Abstracion', category: cat3, codeDir: 'gl-effects/code/effect1', module: async (state: any) => (await import('./gl-effects/code/effect1')).default(state)  },
  { name: 'Abstracion in Image', category: cat3, codeDir: 'gl-effects/code/effect2', module: async (state: any) => (await import('./gl-effects/code/effect2')).default(state)  },
  { name: 'Infinity of Cubes', category: cat3, codeDir: 'gl-effects/code/effect3', module: async (state: any) => (await import('./gl-effects/code/effect3')).default(state)  },
  { name: 'Night Forest', category: cat3, codeDir: 'gl-effects/code/effect4', module: async (state: any) => (await import('./gl-effects/code/effect4')).default(state)  },
  { name: 'fwidth', category: cat3, codeDir: 'gl-effects/code/effect5', module: async (state: any) => (await import('./gl-effects/code/effect5')).default(state)  },
  { name: 'effect 6', category: cat3, codeDir: 'gl-effects/code/effect6', module: async (state: any) => (await import('./gl-effects/code/effect6')).default(state)  },
  { name: 'Grid', category: cat3, codeDir: 'gl-effects/code/grid', module: async (state: any) => (await import('./gl-effects/code/grid')).default(state)  },
  { name: 'Grid 2', category: cat3, codeDir: 'gl-effects/code/grid2', module: async (state: any) => (await import('./gl-effects/code/grid2')).default(state)  },
  { name: 'Coords Understanding', category: cat3, codeDir: 'gl-effects/code/coords-understanding', module: async (state: any) => (await import('./gl-effects/code/coords-understanding')).default(state)  },
  { name: 'Chess', category: cat3, codeDir: 'gl-effects/code/chess', module: async (state: any) => (await import('./gl-effects/code/chess')).default(state)  },

  { name: 'Hello World (WebGL)', category: cat4, codeDir: 'gl/code/hello-world', module: async (state: any) => (await import('./gl/code/hello-world')).default(state)  },
  { name: 'Vertex Array Object (Points)', category: cat4, codeDir: 'gl/code/vao-points', module: async (state: any) => (await import('./gl/code/vao-points')).default(state)  },
  { name: 'Vertex Array Object (Rects)', category: cat4, codeDir: 'gl/code/vao-rects', module: async (state: any) => (await import('./gl/code/vao-rects')).default(state)  },
  { name: 'Tiles (Rects)', category: cat4, codeDir: 'gl/code/tiles-rects', module: async (state: any) => (await import('./gl/code/tiles-rects')).default(state)  },
  { name: 'GL Screen Coords', category: cat4, codeDir: 'gl/code/gl-screen-coords', module: async (state: any) => (await import('./gl/code/gl-screen-coords')).default(state)  },
  { name: 'UI Screen Coords', category: cat4, codeDir: 'gl/code/ui-screen-coords', module: async (state: any) => (await import('./gl/code/ui-screen-coords')).default(state)  },
  { name: 'Framebuffer', category: cat4, codeDir: 'gl/code/framebuffer', module: async (state: any) => (await import('./gl/code/framebuffer')).default(state)  },
  { name: 'Particle System', category: cat4, codeDir: 'gl/code/particle-system', module: async (state: any) => (await import('./gl/code/particle-system')).default(state)  },
  { name: 'Pixel Buffer Object', category: cat4, codeDir: 'gl/code/pixel-buffer-object', module: async (state: any) => (await import('./gl/code/pixel-buffer-object')).default(state)  },
  { name: 'Surface v2', category: cat4, codeDir: 'gl/code/surface-v2', module: async (state: any) => (await import('./gl/code/surface-v2')).default(state)  },
  { name: 'Texure', category: cat4, codeDir: 'gl/code/texure', module: async (state: any) => (await import('./gl/code/texure')).default(state)  },
  { name: 'Texure 2', category: cat4, codeDir: 'gl/code/texure2', module: async (state: any) => (await import('./gl/code/texure2')).default(state)  },
  { name: 'Texure 2D Array', category: cat4, codeDir: 'gl/code/texure2DArray', module: async (state: any) => (await import('./gl/code/texure2DArray')).default(state)  },
  { name: 'Tiled Surface', category: cat4, codeDir: 'gl/code/tiled-surface', module: async (state: any) => (await import('./gl/code/tiled-surface')).default(state)  },
  { name: 'Uniform Attribute', category: cat4, codeDir: 'gl/code/uniform-attribute', module: async (state: any) => (await import('./gl/code/uniform-attribute')).default(state)  },
  { name: 'Vertex Buffer', category: cat4, codeDir: 'gl/code/vertex-buffer', module: async (state: any) => (await import('./gl/code/vertex-buffer')).default(state)  },
  { name: 'Vertex Buffer2', category: cat4, codeDir: 'gl/code/vertex-buffer2', module: async (state: any) => (await import('./gl/code/vertex-buffer2')).default(state)  },
  { name: 'Array Instanced', category: cat4, codeDir: 'gl/code/array-instanced', module: async (state: any) => (await import('./gl/code/array-instanced')).default(state)  },
  { name: 'Array Instanced Animation', category: cat4, codeDir: 'gl/code/array-instanced-animation', module: async (state: any) => (await import('./gl/code/array-instanced-animation')).default(state)  },
  { name: 'Array Instanced Tiles', category: cat4, codeDir: 'gl/code/array-instanced-tiles', module: async (state: any) => (await import('./gl/code/array-instanced-tiles')).default(state)  },
  { name: 'Parallax (GL)', category: cat4, codeDir: 'gl/code/parallax-gl', module: async (state: any) => (await import('./gl/code/parallax-gl')).default(state)  },
]

export { scriptList }