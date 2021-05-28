const Sequelize = require('sequelize');
const db = require("../database/db")
var Vehiculo = db.sequelize.define('vehiculos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    matricula:{
      type: Sequelize.STRING(50),
      allowNull: false
    },
    marca: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    modelo: {
      type: Sequelize.STRING(50),
      allowNull: true
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
    clienteId:{
      type : Sequelize.INTEGER,
      reference: "cliente",
      referencesKey: "id"
    }
    
  },{});

  Vehiculo.associate = modelos =>{
    Vehiculo.hasMany(modelos.Reparacion,{
      onDelete: 'cascade',
    })
  }
  
  module.exports=Vehiculo
  