const Sequelize = require('sequelize');
const db = require("../database/db")
var Reparacion = db.sequelize.define('reparaciones', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    fecha_inicio: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    fecha_fin: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    idVehiculo:{
      type : Sequelize.INTEGER,
      reference: "vehiculos",
      referencesKey: "id"
    }
    
  },{});
  Reparacion.associate = modelos => {
    Reparacion.belongsTo(modelos.Vehiculo, {
        foreignKey: {
            name: "idVehiculo",
            allowNull: false,
            onDelete: 'cascade',
            onUpdate: 'cascade'
        }
    });
};
module.exports=Reparacion

