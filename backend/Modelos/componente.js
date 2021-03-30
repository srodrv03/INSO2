const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('componente', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_reparacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'reparacion',
        key: 'id'
      }
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria_componente',
        key: 'id'
      }
    },
    id_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proveedor',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'componente',
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
        name: "componentes_categoria_componente_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_categoria" },
        ]
      },
      {
        name: "componentes_reparacion_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_reparacion" },
        ]
      },
      {
        name: "componentes_proveedor_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_proveedor" },
        ]
      },
    ]
  });
};
