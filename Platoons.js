const advantageMap = require("./AdvantageMap");

class Platoon{
    constructor(unitClass,soldierCount){
        this.unitClass = unitClass;
        this.soldierCount = soldierCount;
    }

    hasAdvantageOverOtherPlatoons(otherPlatoon){
        if(Platoon.ADVANTAGE_MAP[this.unitClass]==undefined || Platoon.ADVANTAGE_MAP[this.unitClass].length==0) return false;
        return Platoon.ADVANTAGE_MAP[this.unitClass].includes(otherPlatoon?.unitClass);  
    }

    getStrength(otherPlatoon){
        return this.soldierCount * (this.hasAdvantageOverOtherPlatoons(otherPlatoon) ? 2 : 1);
    }

    outcomeAgainsOtherPlatoon(otherPlatoon){
        const myStrength = this.getStrength(otherPlatoon);
        const opponentStrength = otherPlatoon?.soldierCount;

        if(myStrength>opponentStrength){
            return "win";
        }else if(myStrength<opponentStrength){
            return "Loss";
        }else{
            return "Draw";
        }
    }
    toString(){
        return `${this.soldierCount} ${this.unitClass}`;
    }
}
// Static advantage map for all platoons
Platoon.ADVANTAGE_MAP = advantageMap

module.exports = Platoon