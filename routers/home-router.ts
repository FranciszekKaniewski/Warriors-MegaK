import {Router} from 'express'
import {WarriorRecord} from "../records/warrior-record";

export const homeRouter = Router();

homeRouter
    .get('/',async (req,res)=>{
        const WarriorsList = await WarriorRecord.listAll();

        res.render('pages/home', {
            WarriorsList,
        });
    })
    .post('/add',async (req,res)=>{
        const newWarrior = new WarriorRecord(req.body);
        const newWarriorId = await newWarrior.insert();
        console.log(newWarriorId)
    })
    .delete('/delete',async (req,res)=>{
        const allRecords = await WarriorRecord.listAll();
        const requestedName = req.body.name
        allRecords.forEach(e=>{
            if(e.name === requestedName){
                WarriorRecord.deleteOne(e.id);
                console.log(e.id,'Deleted from Db!')
            };
        })
    })