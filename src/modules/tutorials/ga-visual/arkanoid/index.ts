import { Rect, Size } from "smallgame"
import { Arkanoid } from "../../../games/v2"
import { type ScriptSettings, Viewer, displayFps } from "../../core"
import { ActionsPanel, AgentsStatistics, createAgentInfo } from "./panels"
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

  const worldSize = new Size(560, 460)
  const arkanoid = Arkanoid.create(worldSize, () => 8)
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

    if (arkanoid.state === 'gameover' || arkanoid.state === 'win') {
      arkanoid.reset()
    }
  }

  //debugger

  const names = new UniqueNameGenerator()
  agentTrainer.createIndividual = (epoch, needInit) => {
      const e = epoch ? ' v.' + epoch : ''
      const name = `${names.next()}${e}`
      return new ArkanoidAgent(arkanoid, name, needInit) 
  }
  agentTrainer.createPopulation(300)
  agentTrainer.fitnessFunc = individual => {
    const agent = individual as ArkanoidAgent
    arkanoid.reset()
    const gameTicks = 80000
    let i = 0
     for (i; i < gameTicks; i++) {
       const result = individual.model.predict(agent.getObservations())
       if (result === 1) arkanoid.moveLeft()
       if (result === 2) arkanoid.moveRight()
       arkanoid.next()
       if (arkanoid.state === 'gameover') break
     }

    const ticks = gameTicks - (gameTicks - i)
    agent.timeLife = ticks
    agent.rewards = arkanoid.rewards
    const longPlay = ticks /gameTicks 
    const brokens =  agent.rewards.brokenBrick / (arkanoid.brickMap.map.cols * arkanoid.brickMap.map.rows)
    agent.fitness = brokens + (longPlay /2 )

    return agent.fitness 
  }

  arkanoid.reset()
  const epochs = 600
  function trainAgents () {
    setTimeout(() => {
      agentTrainer.train(epochs, (epoch) => {
        const topone = agentTrainer.population.top(1)[0] as ArkanoidAgent
        console.log(`epoch ${epoch} fitness: ${topone.fitness} broken bricks: ${topone.rewards.brokenBrick} `)
        if (epoch < epochs - 1) return
        for (const individual of agentTrainer.population.individuals) {
          const a = individual as ArkanoidAgent
          agentsStatistics.addAget(
            createAgentInfo(
              a.id, 
              a.name, 
              epoch, 
              a.fitness, 
              a.rewards.brokenBrick, 
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
      console.log('The best ' + topagent.name + ' with fitness ' + topagent.fitness)
      arkanoid.reset()
      loading.value = false
    }, 0)
  }
 // trainAgents()
}

  // fitness (): number {
  //   this.arkanoid.reset()
  //   let i = 0
  //   for (i; i < this.gameTicks; i++) {
  //     const result = this.model.predict(this.getObservations())
  //     if (result === 1) this.arkanoid.moveLeft()
  //     if (result === 2) this.arkanoid.moveRight()
  //     this.arkanoid.next()

  //     if (this.arkanoid.state === 'gameover') break
  //   }

  //   const ticks = this.gameTicks - (this.gameTicks - i)
  //   this.timeLife = ticks
  //   this.rewards = this.arkanoid.rewards
  //   this.currentFitness = ticks //  (this.arkanoid.rewards.moveTimes - this.arkanoid.rewards.outsideTimes) * 0.01 + this.arkanoid.rewards.catchTimes  //  this.arkanoid.rewards.score < 0 ? 0 : ticks
  //   return this.currentFitness
  // }
