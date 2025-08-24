const BattlePlanner =require( "./BattlePlanner.js");
const Army=require("./Army.js");
function triggerBattle() {
  // Example input 
  const myArmyStr = "Spearmen#10;Militia#30;FootArcher#20;LightCavalry#1000;HeavyCavalry#120;CalvaryArcher#1000";
  const opponentArmyStr = "Militia#10;Spearmen#10;FootArcher#1000;LightCavalry#120;CavalryArcher#100;CalvaryArcher#10";

  const myArmy = Army.fromStringToArmyObjects(myArmyStr);
  const opponentArmy = Army.fromStringToArmyObjects(opponentArmyStr);

  const planner = new BattlePlanner(myArmy, opponentArmy);
  if(myArmy.platoonList.length !== opponentArmy.platoonList.length){
      console.log("The armies must have the same number of platoons");
      return
  }

  const winCount = Math.floor(myArmy.platoonList.length / 2) + 1;
  const result = planner.findWinningArrangement(winCount);

  if (!result) {
    console.log("There is no chance of winning");
    return;
  }

  console.log(`Winning Arrangement (Wins: ${result.wins}/${myArmy.platoonList.length}):`);
  console.log(result.order.map(p => p.toString()).join(";"));

  console.log("\nBattle Outcomes:");
  console.log(result.results.map((b, idx) =>{
    const unit=b.myPlatoon.unitClass
    const count=b.myPlatoon.soldierCount
    return `${unit}#${count}`
  }).join(";"))
}

triggerBattle();