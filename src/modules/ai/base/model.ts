export type Activation = 'ReLU' | 'sigmoid' | 'tanh' | 'linear' | 'softmax'

export type ModelDefinition = {
  input: { neurons: number }
  hiddens: { neurons: number; activation: Exclude<Activation, 'softmax'> }[]
  output: { neurons: number; activation: Activation }
}

type Layer = {
  inputSize: number
  size: number
  activation: Activation
  weightsOffset: number
  biasesOffset: number
  valuesOffset: number
}

/**
 * Dense feed-forward neural network.
 *
 * Layout of `data`:
 * [weights layer 0][biases layer 0]...[weights layer N][biases layer N]
 * [input values][layer 0 values]...[layer N values]
 *
 * A layer weight matrix is row-major: weight(outputNeuron, inputNeuron).
 */
export class Model {
  readonly data: Float32Array
  private readonly layers: Layer[]
  /** Number of trainable values: all connection weights and biases. */
  private readonly weightsLength: number
  readonly parametersLength: number
  private readonly inputOffset: number

  constructor(readonly def: ModelDefinition) {
    this.validateDefinition(def)

    const specs = [...def.hiddens, def.output]
    let previousSize = def.input.neurons
    let offset = 0
    this.layers = specs.map((spec) => {
      const layer: Layer = {
        inputSize: previousSize,
        size: spec.neurons,
        activation: spec.activation,
        weightsOffset: offset,
        biasesOffset: offset + previousSize * spec.neurons,
        valuesOffset: 0,
      }
      offset += previousSize * spec.neurons + spec.neurons
      previousSize = spec.neurons
      return layer
    })
    this.weightsLength = offset
    

    this.inputOffset = offset
    offset += def.input.neurons
    for (const layer of this.layers) {
      layer.valuesOffset = offset
      offset += layer.size
    }
    this.data = new Float32Array(offset)
    this.parametersLength = this.data.length
  }

  /** Runs inference and returns the index of the largest output value. */
  predict(input: Float32Array): number {
    if (input.length !== this.def.input.neurons) {
      throw new Error(`Expected ${this.def.input.neurons} inputs, received ${input.length}`)
    }

    this.data.set(input, this.inputOffset)
    let sourceOffset = this.inputOffset
    let sourceSize = input.length

    for (const layer of this.layers) {
      this.calculateDenseLayer(layer, sourceOffset, sourceSize)
      this.applyActivation(layer)
      sourceOffset = layer.valuesOffset
      sourceSize = layer.size
    }

    return this.argmax(sourceOffset, sourceSize)
  }

  /** Returns a copy, so external mutation cannot corrupt the model. */
  /**
   * Returns only trainable parameters (weights and biases), never layer values.
   * The returned array can be passed directly to setWeights() on a model with
   * the same definition.
   */
  getWeights(): Float32Array {
    return this.data.slice(0, this.weightsLength)
  }

  /** Replaces only trainable parameters; activation buffers are untouched. */
  setWeights(weights: Float32Array): void {
    if (weights.length !== this.weightsLength) {
      throw new Error(`Expected ${this.weightsLength} weights and biases, received ${weights.length}`)
    }
    this.data.set(weights, 0)
  }

  /** Xavier/Glorot uniform initialization; biases are initialized to zero. */
  initWeights(): void {
    for (const layer of this.layers) {
      const limit = Math.sqrt(6 / (layer.inputSize + layer.size))
      const weightCount = layer.inputSize * layer.size
      for (let i = 0; i < weightCount; i++) {
        this.data[layer.weightsOffset + i] = (Math.random() * 2 - 1) * limit
      }
      this.data.fill(0, layer.biasesOffset, layer.biasesOffset + layer.size)
    }
  }

  /** Use after predict() when probabilities/logits themselves are needed. */
  getOutput(): Float32Array {
    const output = this.layers[this.layers.length - 1]
    return this.data.slice(output.valuesOffset, output.valuesOffset + output.size)
  }

  private calculateDenseLayer(layer: Layer, sourceOffset: number, sourceSize: number): void {
    for (let neuron = 0; neuron < layer.size; neuron++) {
      let sum = this.data[layer.biasesOffset + neuron]
      const weightOffset = layer.weightsOffset + neuron * sourceSize
      for (let input = 0; input < sourceSize; input++) {
        sum += this.data[sourceOffset + input] * this.data[weightOffset + input]
      }
      this.data[layer.valuesOffset + neuron] = sum
    }
  }

  private applyActivation(layer: Layer): void {
    const start = layer.valuesOffset
    const end = start + layer.size
    if (layer.activation === 'softmax') {
      this.applySoftmax(start, end)
      return
    }
    for (let i = start; i < end; i++) {
      const value = this.data[i]
      this.data[i] = this.activate(value, layer.activation)
    }
  }

  private activate(value: number, activation: Activation): number {
    switch (activation) {
      case 'ReLU': return Math.max(0, value)
      case 'sigmoid': return 1 / (1 + Math.exp(-value))
      case 'tanh': return Math.tanh(value)
      case 'linear': return value
      default: throw new Error(`Unsupported activation: ${activation}`)
    }
  }

  /** Numerically stable softmax. */
  private applySoftmax(start: number, end: number): void {
    let max = -Infinity
    for (let i = start; i < end; i++) max = Math.max(max, this.data[i])
    let total = 0
    for (let i = start; i < end; i++) total += (this.data[i] = Math.exp(this.data[i] - max))
    for (let i = start; i < end; i++) this.data[i] /= total
  }

  private argmax(offset: number, size: number): number {
    let index = 0
    for (let i = 1; i < size; i++) {
      if (this.data[offset + i] > this.data[offset + index]) index = i
    }
    return index
  }

  private validateDefinition(def: ModelDefinition): void {
    const allLayers = [def.input, ...def.hiddens, def.output]
    if (allLayers.some((layer) => !Number.isInteger(layer.neurons) || layer.neurons < 1)) {
      throw new Error('Every layer must have a positive integer number of neurons')
    }
  }
}




// export class Model {
//   constructor (private def: ModelDefinition) {
    
//   }
//   // learn () {}
//   predict () {}
// }

// export type ModelDefinition = {
//   input: InputLayerDefinition
//   hiddens: HiddenLayerDefinition[]
//   output: OutputLayerDefinition
// }

// export type ActivationFunctionName = 'reLU' | 'softmax'
// export type LayerDefinition = {
//   neurons: number
// }

// export type InputLayerDefinition = LayerDefinition
// export type HiddenLayerDefinition = LayerDefinition & { activation: ActivationFunctionName }
// export type OutputLayerDefinition = LayerDefinition & { activation: ActivationFunctionName }