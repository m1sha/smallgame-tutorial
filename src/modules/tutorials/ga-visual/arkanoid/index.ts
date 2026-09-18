import { MemSurface, Rect, Size, Sketch, Time } from "smallgame"
import { Arkanoid } from "../../../games/v2"
import { type ScriptSettings, Viewer, displayFps } from "../../core"
import { ActionsPanel, AgentsStatistics, createAgentInfo } from "./panels"
import { ArkanoidRenderer } from "./arkanoid-renderer"
import { GeneticTrainer, Individual } from "../../../ai"
import { ArkanoidAgent } from "./arkanoid-agent"
import { UniqueNameGenerator } from "../../../../utils/random"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls, panels }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const telemetry = builders.telemetry().noLegend()
  const score = telemetry.def('Score', 0)
  const frames = telemetry.def('Frames', 0)
  const loading = telemetry.def('loading', true)

  const actionsPanel = new ActionsPanel()
  panels.addPanel(actionsPanel)
  const agentsStatistics = new AgentsStatistics()
  panels.addPanel(agentsStatistics)

  const worldSize = new Size(560, 460)
  const arkanoid = Arkanoid.create(worldSize, () => 1)
  const renderer = new ArkanoidRenderer(worldSize)
  renderer.render(arkanoid)

  actionsPanel.onAction = (action) => {
    if (action === 1) arkanoid.moveLeft()
    if (action === 2) arkanoid.moveRight()
    arkanoid.next()
    renderer.render(arkanoid)
    frames.value ++
  }

  viewer.onKeyPressed = keys => {
    const v = keys.horizontalAxisRaw
    if (v < 0) arkanoid.moveLeft()
    if (v > 0) arkanoid.moveRight()
    renderer.render(arkanoid)
  }

  const agentTrainer = new GeneticTrainer()
  let topagent: ArkanoidAgent  | null = null

  const rect = Rect.size(worldSize)
  rect.absCenter = viewer.viewportRect.center
  let fr = 0
  let d = 0
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(renderer.image, rect)
    displayFps(fps)

    fr++
    score.value = arkanoid.rewards.score

    if (topagent) {
      //if (fr % 10 === 0) {
      //  return
      //}
      arkanoid.next()
      renderer.render(arkanoid)
      
       d = topagent.decide()
      if (d === 1) arkanoid.moveLeft()
      if (d === 2) arkanoid.moveRight()
    }

    if (arkanoid.state === 'gameover') {
      arkanoid.reset()
    }
  }

  //debugger

  const names = new UniqueNameGenerator()
  const epochs = 10

  function trainAgents () {
    setTimeout(() => {
      let i = 0
      agentTrainer.individualTemplate = (epoch, needInit) => {
        const e = epoch ? ' v.' + epoch : ''
        const name = `${names.next()}${e}`
        return new ArkanoidAgent(arkanoid, 1000, name, needInit) 
      }

      agentTrainer.createPopulation(100)
      for (let i = 0; i < epochs; i ++){
        console.log('epoch ', i)
        agentTrainer.train(i)

        for (const a of agentTrainer.population.individuals) {
          agentsStatistics.addAget(createAgentInfo(a.id, a.name, i, a.currentFitness, arkanoid.rewards.brokenBrick, arkanoid.rewards.catchTimes, arkanoid.rewards.moveTimes, arkanoid.rewards.outsideTimes, null, null))
        }

        
      }

      topagent = agentTrainer.population.top(1)[0] as ArkanoidAgent
      console.log('The best ' + topagent.name + ' with fitness ' + topagent.currentFitness)
      arkanoid.reset()
      loading.value = false
    }, 0)
  }
  trainAgents()
}


