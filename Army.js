const Platoon=require( "./Platoons.js");
class Army{
    constructor(platoonList=[]){
        if(!Array.isArray(platoonList)){
            throw new Error("Army must be initialized with an array of platoons");
        }
        this.platoonList = platoonList;
    }

    getPermutations() {
        const permute = (arr) => {
        if (arr.length === 0) return [[]];
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            let current = arr[i];
            let remaining = [];
            for (let j = 0; j < arr.length; j++) {
            if (j !== i) remaining.push(arr[j]);
            }
            let perms = permute(remaining);
            for (let p of perms) result.push([current, ...p]);
        }
        return result;
        };
        return permute(this.platoonList);
  }

  static fromStringToArmyObjects(str) {
    const platoons = str.split(";").map(p => {
      const [unitClass, count] = p.split("#");
      if(unitClass && Number(count)) return new Platoon(unitClass.trim(), Number(count));  
      else return null 
    }).filter(item=>item!=null || item!=undefined);
    return new Army(platoons);
  }

}

module.exports = Army