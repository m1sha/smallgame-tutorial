export type UniformCrossover = {
  type: 'UniformCrossover'
}

export type BlendCrossover = {
  type: 'BlendCrossover',
  alpha: number
}

type Crossovers = UniformCrossover | BlendCrossover

export type GeneticTrainerDefinition = {
  elitePercent: number
  reproduction: {
    tournamentCount: number,
    crossover: Crossovers
  }
  mutation: {
    rate: number
    strength: number
  }
}