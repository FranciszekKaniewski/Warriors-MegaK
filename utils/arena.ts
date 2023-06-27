import {WarriorRecord} from "../records/warrior-record";

export class Arena {
    Warrior1:WarriorRecord;
    Warrior2:WarriorRecord;

    constructor(obj:WarriorRecord[]) {
        this.Warrior1 = obj[0]
        this.Warrior2 = obj[1]
    }

    private async attack(attacker:WarriorRecord,defender:WarriorRecord):Promise<string[]>{
        const logs:string[] = [];

        const dodgePercent:number = Math.round(Math.random() * 99) + 1;
        let dodge:boolean = false;

        const dubleDamagePercent:number = Math.round(Math.random() * 99) + 1;
        let dubleDamage:boolean = false;

        logs.push("--------------ROUND--------------------")
        logs.push(`${attacker.name} Attack!:`)

        if(dodgePercent <= defender.dexterity*5){
            logs.push(defender.name+" Dodge!")
            dodge = true;
        }
        if(dubleDamagePercent <= attacker.intelligence && !dodge){
            logs.push(attacker.name+" Crit!")
            dubleDamage=true;
        }

        if(!dodge) {
            let damage = dubleDamage ? attacker.strength*2 : attacker.strength;
            await defender.damage(damage);

            logs.push(`${defender.name} gets ${damage} from ${attacker.name}`);
        }
        logs.push(`${defender.name} hp:${defender.hp}`)

        return logs;
    }

    public async fight():Promise<string[][]>{
        const logs:string[][] = [];
        const Warrior1:WarriorRecord = this.Warrior1
        const Warrior2:WarriorRecord = this.Warrior2

        let winner:string = '';
        if(Warrior1.hp<1||Warrior2.hp<1)return [['At least warrior is death!']];
        let warriorRound:1|2 = 1;

        while(!winner){
            if(warriorRound === 1){
                logs.push(await this.attack(Warrior1,Warrior2));
            }else{
                logs.push(await this.attack(Warrior2,Warrior1));
            }

            warriorRound === 1 ? warriorRound = 2 : warriorRound = 1;
            if(Warrior1.hp<1||Warrior2.hp<1)winner = Warrior1.hp > Warrior2.hp ? Warrior1.name:Warrior2.name;
        }
        logs.push([`Winner : ${winner}`]);

        const allLogs:string[][] = logs.map(e=>e)

        return allLogs;
    }


}