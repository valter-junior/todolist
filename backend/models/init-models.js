var DataTypes = require("sequelize").DataTypes;
var _list = require("./list");
var _todo = require("./todo");

function initModels(sequelize) {
  var list = _list(sequelize, DataTypes);
  var todo = _todo(sequelize, DataTypes);


  return {
    list,
    todo,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
