import {WarriorRecord} from "./warrior-record";
import {Arena} from './../utils/arena'

(async ()=> {

    const Warrior1 = await WarriorRecord.getOne('4a65c3e8-ca4e-4d29-9ec0-77809949')
    const Warrior2 = await WarriorRecord.getOne('c60939c1-503b-43ca-9c7f-acb136a3')
    const arena = new Arena([Warrior1,Warrior2])
    // console.log(Warrior1,Warrior2)
    console.log(await arena.fight())
    //List all
    // const allWarriors = await WarriorRecord.listAll();
    // console.log(allWarriors);

    //Insert one
    // const newWarrior = new WarriorRecord({name: "Name", hp: 0, intelligence: 0, strength: 0, dexterity: 0})
    // console.log(newWarrior);
    // const newObjId = await newWarrior.insert();

    //Get one
    // const oneWarrior = await WarriorRecord.getOne(newObjId);
    // console.log(oneWarrior)

    //Delete one
    // await WarriorRecord.deleteOne(newObjId);

    // await WarriorRecord.listAll().map(e=>console.log(e))


})()
