class BattlePlanner {
  constructor(myArmy, opponentArmy) {
    this.myArmy = myArmy;
    this.opponentArmy = opponentArmy;
  }
  findWinningArrangement(minWins = 3) {
    const myPermutations = this.myArmy.getPermutations();

    for (let order of myPermutations) {
      let wins = 0;
      let results = [];

      for (let i = 0; i < order.length; i++) {
        const myPlatoon = order[i];
        const oppPlatoon = this.opponentArmy.platoonList[i];
        const outcome = myPlatoon.outcomeAgainsOtherPlatoon(oppPlatoon);
        results.push({ myPlatoon, oppPlatoon, outcome });
        if (outcome === "win") wins++;
      }

      if (wins >= minWins) {
        return { order, wins, results };
      }
    }

    return null;
  }

}

module.exports = BattlePlanner