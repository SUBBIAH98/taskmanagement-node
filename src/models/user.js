const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

// ------------------- CRUD Helper Functions -------------------

const createUser = (values) => User.create(values);

const findAllUsers = (dynamicFields = {}) => User.findAll({
    where: dynamicFields,
    order: [['id', 'DESC']]
});

const findOneUser = (dynamicFields) => User.findOne({ where: dynamicFields });

const findAndUpdateUser = (filter, updateValues) =>
    User.update(updateValues, { where: filter });

const deleteUser = (dynamicFields) =>
    User.destroy({ where: dynamicFields });

// Export
module.exports = {
    User,
    createUser,
    findAllUsers,
    findOneUser,
    findAndUpdateUser,
    deleteUser
};
