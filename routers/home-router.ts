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