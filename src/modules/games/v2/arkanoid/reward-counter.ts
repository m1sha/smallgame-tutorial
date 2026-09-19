export class RewardCounter {
  score = 0
  outsideTimes = 0
  catchTimes = 0
  moveTimes = 0
  brokenBrick = 0
  
  addRewardForBrokenBrick() {
    this.score += 1
    this.brokenBrick++
  }

  addRewardForMovement() {
    this.score += 0.0000001  
    this.moveTimes++
  }

  addRewardForWin() {
    this.score += 100
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