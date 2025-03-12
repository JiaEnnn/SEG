const DataTypes = require("sequelize").DataTypes;
const _preserveuser = require("./PreserveUser");
const _user = require('./User');
const _usertype = require('./UserType');

function initModels(sequelize) {
  const preserveuser = _preserveuser(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);
  const usertype = _usertype(sequelize, DataTypes);

  preserveuser.belongsTo(user, { foreignKey: "userID"});
  user.hasOne(preserveuser, { foreignKey: "userID"});

  user.belongsTo(usertype, { foreignKey: "userTypeID"});
  usertype.hasMany(user, { foreignKey: "userTypeID"});

  return {
    preserveuser,
    user,
    usertype
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;