import * as express from 'express'
import {engine} from 'express-handlebars'

import {homeRouter} from "./routers/home-router";

import './utils/db'

//App Settings
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({
    extended:true,
}));
app.engine('.hbs',engine({
    extname:'.hbs',
}))
app.set('view engine', '.hbs')

//Routes
app.use('/', homeRouter);

//App Start
app.listen(3000,'0.0.0.0',()=>{
    console.log('App working at http://localhost:3000')
})