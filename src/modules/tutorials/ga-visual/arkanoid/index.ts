import { Rect, Size } from "smallgame"
import { createEnv } from "../../../games/v2"
import { type ScriptSettings, Viewer, displayFps } from "../../core"
import { ActionsPanel, AgentsStatisticsPanel, AgentTrainerPanel, createAgentInfo } from "./panels"
import { ArkanoidAgent } from "./arkanoid-agent"
import { ArkanoidAgentsTrainerHelper } from "./worker"
import yoneur from "./agents-raw/yoneur"
import { RemoteStorePanel } from "../../../shared"
import { ArkanoidStore } from "./store"
import { Discrete } from "../../../../utils/ai/enviroment"

export default async ({ container, containerSize, fps, builders, garbageCollect, globalViewport, panels, modals }: ScriptSettings): Promise<void> => {
  const viewer = new Viewer(containerSize, container, { disableContextMenu: true, garbageCollect, globalViewport })
  const telemetry = builders.telemetry().noLegend()
  const score = telemetry.def('Score', 0)
  const frames = telemetry.def('Frames', 0)

  const store = new ArkanoidStore()
  await store.load()

  const actionsPanel = panels.use(ActionsPanel)
  const agentsStatisticsPanel = panels.use(AgentsStatisticsPanel)
  const agentTrainerPanel = panels.use(AgentTrainerPanel)
  panels.use(RemoteStorePanel)

  const worldSize = new Size(560, 460)
  const env = createEnv('arkanoid', { worldSize, dt: () => 3 })

  actionsPanel.onAction = (action) => {
    //arkanoid.action(action)
    //arkanoid.next()
    //renderer.render(arkanoid)
    frames.value ++
  }

  viewer.onKeyPressed = keys => {
    if (keys.horizontalAxisRaw !== 0)
      env.step(new Discrete(keys.horizontalAxisRaw < 0 ? 1 : 2)) // arkanoid.action(keys.horizontalAxisRaw < 0 ? 1 : 2)
  }
  
  let topagent: ArkanoidAgent | null = new ArkanoidAgent(env, 'yo')
  topagent.load(new Float32Array(yoneur))

  const rect = Rect.size(worldSize)
  rect.absCenter = viewer.viewportRect.center.shiftX(200)
  
  let decision = 0
  viewer.onFrameChanged = frame => {
    const image = env.render()
    frame.clear()
    frame.blit(image, rect)
    displayFps(fps)

    if (topagent) {
      const { observation, reward, terminated } = env.step(new Discrete(decision))
      decision = topagent.decide(observation as Float32Array)
      score.value += reward

      if (terminated) {
        env.reset()
      }
    }
  }

  agentsStatisticsPanel.onPopulationCreate = async size => {
    debugger
    const name = await modals.choose('Name', 'Create Population', ['Ho', 'Hi', 'Super'], 'Hi')
    console.log('Name', name)
    //const agents = createAgents(size)
    //await savePopulation('Aquazoic', agents)
    //population.add()
  }

  agentTrainerPanel.epochs = 100
  agentTrainerPanel.onStartTrain = () => ArkanoidAgentsTrainerHelper.train(agentTrainerPanel.epochs)

  ArkanoidAgentsTrainerHelper.onTrain = (data) => {
    agentTrainerPanel.epoch = data.epoch
    agentTrainerPanel.addLog(data.epoch, data.max, data.meen, data.min, data.brokenBricks, data.catchTimes)
  }

  ArkanoidAgentsTrainerHelper.onComplete = (data) => {
    data.individuals.forEach(individual => agentsStatisticsPanel.addAget(createAgentInfo(individual)))
    const { id, name, weights } = data.individual
    topagent = new ArkanoidAgent(env, name)
    topagent.id = id
    topagent.load(new Float32Array(weights))
    //arkanoid.reset()
    env.reset()
  }

}
