const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('settings_preferences', {
    preferenceID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userID'
      },
      unique: "settings_preferences_ibfk_1"
    },
    lightDarkMode: {
      type: DataTypes.ENUM('light','dark'),
      allowNull: false,
      defaultValue: "light"
    },
    notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "English"
    }
  }, {
    sequelize,
    tableName: 'settings_preferences',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "preferenceID" },
        ]
      },
      {
        name: "userID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });
};
