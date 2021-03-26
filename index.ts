import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); //process.env
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log(`Server run to http://localhost:3000`);
})