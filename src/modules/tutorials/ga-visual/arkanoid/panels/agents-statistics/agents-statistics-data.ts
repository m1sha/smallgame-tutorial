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
  parentAId: string | null
  parentBId: string | null
}


export function createAgentInfo (
  id: string,
  name: string,
  epoch: number,
  fitness: number,
  brockenBricks: number,
  cautchBalls: number,
  activeMoving: number,
  outsideMoving: number,
  parentAId: string | null,
  parentBId: string | null
): AgentInfo {
  return {
    id,
    name,
    epoch,
    fitness,
    brockenBricks,
    cautchBalls,
    activeMoving,
    outsideMoving,
    parentAId,
    parentBId
  }
}