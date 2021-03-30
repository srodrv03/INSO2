const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reparacion', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vehiculo',
        key: 'id'
      }
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empleado',
        key: 'id'
      }
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'estado',
        key: 'id'
      }
    },
    id_reparacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria_reparacion',
        key: 'id'
      }
    },
    id_factura: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'factura',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'reparacion',
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
        name: "reparacion_vehiculos_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_vehiculo" },
        ]
      },
      {
        name: "reparacion_empleado_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_empleado" },
        ]
      },
      {
        name: "reparacion_estado_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_estado" },
        ]
      },
      {
        name: "reparacion_categoria_reparacion_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_reparacion" },
        ]
      },
      {
        name: "reparacion_factura_id_fk",
        using: "BTREE",
        fields: [
          { name: "id_factura" },
        ]
      },
    ]
  });
};
