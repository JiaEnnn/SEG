const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buildings', {
    buildingID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    building_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "building_name"
    },
    total_floors: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'buildings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "buildingID" },
        ]
      },
      {
        name: "building_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "building_name" },
        ]
      },
    ]
  });
};
