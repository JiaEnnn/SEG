const Sequelize = require('sequelize');
const Model = require('./MyModel');

class EventOrg extends Model {};

EventOrg.initialise = (sequelize, DataTypes) => {
  EventOrg.init({
    eventOrgID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'eventorg',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "eventOrgID" },
        ]
      },
    ]
  });
};
module.exports = function(sequelize, DataTypes) {
  EventOrg.initialise(sequelize, DataTypes);
  return EventOrg;
};
