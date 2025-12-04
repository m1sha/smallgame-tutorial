export function delay(timeout: number = 0): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      try {
        resolve()
      } catch (e) {
        reject(e)
      } finally {
        clearTimeout(timeoutId)
      }
    }, timeout)
  })
}
