import { ScriptDef } from '../../components/example/code/script-def'

const scriptList: ScriptDef[] = [
  { name: 'Hello World', category: 'Examples', module: async (state: any) => (await import('../../modules/examples/code/hello-world')).default(state)  },
  { name: 'Movements', category: 'Examples', module: async (state: any) => (await import('../../modules/examples/code/movements')).default(state)  },
  { name: 'Parallax', category: 'Examples', module: async (state: any) => (await import('../../modules/examples/code/parallax')).default(state)  },
  { name: 'Sketching', category: 'Examples', module: async (state: any) => (await import('../../modules/examples/code/sketching')).default(state)  },

  { name: 'Math Coords', category: 'Surfaces', module: async (state: any) => (await import('../../modules/surfaces/code/math-coords')).default(state)  },
  { name: 'Rectangle', category: 'Surfaces', module: async (state: any) => (await import('../../modules/surfaces/code/rectangle')).default(state)  },
  { name: 'Simple Text', category: 'Surfaces', module: async (state: any) => (await import('../../modules/surfaces/code/simple-text')).default(state)  },
  { name: 'Surface GL', category: 'Surfaces', module: async (state: any) => (await import('../../modules/surfaces/code/surface-gl')).default(state)  },

  { name: 'GL Effect Hello World', category: 'GL Effects', module: async (state: any) => (await import('../../modules/gl-effects/code/hello-world')).default(state)  },
  { name: 'Effect 1', category: 'GL Effects', module: async (state: any) => (await import('../../modules/gl-effects/code/effect1')).default(state)  },
  { name: 'Effect 2', category: 'GL Effects', module: async (state: any) => (await import('../../modules/gl-effects/code/effect2')).default(state)  },
  { name: 'Effect 3', category: 'GL Effects', module: async (state: any) => (await import('../../modules/gl-effects/code/effect3')).default(state)  },
  { name: 'Effect 4', category: 'GL Effects', module: async (state: any) => (await import('../../modules/gl-effects/code/effect4')).default(state)  },
  { name: 'Grid', category: 'GL Effects', module: async (state: any) => (await import('../../modules/gl-effects/code/grid')).default(state)  },
  { name: 'Grid 2', category: 'GL Effects', module: async (state: any) => (await import('../../modules/gl-effects/code/grid2')).default(state)  },

  { name: 'GL Hello World', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/hello-world')).default(state)  },
  { name: 'Framebuffer', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/framebuffer')).default(state)  },
  { name: 'Particle System', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/particle-system')).default(state)  },
  { name: 'Pixel Buffer Object', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/pixel-buffer-object')).default(state)  },
  { name: 'Surface v2', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/surface-v2')).default(state)  },
  { name: 'Texure', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/texure')).default(state)  },
  { name: 'Texure 2', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/texure2')).default(state)  },
  { name: 'Texure 2D Array', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/texure2DArray')).default(state)  },
  { name: 'Tiled Surface', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/tiled-surface')).default(state)  },
  { name: 'Uniform Attribute', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/uniform-attribute')).default(state)  },
  { name: 'Vertex Buffer', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/vertex-buffer')).default(state)  },
  { name: 'Vertex Buffer2', category: 'Raw GL', module: async (state: any) => (await import('../../modules/gl/code/vertex-buffer2')).default(state)  },
]

export { scriptList }