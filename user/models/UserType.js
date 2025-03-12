const {Model} = require('sequelize');

class UserType extends Model {
  static raw = true;
  
  // CRUD
  /**
   * @param {JSON} userType
   * @param {JSON} options
   */
  static async create(userType, options={}) {
    options.raw = this.raw;
    return await super.create(userType, options);
  };
  /**
   * @param {JSON} options
   */
  static async findAll(options={}) {
    options.raw = this.raw;
    return await super.findAll(options);
  };
  /**
   * @param {INTEGER} id
   * @param {JSON} options
   */
  static async findByID(id, options={}) {
    options.raw = this.raw;
    return await super.findByPk(id, options);
  };
   /**
   * Search for multiple instances with an email address
   * @param {String} email
   */
  static async findByEmail(email) {
    const options = {where: {email: email}};
    return await this.findAll(options);
  };
   /**
   * @param {JSON} values
   * @param {JSON} options
   */
  static async update(values, options={}) {
    options.raw = this.raw;
    return await super.update(values, options);
  };
   /**
   * Update multiple instances by id 
   * @param {INTEGER} id
   * @param {JSON} values
   */
  static async updateByID(id, values) {
    const options = {where:{ userID: id}};
    return await this.update(values, options);
  };
  /**
  * Delete multiple instances
  * @param {JSON} options
  * @returns Promise The number of destroyed rows
  */
  static async delete(options={}) {
    options.raw = this.raw;
    return await super.destroy(options);
  };
  /**
  * Delete by id
  * @param {INTEGER} id
  * @returns Promise The number of destroyed rows
  */
  static async deleteByID(id) {
    const options = {where: {userID: id}};
    return await this.delete(options);
  };
};

UserType.initialise = (sequelize, DataTypes) => {
  UserType.init({
    userTypeID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usertype',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userTypeID" },
        ]
      },
    ]
  });
};

module.exports = function(sequelize, DataTypes) {
  UserType.initialise(sequelize, DataTypes);
  return UserType;
};