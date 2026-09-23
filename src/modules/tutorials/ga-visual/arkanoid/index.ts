import { Rect, Size } from "smallgame"
import { Arkanoid } from "../../../games/v2"
import { type ScriptSettings, Viewer, displayFps } from "../../core"
import { ActionsPanel, AgentsStatistics, AgentTrainerPanel, createAgentInfo } from "./panels"
import { ArkanoidRenderer } from "./arkanoid-renderer"
import { ArkanoidAgent } from "./arkanoid-agent"
import { ArkanoidAgentsTrainerHelper } from "./worker"
import yoneur from "./agents-raw/yoneur"
import { RemoteStorePanel } from "../../../shared"

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

  
  panels.addPanel(new RemoteStorePanel())

  const worldSize = new Size(560, 460)
  const arkanoid = Arkanoid.create(worldSize, () => 2)
  const renderer = new ArkanoidRenderer(worldSize)
  renderer.render(arkanoid)

  actionsPanel.onAction = (action) => {
    arkanoid.action(action)
    arkanoid.next()
    renderer.render(arkanoid)
    frames.value ++
  }

  viewer.onKeyPressed = keys => {
    if (keys.horizontalAxisRaw !== 0)
      arkanoid.action(keys.horizontalAxisRaw < 0 ? 1 : 2)
  }

  
  let topagent = new ArkanoidAgent(arkanoid, 'yo')
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
      if (decision > 0) arkanoid.action(decision)
    }

    if (arkanoid.state === 'gameover' || arkanoid.state === 'win') {
      arkanoid.reset()
    }
  }


  agentTrainerPanel.epochs = 250
  agentTrainerPanel.onStartTrain = () => ArkanoidAgentsTrainerHelper.train(agentTrainerPanel.epochs)

  ArkanoidAgentsTrainerHelper.onTrain = (data) => {
    agentTrainerPanel.epoch = data.epoch
    agentTrainerPanel.addLog(data.epoch, data.max, data.meen, data.min, data.brokenBricks, data.catchTimes)
  }

  ArkanoidAgentsTrainerHelper.onComplete = (data) => {
    data.individuals.forEach(individual => agentsStatistics.addAget(createAgentInfo(individual)))
    const { id, name, weights } = data.individual
    topagent = new ArkanoidAgent(arkanoid, name)
    topagent.id = id
    topagent.load(new Float32Array(weights))
    arkanoid.reset()
  }

}
