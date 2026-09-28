import { MemSurface, Size } from "smallgame"
import { type ScriptSettings, Viewer, displayFps } from "../../core"
import { Renderer } from "./crazy-pilot-renderer"
import { CrazyPilotGame } from "./crazy-pilot/crazy-pilot"
import { CrazyPilotAgentsTrainer } from "./crazy-pilot-agents-trainer"


export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const gameFiled = new MemSurface(new Size(400, 400))
  const rect = gameFiled.rect.dup()
  rect.center = viewer.viewportRect.center
  const game = new CrazyPilotGame(rect.size)

  const trainer = new CrazyPilotAgentsTrainer()
  const agent = trainer.train(2)
  
  viewer.onInput = ev => {
    if (ev.type === 'MOUSEDOWN') {
      if (game.gameover) game.reset()
      game.start(ev.pos.shift(rect.topLeft.neg()))
    }
    if (ev.type === 'MOUSEMOVE') {
      if (ev.lbc) { game.action(ev.shift.x, ev.shift.y) }
    }
    if (ev.type === 'MOUSEUP') {
      game.stopMoving()
    }
  }
  game.canMove = true
  game.startEnemies = true
  const renderer = new Renderer(game.pilot, game.enemies)
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(gameFiled, rect)
    gameFiled.fill('#117')
    renderer.render(gameFiled)
    const point = agent.decide(game)
    game.action(point.x, point.y)
    game.next()
    if (game.gameover) game.reset()
    displayFps(fps)
  }
}
