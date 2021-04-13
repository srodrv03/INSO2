const Sequelize = require('sequelize');
const db = require("../database/db")
module.exports = function(sequelize) {
  return db.sequelize.define('factura', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    impuesto: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    importe: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'factura',
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
