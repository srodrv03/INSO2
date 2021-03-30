const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehiculo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    marca: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    modelo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    puertas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    motor: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
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
