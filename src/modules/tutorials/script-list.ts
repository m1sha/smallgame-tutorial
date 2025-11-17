import { ScriptDef } from '../../components/example/code/script-def'

const cat0 = 'Physics'
const cat1 = 'Examples'
const cat2 = 'Surfaces'
const cat3 = 'Raw GLSL'
const cat4 = 'WebGL'


const scriptList: ScriptDef[] = [
  { name: 'Movements', category: cat0, module: async (state: any) => (await import('./examples/code/movements')).default(state)  },
  { name: 'Move & Rotate', category: cat0, module: async (state: any) => (await import('./examples/code/rotate-move')).default(state)  },
  { name: 'Force Bar', category: cat0, module: async (state: any) => (await import('./examples/code/force-bar')).default(state)  },
  { name: 'Flappy', category: cat0, module: async (state: any) => (await import('./examples/code/flappy')).default(state)  },
  { name: 'One Direction Shooter', category: cat0, module: async (state: any) => (await import('./examples/code/one-dir-shooting')).default(state)  },

  { name: 'Hello World', category: cat1, module: async (state: any) => (await import('./examples/code/hello-world')).default(state)  },
  { name: 'Parallax', category: cat1, module: async (state: any) => (await import('./examples/code/parallax')).default(state)  },
  { name: 'Sketching', category: cat1, module: async (state: any) => (await import('./examples/code/sketching')).default(state)  },

  { name: 'Blit', category: cat2, module: async (state: any) => (await import('./surfaces/code/rectangle')).default(state)  },
  { name: 'Math Coords', category: cat2, module: async (state: any) => (await import('./surfaces/code/math-coords')).default(state)  },
  { name: 'Textured Text', category: cat2, module: async (state: any) => (await import('./surfaces/code/simple-text')).default(state)  },
  { name: 'Textured Text (GL)', category: cat2, module: async (state: any) => (await import('./surfaces/code/surface-gl')).default(state)  },
  { name: 'Surface Combiner', category: cat2, module: async (state: any) => (await import('./examples/code/surface-combiner')).default(state)  },

  { name: 'Hello World (GLSL)', category: cat3, module: async (state: any) => (await import('./gl-effects/code/hello-world')).default(state)  },
  { name: 'Abstracion', category: cat3, module: async (state: any) => (await import('./gl-effects/code/effect1')).default(state)  },
  { name: 'Abstracion in Image', category: cat3, module: async (state: any) => (await import('./gl-effects/code/effect2')).default(state)  },
  { name: 'Infinity of Cubes', category: cat3, module: async (state: any) => (await import('./gl-effects/code/effect3')).default(state)  },
  { name: 'Night Forest', category: cat3, module: async (state: any) => (await import('./gl-effects/code/effect4')).default(state)  },
  { name: 'fwidth', category: cat3, module: async (state: any) => (await import('./gl-effects/code/effect5')).default(state)  },
  { name: 'effect 6', category: cat3, module: async (state: any) => (await import('./gl-effects/code/effect6')).default(state)  },
  { name: 'Grid', category: cat3, module: async (state: any) => (await import('./gl-effects/code/grid')).default(state)  },
  { name: 'Grid 2', category: cat3, module: async (state: any) => (await import('./gl-effects/code/grid2')).default(state)  },

  { name: 'Hello World (WebGL)', category: cat4, module: async (state: any) => (await import('./gl/code/hello-world')).default(state)  },
  { name: 'Framebuffer', category: cat4, module: async (state: any) => (await import('./gl/code/framebuffer')).default(state)  },
  { name: 'Particle System', category: cat4, module: async (state: any) => (await import('./gl/code/particle-system')).default(state)  },
  { name: 'Pixel Buffer Object', category: cat4, module: async (state: any) => (await import('./gl/code/pixel-buffer-object')).default(state)  },
  { name: 'Surface v2', category: cat4, module: async (state: any) => (await import('./gl/code/surface-v2')).default(state)  },
  { name: 'Texure', category: cat4, module: async (state: any) => (await import('./gl/code/texure')).default(state)  },
  { name: 'Texure 2', category: cat4, module: async (state: any) => (await import('./gl/code/texure2')).default(state)  },
  { name: 'Texure 2D Array', category: cat4, module: async (state: any) => (await import('./gl/code/texure2DArray')).default(state)  },
  { name: 'Tiled Surface', category: cat4, module: async (state: any) => (await import('./gl/code/tiled-surface')).default(state)  },
  { name: 'Uniform Attribute', category: cat4, module: async (state: any) => (await import('./gl/code/uniform-attribute')).default(state)  },
  { name: 'Vertex Buffer', category: cat4, module: async (state: any) => (await import('./gl/code/vertex-buffer')).default(state)  },
  { name: 'Vertex Buffer2', category: cat4, module: async (state: any) => (await import('./gl/code/vertex-buffer2')).default(state)  },
]

export { scriptList }