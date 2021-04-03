import bodyParser from "body-parser";
import { config } from "dotenv";
import mongoose from "mongoose"; 
import express from "express";
import cors from "cors";


config(); //process.env
const PORT  = process.env.PORT || 80;
const app = express();
//Connexion à la base de données
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterwebradio.fb0mk.mongodb.net/WebradioData?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
// Connexion à la base de donnée sur mongoCloud
mongoose.connection.on('connected', (err: any) => {
  if (err) {
    if(err) throw err;
  } else {
    console.log('MongoDB cloud is running...');
  }
});



//Chargement du dossier public
const www = process.env.WWW || "./public";
app.use(cors());
app.use(bodyParser.json());
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
app.listen(PORT, () => {
    console.log(`Server run to http://localhost:${PORT}`);
})