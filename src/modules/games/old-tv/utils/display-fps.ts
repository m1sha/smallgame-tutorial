import { Time } from "smallgame"

export function displayFps (container: HTMLElement) {
  container.textContent = `FPS: ${Time.fps.toFixed(0)}` 
}