const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize('inso2', 'inso2', 'A12345678.', {
    host: 'localhost',
    dialect: "mysql"
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  module.exports = db