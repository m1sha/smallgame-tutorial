import { Size } from "smallgame"
import { Builders } from "./builders"
import { IViewerSettings } from "./viewer"

export interface ScriptSettings {
  container: HTMLDivElement
  width: number
  height: number
  fps: HTMLDivElement
  containerSize: Size
  builders: Builders
  viewerSettings: IViewerSettings
}