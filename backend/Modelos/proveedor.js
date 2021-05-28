const Sequelize = require('sequelize');
const db = require("../database/db")

var Proveedor = db.sequelize.define('proveedores', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  telefono: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  direccion: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  cp: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  localidad: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {});
module.exports = Proveedor
