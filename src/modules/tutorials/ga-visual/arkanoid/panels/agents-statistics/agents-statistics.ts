import { Point } from "smallgame"
import { Panel } from "../../../../../../components/example/code/panels"
import AgentsStatisticsComponent from "./components/agents-statistics.vue"
import { AgentsStatisticsData, AgentInfo } from "./agents-statistics-data"
import { createReactiveData } from "../../../../../../components/example"

export class AgentsStatistics extends Panel<AgentsStatisticsData> {
  constructor () {
    super('Agents', AgentsStatisticsComponent, new Point(10, 310))
    this.data = createReactiveData({ agents: [] })
    this.action = (actionName, args) => {
      if (actionName === 'download-weigths') {
        this.onDownloadWeigths?.(args)
      }
    }
  }

  onDownloadWeigths: ((id: string) => void) | null = null

  addAget (agent: AgentInfo) {
    this.data!.agents.push(agent)
  }
}