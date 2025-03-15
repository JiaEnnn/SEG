const db = require('./connectDB'),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const initModels = require('./model/init-models');

const models = initModels(sequelize);
const User = models.users;
const PreserveUser = models.preserveuser;
  
module.exports = {
    User,
    PreserveUser,
};