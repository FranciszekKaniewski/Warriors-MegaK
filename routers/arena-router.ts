import {Router} from 'express'
import {WarriorRecord} from "../records/warrior-record";

export const arenaRouter = Router();

arenaRouter
    .get('/',async (req,res)=>{
        const WarriorsList = await WarriorRecord.listAll();

        res.render('pages/arena', {
            WarriorsList,
        });
    })