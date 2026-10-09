import { ArkanoidEnv } from "./arkanoid"

const envs = {
  'arkanoid': ArkanoidEnv
}

type Envs = typeof envs

export function createEnv <K extends keyof Envs>(name: K, config?: Record<string, unknown>): InstanceType<Envs[K]> {
  return new envs[name](config) as InstanceType<Envs[K]>
}
