import { type IContextMenu } from "./context-menu"
import { IEnityList } from "./enity-list"
import { IPanel } from "./panels/panel"
import { type ITelemetry } from "./telemetry"
import { type IUI } from "./ui"
export interface ScriptModule {
  dispose?: () => void
  ui?: IUI
  telemetry?: ITelemetry
  contextMenu?: IContextMenu
  entities?: IEnityList
  panels?: IPanel[]
}