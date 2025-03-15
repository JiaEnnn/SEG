const { Model } = require('sequelize');

class PreserveUser extends Model {
  static raw = true;

  // CRUD
  /**
   * @param {JSON} obj
   * @param {JSON} options
   */
  static async create(obj, options = {}) {
    options.raw = this.raw;
    return await super.create(obj, options);
  }

  /**
   * @param {JSON} options
   */
  static async findAll(options = {}) {
    options.raw = this.raw;
    return await super.findAll(options);
  }

  /**
   * @param {INTEGER} id
   * @param {JSON} options
   */
  static async findByID(id, options = {}) {
    options.raw = this.raw;
    return await super.findByPk(id, options);
  }

  /**
   * @param {JSON} values
   * @param {JSON} options
   */
  static async update(values, options = {}) {
    options.raw = this.raw;
    return await super.update(values, options);
  }

  /**
   * Update multiple instances by id
   * @param {INTEGER} id
   * @param {JSON} values
   */
  static async updateByID(id, values) {
    const options = { where: { userID: id } };
    return await this.update(values, options);
  }

  /**
   * Delete multiple instances
   * @param {JSON} options
   * @returns Promise The number of destroyed rows
   */
  static async delete(options = {}) {
    options.raw = this.raw;
    return await super.destroy(options);
  }

  /**
   * Delete by id (prevent deletion if in preserveuser)
   * @param {INTEGER} id
   * @returns Promise The number of destroyed rows
   */
  static async deleteByID(id) {
    const preserved = await PreserveUser.findByPk(id);
    if (preserved) {
      throw new Error("This admin cannot be deleted.");
    }

    const options = { where: { userID: id } };
    return await this.delete(options);
  }
}

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
