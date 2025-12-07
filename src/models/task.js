const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { User } = require("./user");

// Define Task model
const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Low'
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Done'),
        defaultValue: 'Pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
}, {
    tableName: 'tasks',
    timestamps: true
});

// ------------------- CRUD Helper Functions -------------------

const createTask = (values) => Task.create(values);

const findAllTasks = (dynamicFields = {}) => Task.findAll({
    where: dynamicFields,
    order: [['id', 'DESC']],
    include: [{ model: User, as: "user" }]
});

const findOneTask = (dynamicFields) => Task.findOne({
    where: dynamicFields,
    include: [{ model: User, as: "user" }]
});

const findAndUpdateTask = (filter, updateValues) =>
    Task.update(updateValues, { where: filter });

const deleteTask = (dynamicFields) =>
    Task.destroy({ where: dynamicFields });

// ------------------- Associations -------------------

User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "userId", as: "user" });

// Export
module.exports = {
    Task,
    createTask,
    findAllTasks,
    findOneTask,
    findAndUpdateTask,
    deleteTask
};
