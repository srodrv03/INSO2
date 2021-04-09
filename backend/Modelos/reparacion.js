const Sequelize = require('sequelize');
const db = require("../database/db")
module.exports = function(sequelize) {
  return db.sequelize.define('reparacion', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: Sequelize.STRING(100),
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
    id_vehiculo: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'vehiculo',
        key: 'id'
      }
    },
    id_empleado: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'empleado',
        key: 'id'
      }
    },
    id_estado: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'estado',
        key: 'id'
      }
    },
    id_reparacion: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria_reparacion',
        key: 'id'
      }
    },
    id_factura: {
      type: Sequelize.INTEGER,
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
