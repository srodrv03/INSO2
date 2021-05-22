const Sequelize = require('sequelize');
const db = require("../database/db")
var Factura= db.sequelize.define('facturas', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    createdAt: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    materiales:{
      type : Sequelize.DECIMAL(6,2),
      allowNull: true
    },
    impuesto: {
      type : Sequelize.DECIMAL(6,2),
      allowNull: true
    },
    manoObra:{
      type : Sequelize.DECIMAL(6,2),
      allowNull: true

    },
    total: {
      type : Sequelize.DECIMAL(6,2),
      allowNull: true
    }
  }, {});

module.exports=Factura
