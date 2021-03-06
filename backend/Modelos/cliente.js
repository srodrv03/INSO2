const Sequelize = require('sequelize');
const db = require("../database/db")
var Cliente = db.sequelize.define('clientes', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    apellidos: {
      type: Sequelize.STRING(60),
      allowNull: true
    },
    DNI: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    telefono: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    localidad: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    direccion: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    pais: {
      type: Sequelize.STRING(45),
      allowNull: true
    },
    cp: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    IBAN: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    
    password: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
      default: new Date()
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
      default: new Date()
    },
  },{});
 
  module.exports=Cliente
