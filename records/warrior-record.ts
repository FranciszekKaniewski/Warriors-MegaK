import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";

type results = [WarriorRecord[],FieldPacket[]]

interface EO{
    id?:string;
    name:string;
    hp:number;
    strength:number;
    intelligence:number;
    dexterity:number;
}

export class WarriorRecord implements EO{
    public id?:string;
    public name:string;
    public hp:number;
    public strength:number;
    public intelligence:number;
    public dexterity:number;

    constructor(obj:EO) {

        if (!obj.name || obj.name.length < 3 || obj.name.length > 20) {
            throw new Error('Imię musi mieć od 3 do 20 znaków.');
        }

        this.id = obj.id ?? uuid();
        this.name = obj.name;
        this.hp = obj.hp;
        this.strength = obj.strength;
        this.intelligence = obj.intelligence;
        this.dexterity= obj.dexterity;
    };

    static async listAll():Promise<WarriorRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `wojownicy` ORDER BY `name` ASC")) as results;

        return results.map(obj => new WarriorRecord(obj));
    }

    static async getOne(id:string):Promise<WarriorRecord | null>{
        const [results] = await pool.execute(
            "SELECT * FROM `wojownicy` WHERE `wojownicy`.`id` = :id",
            {
            id,
        }) as results

        return results.length === 0 ? null : new WarriorRecord(results[0]);
    }

    static async deleteOne(id:string):Promise<void>{
        await pool.execute("DELETE FROM wojownicy WHERE `id` = :id",{
            id,
        });
    }

    async insert():Promise<string> {

        await pool.execute(
            "INSERT INTO `wojownicy`(`id`, `name`, `hp`, `strength`, `intelligence`, `dexterity`, `wins`, `loses`) VALUES (:id, :name, :hp, strength, :intelligence, :dexterity, 0,0)"
            , {
            id: this.id,
            name: this.name,
            hp: this.hp,
            strength: this.strength,
            intelligence: this.intelligence,
            dexterity: this.dexterity,
        });

        return this.id;
    }
}