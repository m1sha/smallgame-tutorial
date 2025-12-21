import { reactive, ref } from "vue"
import { ITelemetry } from "./telemetry"
import { ITelemetryParameter, TelemetryParameter } from "./telemetry-parameter"





export class TelemetryBuilder {
  private parameters: ITelemetryParameter[] = reactive([])
  private callbacks: (() => string)[] = []
  private startRecord = ref(false)
  private data: Map<string, string[]> = reactive(new Map())

  private openned = ref(false)
  private opennedChart = ref(false)

  private autoStartTrigger: (() => boolean) | null = null
  private autoStopTrigger: (() => boolean) | null = null
  private autoStartIsStopped = true
  private autoDone = false

  open () {
    this.openned.value = true
    return this
  }

  openChart () {
    this.opennedChart.value = true
    return this
  }

  def <C>(caption: string, value?: C) {
    this.parameters.push({ name: caption, value: TelemetryParameter.convertToString(value) ?? '' })
    this.callbacks.push(undefined)
    return new TelemetryParameter<C>(this.parameters[this.parameters.length -1], value)
  }

  /**@deprecated use "def" method instead */
  param (caption: string, callback?: () => string, defaultValue?: string) {
    this.parameters.push({ name: caption, value: defaultValue ?? '' })
    this.callbacks.push(callback)
    return this
  }

  auto (startTrigger: () => boolean, stopTrigger: () => boolean) {
    this.autoStartTrigger = startTrigger
    this.autoStopTrigger = stopTrigger
  }

  resetAuto () {
    this.data.clear()
    this.autoDone = false
    this.autoStartIsStopped = true
  }

  tick (): void {
    if (this.autoStartTrigger && this.autoStartIsStopped) {
      if (this.autoStartTrigger()) {
        this.autoStartIsStopped = false
        this.startRecord.value = true
      }
    } else if (!this.autoStartIsStopped && this.autoStopTrigger) {
      if (this.autoStopTrigger() && !this.autoDone) {
        this.autoDone = true
        this.startRecord.value = false
      }
    }

    for (let i = 0; i < this.parameters.length; i++) {
      const parameter = this.parameters[i]
      if (this.callbacks[i]) parameter.value = this.callbacks[i]()

      if (this.startRecord.value) {
        if (this.data.has(parameter.name)) {
          this.data.get(parameter.name)?.push(parameter.value)
        } else {
          this.data.set(parameter.name, [parameter.value])
        }
      }
    }
  }

  build (): ITelemetry {
    return {
      parameters: this.parameters,
      startRecord: this.startRecord as any as boolean,
      data: this.data,
      claerData: () => this.data.clear(),
      openned: this.openned as any as boolean,
      opennedChart: this.opennedChart as any as boolean
    }
  }
}