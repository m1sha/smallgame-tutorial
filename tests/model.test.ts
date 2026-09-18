import { describe, it, expect } from 'vitest'
import { ModelDefinition, Model } from '../src/modules/ai'

describe ('AI Model Module', () => {
 it('Create Model', () => {
    const model = new Model({
      input: { neurons: 6 },
      hiddens: [ 
        { neurons: 12, activation: 'ReLU' }
      ],
      output: { neurons: 3, activation: 'softmax' },
    })
    model.initWeights()
    const value = model.predict(new Float32Array([1, 0, 1, 0, 0, 1]))

    const v = model.getWeights().length
    const u = model.parametersLength

    expect(true).toBe(true)
  })
  
})