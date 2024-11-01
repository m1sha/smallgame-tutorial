export function displayFps (container: HTMLElement, fps: number) {
  container.textContent = fps.toFixed(0)
}