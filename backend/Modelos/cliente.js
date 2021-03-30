const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    apellido1: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    apellido2: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    apodo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DNI: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    localidad: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IBAN: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    usuario: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(50),
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
};
