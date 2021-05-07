const Sequelize = require('sequelize');
const db = require("../database/db")
module.exports = function(sequelize) {
  vehiculo= db.sequelize.define('vehiculo', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    marca: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    modelo: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    matricula: {
      type: Sequelize.STRING(45),
      allowNull: false,
      primaryKey: true
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
  }, 
  
  {
    sequelize,
    tableName: 'vehiculo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  const cliente = require("./cliente")
  vehiculo.belongsTo(cliente(),{foreingKey: "clienteId",onDelete: 'cascade'})
  cliente().hasMany(vehiculo,{foreingKey: "clienteId", onDelete: 'cascade'})
  return vehiculo
};
