import { JsonDocument, RemoteStorage, uuidv4 } from "../../../../../utils"
import { Model, ModelDefinition } from "../../../../../utils/ai"
import { ArkanoidAgent } from "../arkanoid-agent"

export type PopulationDocument = {
  id: string
  epochs: number
  agents: AgentDocument[]
}

export type AgentDocument = {
  id: string,
  name: string
  ddnDef: ModelDefinition
  weights: number[]
}

export async function savePopulation (name: string, agents: { id: string, name: string, model: Model }[], epochs = 0) {
  const population: PopulationDocument = {
    id: uuidv4(),
    epochs,
    agents: agents.map(p => ({ 
      id: p.id,
      name: p.name,
      ddnDef: p.model.def, 
      weights: [...p.model.getWeights()] 
    }))
  }

  //const d = await JsonDocument.find(name)
  //await d.delete()

  const doc = JsonDocument.create(name, population)
  await doc.save()
}

export async function loadPopulation (name: string) {
 const doc = await JsonDocument.find(name)
 const population = await doc.load<PopulationDocument>()
 const agents = population.agents.map(p => {
  const agent = new ArkanoidAgent(p.name)
  agent.id = p.id
  agent.model.setWeights(new Float32Array(p.weights))
  return agent
 })
 return { agents }
}