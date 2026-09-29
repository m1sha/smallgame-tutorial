import { initChessBackground, TBackground } from "./background"
export interface IViewerControls  {
  background: TBackground

  updateChanges: () => void
}

export function initViewerControls (): IViewerControls {
  return {
    background: initChessBackground(),
    updateChanges: () => { /* overrides in viewer */}
  }
}