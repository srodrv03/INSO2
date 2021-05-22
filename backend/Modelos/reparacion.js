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
    createdAt: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    updatedAt: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    estado:{
      type: Sequelize.STRING(45),
      allowNull:true
    },
    idVehiculo:{
      type : Sequelize.INTEGER,
      reference: "vehiculos",
      referencesKey: "id"
    },
    idEmpleado:{
      type : Sequelize.INTEGER,
      reference: "empleados",
      referencesKey: "id"
    },
    idFactura:{
      type : Sequelize.INTEGER,
      reference: "facturas",
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

