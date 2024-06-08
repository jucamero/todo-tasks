var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

let environment = null;

if (!process.env.ON_CLOUD) {
    console.log("Cargando variables de entorno desde archivo");
    const env = require('node-env-file');
    env(__dirname + '/.env');
}

environment = {
    DBMONGOUSER: process.env.DBMONGOUSER,
    DBMONGOPASS: process.env.DBMONGOPASS,
    DBMONGOSERV: process.env.DBMONGOSERV,
    DBMONGO: process.env.DBMONGO,
};

var query = 'mongodb+srv://' + environment.DBMONGOUSER + ':' + environment.DBMONGOPASS + '@' + environment.DBMONGOSERV + '/' + environment.DBMONGO + '?retryWrites=true&w=majority&appName=jucamero';

//Este enlace de abajo se elimina, porque se reemplaza con las variables del arcivho .env
//var query = "mongodb+srv://Camiprueba:1234@jucamero.nplga8r.mongodb.net/taskBD?retryWrites=true&w=majority&appName=jucamero"


const db = (query);

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    } else {
        console.log("Se ha conectado con la base de datos exitosamente");
    }
});

module.exports = router;