const Sequelize = require('sequelize');
const db = require("../database/db")

var Comp_rep= db.sequelize.define('componente_reparaciones', {
    idComponente: {
        type : Sequelize.INTEGER,
        reference: "componentes",
        referencesKey: "id",
        primaryKey: true
    },
    idReparacion:{
      type : Sequelize.INTEGER,
      reference: "reparacion",
      referencesKey: "id",
      primaryKey: true
    }
  }, {}
);
module.exports=Comp_rep

