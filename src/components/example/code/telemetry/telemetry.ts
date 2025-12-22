import { type ITelemetryParameter } from "./telemetry-parameter"

export interface ITelemetry {
  parameters: ITelemetryParameter[]
  startRecord: boolean
  data: Map<string, string[]>
  claerData: () => void
  openned: boolean
  wide: boolean
  opennedChart: boolean
}