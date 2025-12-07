const sequelize = require('../config/database');
const Task = require('./task');
const User = require('./user');

// export models and sequelize for easy import
module.exports = {
    sequelize,
    Task,
    User
};
