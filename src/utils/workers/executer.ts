import { CancellationToken } from "./cancellation-token"

const execute = (callback: (termenate: boolean, step: number) => void, steps: number, cancellationToken: CancellationToken) => {
  const runner = (step: number) => {
    const id = setTimeout(() => {
      const termenate = cancellationToken.cancelled || step + 1 > steps - 1
      callback(termenate, step)
      clearTimeout(id)
      if (termenate) return
      runner(step + 1)
    }, 0)
  }
  runner(0)
}

export { execute }