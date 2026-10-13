export class CancellationToken {
  readonly token: Uint8Array

  constructor (buffer?: ArrayBuffer) {
    this.token = new Uint8Array(buffer ?? new SharedArrayBuffer(1))
  }

  get cancelled () {
    return Atomics.load(this.token, 0) === 0
  }

  cancel () {
    Atomics.store(this.token, 0, 0)
  }

  reset () {
    Atomics.store(this.token, 0, 1)
  }
}