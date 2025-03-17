const Sequelize = require('sequelize');
const Model = require('./MyModel');

class PreserveUser extends Model {
  constructor() {
    super.constructor('userID');
  }
};

// Model Initialization
PreserveUser.initialise = (sequelize, DataTypes) => {
  PreserveUser.init({
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'admins', // Fixed: Changed from 'user' to 'admins'
        key: 'adminID'
      }
    }
  }, {
    sequelize,
    tableName: 'preserveuser',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });
};

module.exports = function (sequelize, DataTypes) {
  PreserveUser.initialise(sequelize, DataTypes);
  return PreserveUser;
};
