const Model = require('sequelize').Model;

class MyModel extends Model {
  static raw = true;

  // Getter Setter
  static getRaw() {
    return this.raw;
  };
  static setRaw (bool) {
    this.raw = bool;
  };

  // CRUD
  /**
   * @param {JSON} obj
   * @param {JSON} options
   */
  static async create(obj, options = {}) {
    options = setToJson(options);
    options.raw = this.raw;
    return await super.create(obj, options);
  }

  /**
   * @param {JSON} options
   */
  static async findAll(options = {}) {
    options = setToJson(options);
    options.raw = this.raw;
    return await super.findAll(options);
  }

  /**
   * @param {INTEGER} id
   * @param {JSON} options
   */
  // static async findByID(id, options = {}) {
  //   options = setToJson(options);
  //   options.raw = this.raw;
  //   return await super.findByPk(id, options);
  // }
  static async findByID(id, options = {}) {
    options = setToJson(options);
    options.raw = this.raw;
    const json = {};
    json[Model.primaryKeyAttribute] = id;
    return await super.findOne(json);
  }

  /**
   * @param {JSON} values
   * @param {JSON} options
   */
  static async update(values, options = {}) {
    options = setToJson(options);
    options.raw = this.raw;
    return await super.update(values, options);
  }

  /**
   * Update multiple instances by id
   * @param {INTEGER} id
   * @param {JSON} values
   */
  static async updateByID(id, values) {
    const json = {};
    json[Model.primaryKeyAttribute] = id;
    const options = { where: json };
    return await this.update(values, options);
  }

  /**
   * Delete multiple instances
   * @param {JSON} options
   * @returns Promise The number of destroyed rows
   */
  static async delete(options = {}) {
    options = setToJson(options);
    options.raw = this.raw;
    return await super.destroy(options);
  }

  /**
   * Delete by id (prevent deletion if in preserveuser)
   * @param {INTEGER} id
   * @returns Promise The number of destroyed rows
   */
  static async deleteByID(id) {
    const json = {};
    json[this.primaryKeyAttribute] = id;
    const options = { where: json };
    return await this.delete(options);
  }
};


// insert empty json if it was null or undefined 
function setToJson(obj) {
  return (obj == null || obj == undefined)? {} : obj;
}
module.exports = MyModel;