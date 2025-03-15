var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _buildings = require("./buildings");
var _classrooms = require("./classrooms");
var _emergency_routes = require("./emergency_routes");
var _facilities = require("./facilities");
var _preserveuser = require("./preserveuser");
var _search_history = require("./search_history");
var _settings_preferences = require("./settings_preferences");
var _settings_profile = require("./settings_profile");
var _staff = require("./staff");
var _students = require("./students");
var _users = require("./users");
var _usertype = require("./usertype");

function initModels(sequelize) {
  var admins = _admins(sequelize, DataTypes);
  var buildings = _buildings(sequelize, DataTypes);
  var classrooms = _classrooms(sequelize, DataTypes);
  var emergency_routes = _emergency_routes(sequelize, DataTypes);
  var facilities = _facilities(sequelize, DataTypes);
  var preserveuser = _preserveuser(sequelize, DataTypes);
  var search_history = _search_history(sequelize, DataTypes);
  var settings_preferences = _settings_preferences(sequelize, DataTypes);
  var settings_profile = _settings_profile(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var students = _students(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var usertype = _usertype(sequelize, DataTypes);

  preserveuser.belongsTo(admins, { as: "user", foreignKey: "userID"});
  admins.hasOne(preserveuser, { as: "preserveuser", foreignKey: "userID"});
  admins.belongsTo(users, { as: "user", foreignKey: "userID"});
  users.hasOne(admins, { as: "admin", foreignKey: "userID"});
  search_history.belongsTo(users, { as: "user", foreignKey: "userID"});
  users.hasMany(search_history, { as: "search_histories", foreignKey: "userID"});
  settings_preferences.belongsTo(users, { as: "user", foreignKey: "userID"});
  users.hasOne(settings_preferences, { as: "settings_preference", foreignKey: "userID"});
  settings_profile.belongsTo(users, { as: "user", foreignKey: "userID"});
  users.hasOne(settings_profile, { as: "settings_profile", foreignKey: "userID"});
  staff.belongsTo(users, { as: "user", foreignKey: "userID"});
  users.hasOne(staff, { as: "staff", foreignKey: "userID"});
  students.belongsTo(users, { as: "user", foreignKey: "userID"});
  users.hasOne(students, { as: "student", foreignKey: "userID"});

  return {
    admins,
    buildings,
    classrooms,
    emergency_routes,
    facilities,
    preserveuser,
    search_history,
    settings_preferences,
    settings_profile,
    staff,
    students,
    users,
    usertype,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
