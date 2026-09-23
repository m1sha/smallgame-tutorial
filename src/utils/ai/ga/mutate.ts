import { Genome } from "./genome";

export function mutate(genome: Genome, mutationRate = 0.1, mutationStrength = 0.2): void {
  //const mutated = new Float32Array(genome);
  for (let i = 0; i < genome.length; i++) {
    if (Math.random() < mutationRate) {
      genome[i] += gaussianRandom() * mutationStrength;
    }
  }
  //return mutated;
}

function gaussianRandom(mean = 0, stdDev = 1): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * stdDev + mean;
}