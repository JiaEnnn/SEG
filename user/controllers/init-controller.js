const db = require('../db/db.connect'),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const initModels = require('../models/init-models');

const models = initModels(sequelize);
const User = models.user;
const UserType = models.usertype;
const PreserveUser = models.preserveuser;
  
module.exports = {
    User,
    UserType,
    PreserveUser
};