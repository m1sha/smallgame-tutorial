class ExampleApp {
  run (index: number, container: HTMLDivElement, fps: HTMLDivElement) {

  }

  stop (container: HTMLDivElement) {
    while(true) {
      const child = container.children[0]
      if (!child) break
      container.removeChild(child)
    }
  }
}

export default new ExampleApp()