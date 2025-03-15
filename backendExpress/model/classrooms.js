const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classrooms', {
    classroomID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    room_number: {
      type: DataTypes.STRING(50),
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
    },
    room_type: {
      type: DataTypes.ENUM('lecture hall','lab','office'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'classrooms',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "classroomID" },
        ]
      },
    ]
  });
};
