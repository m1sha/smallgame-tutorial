import { Rect, Size } from "smallgame"
import { createEnv } from "../../../games/v2"
import { type ScriptSettings, Viewer, displayFps } from "../../core"
import { ActionsPanel, AgentsStatisticsPanel, AgentTrainerPanel, createAgentInfo } from "./panels"
import { ArkanoidAgent, createAgents } from "./arkanoid-agent"
import { ArkanoidAgentsTrainerHelper } from "./worker"
import yoneur from "./agents-raw/yoneur"
import { RemoteStorePanel } from "../../../shared"
import { ArkanoidStore } from "./store"
import { Discrete } from "../../../../utils/ai/enviroment"
import { savePopulation } from "./store/population-document"

export default async ({ container, containerSize, fps, builders, garbageCollect, globalViewport, panels, modals }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, globalViewport })
  const store = new ArkanoidStore()
  await store.load()

  const actionsPanel = panels.use(ActionsPanel)
  const agentsStatisticsPanel = panels.use(AgentsStatisticsPanel)
  const agentTrainerPanel = panels.use(AgentTrainerPanel)
  panels.use(RemoteStorePanel)

  const worldSize = new Size(560, 460)
  const env = createEnv('arkanoid', { worldSize, dt: () => 3 })
  const reset = () => {
    actionsPanel.frameCount = 0
    actionsPanel.score = 0
    env.reset()
  }
  //env.renderingTicks = 10

  actionsPanel.onAction = (actionName, args) => {
    if (actionName === 'reset') reset()
    if (actionName === 'move') {
      env.step(new Discrete(args))
      env.render()
      actionsPanel.frameCount ++
    }
    
  }

  let interactiveAction = 0
  viewer.onKeyPressed = keys => {
    interactiveAction = 0
    if (keys.horizontalAxisRaw !== 0) 
      interactiveAction = keys.horizontalAxisRaw < 0 ? 1 : 2
  }
  
  let topagent: ArkanoidAgent | null = new ArkanoidAgent('yo')
  topagent.load(new Float32Array(yoneur))

  const rect = Rect.size(worldSize)
  rect.absCenter = viewer.viewportRect.center.shiftX(200)
  
  let decision = 0
  viewer.onFrameChanged = frame => {
    const image = env.render()
    frame.clear()
    frame.blit(image, rect)
    displayFps(fps)

    if (actionsPanel.mode !== 'step')
      actionsPanel.frameCount++

    if (actionsPanel.mode === 'agent' || actionsPanel.mode === 'interactive') {
      const action = new Discrete(actionsPanel.mode === 'agent'  && topagent ? decision : interactiveAction) 
      const { observation, reward, terminated } = env.step(action)

      if (actionsPanel.mode === 'agent' && topagent) decision = topagent.decide(observation as Float32Array)
      
      actionsPanel.score += reward

      if (terminated) reset()
    }
  }

  agentsStatisticsPanel.onPopulationCreate = async size => {
    debugger
    const name = await modals.choose('Name', 'Create Population', ['Ho', 'Hi', 'Super'], 'Hi')
    console.log('Name', name)
    const agents = createAgents(size)
    console.log(agents.map(p => p.name).join('\n'))
    await savePopulation('Nullyobic', agents)
    //population.add()
  }
  
  agentTrainerPanel.epochs = 10
  agentTrainerPanel.onStartTrain = () => {
    agentTrainerPanel.running = true
    ArkanoidAgentsTrainerHelper.train(
      'Nullyobic', 
      agentTrainerPanel.epochs, 
      agentTrainerPanel.definition, 
      { gameTicks: 8000, dt: 3, worldSize: worldSize }
    )
  }
  agentTrainerPanel.onStopTrain = () => {
    agentTrainerPanel.running = false
    ArkanoidAgentsTrainerHelper.stop()
  }

  ArkanoidAgentsTrainerHelper.onTrain = (data) => {
    agentTrainerPanel.epoch = data.epoch
    agentTrainerPanel.addLog(data.epoch, data.max, data.meen, data.min, data.brokenBricks, data.catchTimes)
  }

  ArkanoidAgentsTrainerHelper.onComplete = (data) => {
    agentTrainerPanel.running = false
    data.individuals.forEach(individual => agentsStatisticsPanel.addAget(createAgentInfo(individual)))
    const { id, name, weights } = data.individual
    topagent = new ArkanoidAgent(name)
    topagent.id = id
    topagent.load(new Float32Array(weights))
    reset()
  }

}
