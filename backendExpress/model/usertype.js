const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usertype', {
    userTypeID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userTypeName: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usertype',
    timestamps: false
  });
};
