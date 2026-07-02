import { Time } from "smallgame"

export function displayFps (container: HTMLElement) {
  container.textContent = `${Time.fps.toFixed(0)}` 
}