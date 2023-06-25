import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";

type results = [WarriorRecord[],FieldPacket[]]

export class WarriorRecord {
    private id?:string
    private name:string
    private hp:number
    private strength:number
    private intelligence:number
    private dexterity:number

    constructor(obj:WarriorRecord) {

        if (!obj.name || obj.name.length < 3 || obj.name.length > 20) {
            throw new Error('Imię musi mieć od 3 do 20 znaków.');
        }

        this.id = obj.id
        this.name = obj.name
        this.hp = obj.hp
        this.strength = obj.strength
        this.intelligence = obj.intelligence
        this.dexterity= obj.dexterity
    }

    static async getOne(id:string):Promise<WarriorRecord | null>{

        const [results] = await pool.execute("SELECT * FROM `wojownicy` WHERE `id` = :id", {
            id,
        }) as results

        return results.length === 0 ? null : new WarriorRecord(results[0]);
    }

    static async listAll():Promise<WarriorRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `wojownicy` ORDER BY `name` ASC")) as results;

        return results.map(obj => new WarriorRecord(obj));
    }

}