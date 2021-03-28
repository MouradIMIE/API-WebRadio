import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";


config(); //process.env
const app = express();

//avoir accès à la connexion de la BD
global = require('./src/db/dbConnect');

//Chargement du dossier public
const www = process.env.WWW || './public';
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(www));
app.use(bodyParser.urlencoded({ extended: true }))
//Route par défaut
app.get('*', (req: any,res:any) => {
    res.sendFile(`index.html`, { root: www });
})

app.use((req:any, res:any, next:any) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header("x-access-token, Origin, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
app.listen(process.env.PORT || 80, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})