const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facilities', {
    facilitiesID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('toilet','lift','emergency exit'),
      allowNull: false
    },
    building_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    floor_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    x_coordinate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    y_coordinate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'facilities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "facilitiesID" },
        ]
      },
    ]
  });
};
