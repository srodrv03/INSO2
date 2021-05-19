var express = require('express');
const Sequelize = require('sequelize');
const Cliente = require("./Modelos/cliente")
var app = express();
const db = require("./database/db")
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}))
// parse application/json
app.use(bodyParser.json())

db.sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});


app.use('/clientes', require('./Rutas/Clientes')); 
app.use('/empleados', require('./Rutas/Empleados')); 
app.use('/vehiculos', require('./Rutas/Vehiculos')); 
app.use('/reparaciones', require('./Rutas/Reparaciones')); 
app.use('/proveedores', require('./Rutas/Proveedores')); 


app.listen(3000, function () {
  console.log('¡Aplicación escuchando en el puerto 3000!');
});