import { initChessBackground, TBackground } from "./background"
import { initViewport, IViewport } from "./viewport"

export interface IViewerControls  {
  viewport: IViewport
  background: TBackground

  updateChanges: () => void
}

export function initViewerControls (): IViewerControls {
  return {
    viewport: initViewport(),
    background: initChessBackground(),
    updateChanges: () => { /* overrides in viewer */}
  }
}