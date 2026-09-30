import { Size } from "smallgame"
import { Builders } from "./builders"
import { Viewport } from "../../../modules/shared"
import { PanelManager } from "./panels"
import { Modals } from "./modal"

export interface ScriptSettings {
  container: HTMLDivElement
  width: number
  height: number
  fps: HTMLDivElement
  containerSize: Size
  builders: Builders
  globalViewport: Viewport
  garbageCollect: (callback: () => void) => void
  messanger: { info: ( message: string) => void }
  panels: PanelManager
  modals: Modals
}