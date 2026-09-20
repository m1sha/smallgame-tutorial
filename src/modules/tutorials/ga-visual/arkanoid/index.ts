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

export default async ({ container, containerSize, fps, builders, garbageCollect, viewerControls, panels }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, viewerControls })
  const telemetry = builders.telemetry().noLegend()
  const score = telemetry.def('Score', 0)
  const frames = telemetry.def('Frames', 0)
  const loading = telemetry.def('loading', true)
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

  const agentTrainer = new GeneticTrainer()
  let topagent: ArkanoidAgent  | null = new ArkanoidAgent(arkanoid, 'yo', false)
  topagent.load(new Float32Array(yoneur))

  agentsStatistics.onDownloadWeigths = (id) => {
   const individual = agentTrainer.population.get(id)
   if (!individual) return
   const content = `[${individual.model.getWeights().map(p => p).join(', ')}]`
   download(individual.name + '_weights.txt', content)
  }

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

  const names = new UniqueNameGenerator()
  agentTrainer.createIndividual = (epoch, needInit) => {
      const e = epoch ? ' v.' + epoch : ''
      const name = `${names.next()}${e}`
      return new ArkanoidAgent(arkanoid, name, needInit) 
  }
  agentTrainer.createPopulation(300)
  agentTrainer.fitnessFunc = individual => {
    const agent = individual as ArkanoidAgent
    return agent.calcFitness() 
  }

  agentTrainerPanel.epochs = 500

  agentTrainerPanel.onStartTrain = () => {
    trainAgents()
  }

  arkanoid.reset()
  
  function trainAgents () {
    return new Promise<void>(resolve => {
    setTimeout(() => {
      agentTrainer.train(agentTrainerPanel.epochs, (epoch) => {
        const topone = agentTrainer.population.top(1)[0] as ArkanoidAgent
        const meen =  agentTrainer.population.meen()
        const worst =  agentTrainer.population.worst()
        console.log(`epoch ${epoch} fitness: ${topone.fitness} broken bricks: ${topone.rewards.brokenBricks} `)

        agentTrainerPanel.epoch = epoch
        agentTrainerPanel.addLog(epoch, topone.fitness, meen, worst, topone.rewards.brokenBricks, topone.rewards.catchTimes)
        
        if (epoch < agentTrainerPanel.epochs - 1) return
        
        for (const individual of agentTrainer.population.individuals) {
          const a = individual as ArkanoidAgent
          agentsStatistics.addAget(
            createAgentInfo(
              a.id, 
              a.name, 
              epoch, 
              a.fitness, 
              a.rewards.brokenBricks, 
              a.rewards.catchTimes, 
              a.rewards.moveTimes, 
              a.rewards.outsideTimes, 
              a.timeLife, 
              a.parentA, 
              a.parentB
            )
          )
        }
      })

      topagent = agentTrainer.population.top(1)[0] as ArkanoidAgent
      player.value = topagent.name
      arkanoid.reset()
      loading.value = false
      resolve()
    }, 0)
    })
  }
  
}
