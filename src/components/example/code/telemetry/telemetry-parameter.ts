export interface ITelemetryParameter {
  name: string
  value: string
}

export class TelemetryParameter<T> {
  constructor (private origin: ITelemetryParameter, private _value: any) {

  }

  set value (value: T) {
    this.origin.value = TelemetryParameter.convertToString(value)
    this._value = value
  }

  get value (): T {
    return this._value
  }


  static convertToString (obj: any) {
    const keyval = (key: string, val: string) => `<span style="color: #888">${key}:</span><span style="padding-left: 1px; padding-right: 2px;">${val}</span>`
    if (!obj) return 'Null'
    if (typeof obj === 'number') return this.toNum(obj)
    if (typeof obj === 'boolean') return obj.toString()
    if (typeof obj === 'object'  && typeof obj.x === 'number' && typeof obj.y === 'number' && typeof obj.width === 'number' && typeof obj.height === 'number') {
      return `${keyval('x', this.toNum(obj.x))} ${keyval('y', this.toNum(obj.x))} ${keyval('w', this.toNum(obj.width))} ${keyval('h', this.toNum(obj.height))}`
    }
    if (typeof obj === 'object'  && typeof obj.x === 'number' && typeof obj.y === 'number') {
      return `${keyval('x', this.toNum(obj.x))} ${keyval('y', this.toNum(obj.x))}`
    }
    if (typeof obj === 'object'  && typeof obj.width === 'number' && typeof obj.height === 'number') {
      return `${keyval('width', this.toNum(obj.width))} ${keyval('height', this.toNum(obj.height))}`
    }

    return obj.toString()
  }

  private static toNum (obj: any) {
    return obj.toFixed(3).toString()
  }
}