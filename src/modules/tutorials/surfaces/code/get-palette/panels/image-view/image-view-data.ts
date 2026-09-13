
export interface Viewport {
  zoom: number
  offsetX: number
  offsetY: number
}

export function defineViewport (): Viewport {
  return  {
    zoom: 1,
    offsetX: 0,
    offsetY: 0
  }
}

export interface ImageViewData {
  setContainer (container: HTMLDivElement, callback: (event: string) => void): void,
  viewport: Viewport
}