import { ScriptDef } from '../../components/example/code/script-def'

const scriptList: ScriptDef[] = [
  { name: 'Hello World', category: 'Examples', module: async (state: any) => (await import('./examples/code/hello-world')).default(state)  },
  { name: 'Movements', category: 'Examples', module: async (state: any) => (await import('./examples/code/movements')).default(state)  },
  { name: 'Parallax', category: 'Examples', module: async (state: any) => (await import('./examples/code/parallax')).default(state)  },
  { name: 'Sketching', category: 'Examples', module: async (state: any) => (await import('./examples/code/sketching')).default(state)  },

  { name: 'Blit', category: 'Surfaces', module: async (state: any) => (await import('./surfaces/code/rectangle')).default(state)  },
  { name: 'Math Coords', category: 'Surfaces', module: async (state: any) => (await import('./surfaces/code/math-coords')).default(state)  },
  { name: 'Textured Text', category: 'Surfaces', module: async (state: any) => (await import('./surfaces/code/simple-text')).default(state)  },
  { name: 'Textured Text (GL)', category: 'Surfaces', module: async (state: any) => (await import('./surfaces/code/surface-gl')).default(state)  },

  { name: 'Hello World (GLSL)', category: 'GLSL', module: async (state: any) => (await import('./gl-effects/code/hello-world')).default(state)  },
  { name: 'Abstracion', category: 'GLSL', module: async (state: any) => (await import('./gl-effects/code/effect1')).default(state)  },
  { name: 'Abstracion in Image', category: 'GLSL', module: async (state: any) => (await import('./gl-effects/code/effect2')).default(state)  },
  { name: 'Infinity of Cubes', category: 'GLSL', module: async (state: any) => (await import('./gl-effects/code/effect3')).default(state)  },
  { name: 'Night Forest', category: 'GLSL', module: async (state: any) => (await import('./gl-effects/code/effect4')).default(state)  },
  { name: 'Grid', category: 'GLSL', module: async (state: any) => (await import('./gl-effects/code/grid')).default(state)  },
  { name: 'Grid 2', category: 'GLSL', module: async (state: any) => (await import('./gl-effects/code/grid2')).default(state)  },

  { name: 'Hello World (WebGL)', category: 'WebGL', module: async (state: any) => (await import('./gl/code/hello-world')).default(state)  },
  { name: 'Framebuffer', category: 'WebGL', module: async (state: any) => (await import('./gl/code/framebuffer')).default(state)  },
  { name: 'Particle System', category: 'WebGL', module: async (state: any) => (await import('./gl/code/particle-system')).default(state)  },
  { name: 'Pixel Buffer Object', category: 'WebGL', module: async (state: any) => (await import('./gl/code/pixel-buffer-object')).default(state)  },
  { name: 'Surface v2', category: 'WebGL', module: async (state: any) => (await import('./gl/code/surface-v2')).default(state)  },
  { name: 'Texure', category: 'WebGL', module: async (state: any) => (await import('./gl/code/texure')).default(state)  },
  { name: 'Texure 2', category: 'WebGL', module: async (state: any) => (await import('./gl/code/texure2')).default(state)  },
  { name: 'Texure 2D Array', category: 'WebGL', module: async (state: any) => (await import('./gl/code/texure2DArray')).default(state)  },
  { name: 'Tiled Surface', category: 'WebGL', module: async (state: any) => (await import('./gl/code/tiled-surface')).default(state)  },
  { name: 'Uniform Attribute', category: 'WebGL', module: async (state: any) => (await import('./gl/code/uniform-attribute')).default(state)  },
  { name: 'Vertex Buffer', category: 'WebGL', module: async (state: any) => (await import('./gl/code/vertex-buffer')).default(state)  },
  { name: 'Vertex Buffer2', category: 'WebGL', module: async (state: any) => (await import('./gl/code/vertex-buffer2')).default(state)  },
]

export { scriptList }