const Sequelize = require('sequelize');
const db = require("../database/db")

var Componente= db.sequelize.define('componentes', {
    id: {
      type: Sequelize.INTEGER,
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
  }, {}
);
module.exports=Componente

