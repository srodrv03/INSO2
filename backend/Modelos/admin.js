const Sequelize = require('sequelize');
const db = require("../database/db")
module.exports = function(sequelize) {
  const admin= db.sequelize.define('admin', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: true
    }},{
      sequelize,
      tableName: 'admin',
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
  return admin
}