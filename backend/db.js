var Sequelize = require("sequelize")

var sequelize = new Sequelize('todolist', 'postgres', 'postgres', {
  dialect: 'postgres'
});

module.exports = sequelize;