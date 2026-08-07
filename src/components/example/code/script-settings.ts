import { Size } from "smallgame"
import { Builders } from "./builders"
import { IViewerControls } from "../../../modules/shared"

export interface ScriptSettings {
  container: HTMLDivElement
  width: number
  height: number
  fps: HTMLDivElement
  containerSize: Size
  builders: Builders
  viewerControls: IViewerControls
  garbageCollect: (callback: () => void) => void
  messanger: { info: (message: string) => void }
}