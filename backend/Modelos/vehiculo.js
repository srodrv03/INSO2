const Sequelize = require('sequelize');
const db = require("../database/db")
var Vehiculo = db.sequelize.define('vehiculos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    marca: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    modelo: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    matricula: {
      type: Sequelize.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    anio: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    color: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    puertas: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    motor: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
  },{});

  module.exports=Vehiculo
