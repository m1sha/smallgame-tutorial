import { describe, it, expect } from 'vitest'
import { ModelDefinition, Model } from '../src/modules/ai'

describe ('AI Model Module', () => {
 it('Same Weights after getWeights and setWeights', () => {
    const model = modelFactory()
    model.initWeights()
    const weights = model.getWeights()
    const anotherModel = modelFactory()
    anotherModel.setWeights(weights)
    const anotherWeights = anotherModel.getWeights()

    expect(weights.length).toBe(anotherWeights.length)
    for (let i = 0; i < weights.length; i++) {
      expect(weights[i]).toBe(anotherWeights[i])
    }
  })
  
})

function modelFactory() {
  return new Model({
      input: { neurons: 6 },
      hiddens: [ 
        { neurons: 12, activation: 'ReLU' }
      ],
      output: { neurons: 3, activation: 'softmax' },
    })
}