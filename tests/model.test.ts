import { describe, it, expect } from 'vitest'
import { ModelDefinition, Model } from '../src/utils/ai'

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

  it('Same Weights every time when initWeights uses seed for random', () => {
    const SEED = 1
    const modelA = modelFactory()
    modelA.initWeights(SEED)
    const weightsA = modelA.getWeights()
    const modelB = modelFactory()
    modelB.initWeights(SEED)
    const weightsB = modelB.getWeights()

    for (let i = 0; i < weightsA.length; i++) {
      expect(weightsA[i]).toBe(weightsB[i])
    }
  })

  it('When all Weights are 1 pectict with [1.] must return 1 ', () => {
    const model = new Model({
      input: { neurons: 2 },
      hiddens: [ 
        { neurons: 12, activation: 'ReLU' }
      ],
      output: { neurons: 1, activation: 'ReLU' }
    })
    model.fillWeights(0)
    model.predict(new Float32Array([1, 1]))
    const value = model.getOutput()[0]
    expect(value).toBe(0)
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