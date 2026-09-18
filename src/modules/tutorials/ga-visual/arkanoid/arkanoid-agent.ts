import { Individual, Model } from "../../../ai"
import { Arkanoid } from "../../../games/v2"

export class ArkanoidAgent extends Individual {
  model: Model

  constructor (private arkanoid: Arkanoid, private gameTicks: number = 300, name: string, needInit: boolean) {
    super()
    this.name = name
    const inputLegth = this.getObservations().length
    this.model = new Model({ 
      input: { neurons: inputLegth }, 
      hiddens: [ {neurons: 4, activation: 'ReLU' }], 
      output: { neurons: 3, activation: 'softmax' }
    })
    if (needInit) this.model.initWeights()
  }

  fitness (): number {
    this.arkanoid.reset()
    let i = 0
    for (i; i < this.gameTicks; i++) {
      const result = this.model.predict(this.getObservations())
      if (result === 1) this.arkanoid.moveLeft()
      if (result === 2) this.arkanoid.moveRight()
      this.arkanoid.next()

      if (this.arkanoid.state === 'gameover') break
    }

    const ticks = this.gameTicks - (this.gameTicks - i)

    this.currentFitness =  (this.arkanoid.rewards.moveTimes - this.arkanoid.rewards.outsideTimes) * 0.01 + this.arkanoid.rewards.catchTimes  //  this.arkanoid.rewards.score < 0 ? 0 : ticks
    return this.currentFitness
  }

  decide () {
    return this.model.predict(this.getObservations())
  }

  private getObservations () {
    const arr = new Float32Array(10)
    const size = this.arkanoid.world.size
    arr[0] = this.arkanoid.ball.position.x / size.width
    arr[1] = this.arkanoid.ball.position.y / size.height
    arr[2] = this.arkanoid.ball.velocity.x
    arr[3] = this.arkanoid.ball.velocity.y
    arr[4] = this.arkanoid.ball.radius / size.height
    arr[5] = this.arkanoid.carrent.position.x / size.width
    arr[6] = this.arkanoid.carrent.position.y / size.height
    arr[7] = this.arkanoid.carrent.velocity.x
    arr[8] = this.arkanoid.carrent.velocity.y
    arr[9] = this.arkanoid.carrent.size.width / size.width
    return arr
  }

}