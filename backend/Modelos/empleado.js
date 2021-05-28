const Sequelize = require('sequelize');
const db = require("../database/db")

  var Empleado= db.sequelize.define('empleados', {
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
      allowNull: false,
      unique: true
    },
    telefono: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
  },{});
module.exports=Empleado

