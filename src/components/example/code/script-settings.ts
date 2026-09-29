import { Size } from "smallgame"
import { Builders } from "./builders"
import { IViewerControls, Viewport } from "../../../modules/shared"
import { PanelManager } from "./panels"
import { Modals } from "./modal"

export interface ScriptSettings {
  container: HTMLDivElement
  width: number
  height: number
  fps: HTMLDivElement
  containerSize: Size
  builders: Builders
  viewport: Viewport
  viewerControls: IViewerControls
  garbageCollect: (callback: () => void) => void
  messanger: { info: ( message: string) => void }
  panels: PanelManager
  modals: Modals
}