const Sequelize = require('sequelize');
const db = require("../database/db")
module.exports = function(sequelize) {
  return db.sequelize.define('empleado', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
      allowNull: true
    },
    telefono: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    usuario: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'empleado',
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
};
