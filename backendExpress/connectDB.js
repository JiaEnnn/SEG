'use strict';

require('dotenv').config();
const { Sequelize } = require("sequelize");
const DB_CONFIG = require("./db.config");

// Initialize Sequelize connection
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Database Name
    process.env.DB_USER,      // Username
    process.env.DB_PASSWORD,  // Password
    {
        host: process.env.DB_HOST,
        dialect: DB_CONFIG.dialect,
        operatorsAliases: false,
        pool: {
          max: DB_CONFIG.pool.max,
          min: DB_CONFIG.pool.min,
          acquire: DB_CONFIG.pool.acquire,
          idle: DB_CONFIG.pool.idle,
        },
      }
    );
    
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch(err => {
        console.error("Unable to connect to the database: ", err);
      });
    
    const db = {};
    
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    
    module.exports = db;