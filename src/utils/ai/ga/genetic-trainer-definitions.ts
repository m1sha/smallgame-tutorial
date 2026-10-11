export type UniformCrossover = {
  type: 'UniformCrossover'
}

export type BlendCrossover = {
  type: 'BlendCrossover',
  alpha: number
}

type Crossovers = UniformCrossover | BlendCrossover

export type GeneticTrainerDefinition = {
  seed?: number 
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

export function defualtGeneticTrainerDefinition (): GeneticTrainerDefinition {
  return {
    elitePercent: 5,
    reproduction: {
      tournamentCount: 3,
      crossover: { type: 'UniformCrossover' },
    },
    mutation: {
      rate: 0.1,
      strength: 0.2
    }
  }
}