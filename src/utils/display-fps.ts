import { Time } from "smallgame";

export function displayFps (container: HTMLElement, _?: number) {
  container.textContent = isNaN(Time.fps) ? '∞' : Time.fps.toFixed(0)
}