const DataTypes = require("sequelize").DataTypes;
const _preserveuser = require("../PreserveUser");
const _user = require('../User');

function initModels(sequelize) {
  const preserveuser = _preserveuser(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);

  preserveuser.belongsTo(user, { foreignKey: "userID"});
  user.hasOne(preserveuser, { foreignKey: "userID"});

  return {
    preserveuser,
    user
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;




/*const DataTypes = require("sequelize").DataTypes;
const _preserveuser = require("./PreserveUser");
const _staff = require("./staff");
const _admin = require("./admin");
const _students = require("./Students");
const _usertype = require("./UserType");

function initModels(sequelize) {
  const preserveuser = _preserveuser(sequelize, DataTypes);
  const staff = _staff(sequelize, DataTypes);
  const admin = _admin(sequelize, DataTypes);
  const students = _students(sequelize, DataTypes);
  const usertype = _usertype(sequelize, DataTypes);

  // PreserveUser can belong to staff, admin, or students
  preserveuser.belongsTo(staff, { foreignKey: "staffID" });
  staff.hasOne(preserveuser, { foreignKey: "staffID" });

  preserveuser.belongsTo(admin, { foreignKey: "adminID" });
  admin.hasOne(preserveuser, { foreignKey: "adminID" });

  preserveuser.belongsTo(students, { foreignKey: "studentID" });
  students.hasOne(preserveuser, { foreignKey: "studentID" });

  // Staff, Admin, and Students belong to UserType
  staff.belongsTo(usertype, { foreignKey: "userTypeID" });
  admin.belongsTo(usertype, { foreignKey: "userTypeID" });
  students.belongsTo(usertype, { foreignKey: "userTypeID" });

  // A single userType can be assigned to multiple Staff, Admin, and Students
  usertype.hasMany(staff, { foreignKey: "userTypeID" });
  usertype.hasMany(admin, { foreignKey: "userTypeID" });
  usertype.hasMany(students, { foreignKey: "userTypeID" });

  return {
    preserveuser,
    staff,
    admin,
    students,
    usertype,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;*/
