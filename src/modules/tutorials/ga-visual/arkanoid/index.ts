import { Rect, Size } from "smallgame"
import { Arkanoid } from "../../../games/v2"
import { type ScriptSettings, Viewer, displayFps } from "../../core"
import { ActionsPanel, AgentsStatistics, AgentTrainerPanel, createAgentInfo } from "./panels"
import { ArkanoidRenderer } from "./arkanoid-renderer"
import { GeneticTrainer } from "../../../ai"
import { ArkanoidAgent } from "./arkanoid-agent"
import { UniqueNameGenerator } from "../../../../utils/random"
import yoneur from "./agents-raw/yoneur"
import { download } from "../../../../utils"
import { ArkanoidAgentsTrainerHelper } from "./worker"

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls, panels }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const telemetry = builders.telemetry().noLegend()
  const score = telemetry.def('Score', 0)
  const frames = telemetry.def('Frames', 0)
  const player = telemetry.def('player', '')

  const actionsPanel = new ActionsPanel()
  panels.addPanel(actionsPanel)
  const agentsStatistics = new AgentsStatistics()
  panels.addPanel(agentsStatistics)
  const agentTrainerPanel = new AgentTrainerPanel()
  panels.addPanel(agentTrainerPanel)

  const worldSize = new Size(560, 460)
  const arkanoid = Arkanoid.create(worldSize, () => 2)
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

  
  let topagent: ArkanoidAgent  | null = new ArkanoidAgent(arkanoid, 'yo')
  topagent.load(new Float32Array(yoneur))

  const rect = Rect.size(worldSize)
  rect.absCenter = viewer.viewportRect.center.shiftX(200)
  
  let decision = 0
  viewer.onFrameChanged = frame => {
    frame.clear()
    frame.blit(renderer.image, rect)
    displayFps(fps)
  
    score.value = arkanoid.rewards.score

    if (topagent) {
      arkanoid.next()
      renderer.render(arkanoid)
      
      decision = topagent.decide()
      if (decision === 1) arkanoid.moveLeft()
      if (decision === 2) arkanoid.moveRight()
    }

    if (arkanoid.state === 'gameover' || arkanoid.state === 'win') {
      arkanoid.reset()
    }
  }


  agentTrainerPanel.epochs = 600
  agentTrainerPanel.onStartTrain = () => {
    ArkanoidAgentsTrainerHelper.train(agentTrainerPanel.epochs)
    //trainAgents()
  }

  ArkanoidAgentsTrainerHelper.onTrain = (data) => {
    agentTrainerPanel.epoch = data.epoch
    agentTrainerPanel.addLog(data.epoch, data.max, data.meen, data.min, data.brokenBricks, data.catchTimes)
  }

  ArkanoidAgentsTrainerHelper.onComplete = (data) => {
    for (const individual of data.individuals) {
      agentsStatistics.addAget(
        createAgentInfo(
          individual.id, 
          individual.name, 
          individual.epoch, 
          individual.fitness, 
          individual.brokenBricks, 
          individual.catchTimes, 
          individual.moveTimes, 
          individual.outsideTimes, 
          individual.timeLife, 
          individual.parentA, 
          individual.parentB
        )
      )
    }

    const { id, name, weights } = data.individual
    topagent = new ArkanoidAgent(arkanoid, name)
    topagent.id = id
    topagent.load(new Float32Array(weights))
    arkanoid.reset()
  }

  
  
  // function trainAgents () {
  //   return new Promise<void>(resolve => {
  //   setTimeout(() => {
  //     agentTrainer.train(agentTrainerPanel.epochs, (epoch) => {
  //       const topone = agentTrainer.population.top(1)[0] as ArkanoidAgent
  //       const meen =  agentTrainer.population.meen()
  //       const worst =  agentTrainer.population.worst()
  //       console.log(`epoch ${epoch} fitness: ${topone.fitness} broken bricks: ${topone.rewards.brokenBricks} `)

  //       agentTrainerPanel.epoch = epoch
  //       agentTrainerPanel.addLog(epoch, topone.fitness, meen, worst, topone.rewards.brokenBricks, topone.rewards.catchTimes)
        
  //       if (epoch < agentTrainerPanel.epochs - 1) return
        
  //       for (const individual of agentTrainer.population.individuals) {
  //         const a = individual as ArkanoidAgent
  //         agentsStatistics.addAget(
  //           createAgentInfo(
  //             a.id, 
  //             a.name, 
  //             epoch, 
  //             a.fitness, 
  //             a.rewards.brokenBricks, 
  //             a.rewards.catchTimes, 
  //             a.rewards.moveTimes, 
  //             a.rewards.outsideTimes, 
  //             a.timeLife, 
  //             a.parentA, 
  //             a.parentB
  //           )
  //         )
  //       }
  //     })

  //     topagent = agentTrainer.population.top(1)[0] as ArkanoidAgent
  //     player.value = topagent.name
  //     arkanoid.reset()
  //     loading.value = false
  //     resolve()
  //   }, 0)
  //   })
  // }
  
}
