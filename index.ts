import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); //process.env
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/test', (req,res) => {
    res.send('hello world');
})

app.listen(process.env.PORT || 80, () => {
    console.log(`Server run to http://localhost:3000`);
})