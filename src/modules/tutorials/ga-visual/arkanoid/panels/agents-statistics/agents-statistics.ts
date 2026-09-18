import { Point } from "smallgame"
import { Panel } from "../../../../../../components/example/code/panels"
import AgentsStatisticsComponent from "./components/agents-statistics.vue"
import { AgentsStatisticsData, AgentInfo } from "./agents-statistics-data"
import { createReactiveData } from "../../../../../../components/example"

export class AgentsStatistics extends Panel<AgentsStatisticsData> {
  constructor () {
    super('Agents', AgentsStatisticsComponent, new Point(50, 100))
    this.data = createReactiveData({ agents: [] })
  }


  addAget (agent: AgentInfo) {
    this.data!.agents.push(agent)
  }
}