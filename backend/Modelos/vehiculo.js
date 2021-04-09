const Sequelize = require('sequelize');
const db = require("../database/db")
module.exports = function(sequelize) {
  return db.sequelize.define('vehiculo', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    marca: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    modelo: {
      type: Sequelize.STRING(50),
      allowNull: true
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
    id_cliente: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'id'
      }
    }
  }, {
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
      {
        name: "vehiculos_cliente_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
};
