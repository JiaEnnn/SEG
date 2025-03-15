const { Sequelize } = require('sequelize');

// Replace with your database credentials
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,  // Set to true if you want to see raw SQL queries in logs
});

module.exports = sequelize;
