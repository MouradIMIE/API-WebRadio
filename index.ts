const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require("cors"),
    multer = require('multer'),
    fs = require('fs'),
    path = require('path'),
    route = require('./src/routes');

global.db = require('./src/models');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header("x-access-token, Origin, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

const port = process.env.PORT || 5000;
const www = process.env.WWW || './public';


app.use(cors());
// Middelware
app.use(bodyParser.json());

app.use(express.static(www));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(route); // charger nos différentes routes

// Route par defaut
app.get('*', (req: any, res: any) => {
    res.sendFile(`index.html`, { root: www });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));