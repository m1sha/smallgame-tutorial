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

}