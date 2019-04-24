const bodyParser = require('body-parser');
const express = require('express');
const itemsController = require('./api/controllers/items.controller');
const config = require('./config/config.json').development;

const app = express();
app.use(bodyParser.json());
//Habilitar request cross-domain
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
 });
app.use('/api', itemsController);
app.listen(process.env.PORT || 3000, () => console.log('Ok...'));
