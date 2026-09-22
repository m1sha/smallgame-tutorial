export type AgentsStatisticsData = {
  agents: AgentInfo[]
}

export type AgentInfo = {
  id: string
  name: string
  epoch: number
  fitness: number
  brockenBricks: number
  cautchBalls: number
  activeMoving: number
  outsideMoving: number
  timeLife: number
  parentAId: string | null
  parentBId: string | null
}


export function createAgentInfo (info: any): AgentInfo {
  return {
    id: info.id,
    name: info.name,
    epoch: info.epoch,
    fitness: info.fitness,
    brockenBricks: info.brokenBricks,
    cautchBalls: info.catchTimes,
    activeMoving: info.moveTimes,
    outsideMoving: info.outsideTimes,
    timeLife: info.timeLife,
    parentAId: info.parentA,
    parentBId: info.parentB
  }
}