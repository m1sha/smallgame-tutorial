import { Point } from "smallgame"
import { Panel } from "../../../../../../components/example/code/panels"
import AgentsStatisticsComponent from "./components/agents-statistics.vue"
import { AgentsStatisticsData, AgentInfo } from "./agents-statistics-data"
import { createReactiveData } from "../../../../../../components/example"

export class AgentsStatisticsPanel extends Panel<AgentsStatisticsData> {
  constructor () {
    super('Agents', AgentsStatisticsComponent, new Point(10, 310))
    this.data = createReactiveData({ agents: [] })
    this.action = (actionName, args) => {
      if (actionName === 'download-weigths') {
        this.onDownloadWeigths?.(args)
      }

      if (actionName === 'create') {
        this.onPopulationCreate?.(args)
      }

      if (actionName === 'save') {
        this.onSave?.()
      }

      if (actionName === 'load') {
        this.onLoad?.()
      }
    }
  }

  onDownloadWeigths: ((id: string) => void) | null = null

  onSave: (() => void) | null = null
  onPopulationCreate: ((populationSize: number) => void) | null = null
  onLoad: (() => void) | null = null

  addAget (agent: AgentInfo) {
    this.data!.agents.push(agent)
  }
}