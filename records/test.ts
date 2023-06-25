import {WarriorRecord} from "./warrior-record";

(async ()=> {
    const warriors = await WarriorRecord.listAll()
    console.log(warriors)
})()
