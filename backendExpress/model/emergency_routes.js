const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emergency_routes', {
    emergencyID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    route_name: {
      type: DataTypes.STRING(255),
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
    start_x: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_y: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end_x: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    end_y: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'emergency_routes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emergencyID" },
        ]
      },
    ]
  });
};
