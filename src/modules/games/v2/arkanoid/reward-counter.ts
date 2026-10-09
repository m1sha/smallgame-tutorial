interface RewardCounterLike {
  score: number
  outsideTimes: number
  catchTimes: number
  moveTimes: number
  brokenBricks: number
  win: number
}

export class RewardCounter {
  score = 0
  outsideTimes = 0
  catchTimes = 0
  moveTimes = 0
  brokenBricks = 0
  win = 0
  
  addRewardForBrokenBrick() {
    this.score += 1
    this.brokenBricks++
  }

  addRewardForMovement() {
    this.score += 0.0000001  
    this.moveTimes++
  }

  addRewardForWin() {
    this.score += 1
    this.win ++
  }

  addRewardForCatch() { 
    this.score += 0.1
    this.catchTimes++
  }

  removeRewardForOutSide () {
    this.score -= 0.01
    this.outsideTimes++
  }

  dup () {
    const result = new RewardCounter()
    result.score = this.score
    result.outsideTimes = this.outsideTimes
    result.catchTimes = this.catchTimes
    result.moveTimes = this.moveTimes
    result.brokenBricks = this.brokenBricks
    result.win = this.win
    return result
  }

  diff (like: RewardCounterLike): RewardCounterLike {
    return {
      score: this.score - like.score,
      outsideTimes: this.outsideTimes - like.outsideTimes,
      catchTimes: this.catchTimes - like.catchTimes,
      moveTimes: this.moveTimes - like.moveTimes,
      brokenBricks: this.brokenBricks - like.brokenBricks,
      win: this.win - like.win,
    }
  }

}