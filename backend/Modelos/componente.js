const Sequelize = require('sequelize');
const db = require("../database/db")

var Componente= db.sequelize.define('componentes', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    idProveedor:{
      type : Sequelize.INTEGER,
      reference: "proveedor",
      referencesKey: "id"
    },
    precio:{
      type : Sequelize.DECIMAL(6,2),
      allowNull: true
    },
  }, {}
);
module.exports=Componente

