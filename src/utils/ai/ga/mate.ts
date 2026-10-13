import { Genome } from "./genome";

export function uniformCrossover(a: Genome, b: Genome, random: () => number): Genome {
  const child = new Float32Array(a.length);
  for (let i = 0; i < a.length; i++) {
    child[i] = random() < 0.5 ? a[i] : b[i];
  }
  return child;
}

export function blendCrossover(a: Genome, b: Genome, alpha = 0.5, random: () => number): Genome {
  const child = new Float32Array(a.length);
  for (let i = 0; i < a.length; i++) {
    const min = Math.min(a[i], b[i]);
    const max = Math.max(a[i], b[i]);
    const range = max - min;
    child[i] = min - range * alpha + random() * (range * (1 + 2 * alpha));
  }
  return child;
}