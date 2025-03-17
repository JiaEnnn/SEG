const db = require('../connectDB'),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const initModels = require('../model/init-models');

const models = initModels(sequelize);
const User = models.users;
const PreserveUser = models.preserveuser;
const Event = models.events;
  
module.exports = {
    User,
    PreserveUser,
    Event
};