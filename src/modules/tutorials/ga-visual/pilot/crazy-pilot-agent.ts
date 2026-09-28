import { Point } from "smallgame";
import { Individual, Model } from "../../../../utils/ai";
import { CrazyPilotGame } from "./crazy-pilot/crazy-pilot";
import { UniqueNameGenerator } from "../../../../utils/random";
import { Enemy } from "./crazy-pilot/enemy";

export class CrazyPilotAgent extends Individual {
  model: Model
  ticks = 18000

  constructor (name: string, private needInit: boolean = false) {
    super()
    this.name = name
    const inputLegth = 14
    this.model = new Model({ 
      input: { neurons: inputLegth }, 
      hiddens: [ {neurons: 16, activation: 'ReLU' }], 
      output: { neurons: 2, activation: 'tanh' }
    })
    if (needInit) this.model.initWeights(11112211)
  }

  decide (game: CrazyPilotGame) {
    this.model.predict(this.getObservations(game))
    const output = this.model.getOutput()
    return new Point(output[0], output[1])
  }

  getObservations (game: CrazyPilotGame) {
    const arr = new Float32Array(14)

    const result: { enemy: Enemy, dist: number }[] = []
    for (const enemy of game.enemies.items) {
      const dist = game.pilot.position.distance(enemy.position)
      result.push({ enemy: enemy, dist })
    }
    const enemeis = result.sort((a, b) => a.dist - b.dist).slice(0, 3).map(p => p.enemy)

    let i = 0
    const pilot = game.pilot
    arr[i++] = pilot.position.x / game.size.width
    arr[i++] = pilot.position.y / game.size.height

    for (const enemy of enemeis) {
      arr[i++] = (pilot.position.x - enemy.position.x) / game.size.width
      arr[i++] = (pilot.position.y - enemy.position.y) / game.size.height
      arr[i++] = enemy.velocity.x
      arr[i++] = enemy.velocity.y
    }

    return arr
  }

  calcFitness (game: CrazyPilotGame) {
    game.reset()
    game.canMove = true
    game.startEnemies = true
    
    let tick = 0
    for (tick; tick < this.ticks; tick++) {
      const pos = this.decide(game)
      game.action(pos.x, pos.y)
      game.next()
      if (game.gameover) break
    }

    const ticks = this.ticks - (this.ticks - tick)
    const longPlay = ticks / this.ticks 
    this.fitness = longPlay

    return this.fitness 
  }

  dup(): CrazyPilotAgent {
    const clone = new CrazyPilotAgent(this.name)
    clone.name = this.name
    clone.cloneCount = this.cloneCount + 1
    clone.fitness = this.fitness
    ;(clone as any).model = this.model.dup()
    return clone
  }
}

const names = new UniqueNameGenerator()
export function createAgents (count: number, needInit = true) {
  const result: CrazyPilotAgent[] = []
  for (let i =0; i < count; i++) {
    const name = `${names.next()}`
    result.push(new CrazyPilotAgent(name, needInit))
  }
  return result
}