var express = require('express');
var app = express();




const db = require("./database/db")

db.sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.listen(3000, function () {
    console.log('¡Aplicación escuchando en el puerto 3000!');
});