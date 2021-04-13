const Sequelize = require('sequelize');
const db = require("../database/db")
module.exports = function(sequelize) {
  const cliente= db.sequelize.define('cliente', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    apellido1: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    apellido2: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    apodo: {
      type: Sequelize.STRING(20),
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
      type: Sequelize.STRING(20),
      allowNull: true
    },
    localidad: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    direccion: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    cp: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    IBAN: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    usuario: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cliente',
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
return cliente
};
