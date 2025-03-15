var DataTypes = require("sequelize").DataTypes;
var _eventorg = require("./eventorg");

function initModels(sequelize) {
  var eventorg = _eventorg(sequelize, DataTypes);


  return {
    eventorg,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
