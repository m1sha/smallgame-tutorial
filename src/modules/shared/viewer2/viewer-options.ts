import { TPoint } from "smallgame"

export interface IViewport {
  cursor: TPoint
  offset: TPoint
  zoom: number
}

export interface IViewerControls  {
  viewport: IViewport
}

export type ViewerOptions = {
  disableContextMenu?: boolean
  viewerControls?: IViewerControls
}