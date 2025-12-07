const {
    Task,
    createTask,
    findOneTask,
    findAndUpdateTask,
    deleteTask
} = require('../models/task');

const { Op } = require('sequelize');

module.exports = class TaskService {

    /**
     * Create a new task
     */
    async createTaskData(data) {
        try {
            return await createTask(data);
        } catch (error) {
            console.error('Error creating task:', error);
            throw new Error(error.message);
        }
    }

    /**
     * Get all tasks with:
     * - Pagination
     * - Filtering (status, priority)
     * - Sorting (priority, createdAt)
     */
    async getAllTasks({ userId, page = 1, limit = 10, status, priority, sortBy, order = 'DESC', search } = {}) {
        try {
            const offset = (Number(page) - 1) * Number(limit);
            const where = { userId };

            /** ------------------ FILTERING ------------------ **/
            if (status) where.status = status;
            if (priority) where.priority = priority;

            /** ------------------ SEARCH (optional) ------------------ **/
            if (search) {
                where[Op.or] = [
                    { title: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ];
            }

            /** ------------------ SORTING ------------------ **/
            let sortField = 'createdAt'; // default sorting
            if (sortBy === 'priority') sortField = 'priority';
            if (sortBy === 'createdAt') sortField = 'createdAt';

            const { count, rows } = await Task.findAndCountAll({
                where,
                limit: Number(limit),
                offset,
                order: [[sortField, order.toUpperCase()]]
            });

            return {
                total: count,
                page: Number(page),
                limit: Number(limit),
                data: rows
            };
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw new Error(error.message);
        }
    }

    /**
     * Get task by ID
     */
    async getTaskById(id, userId) {
        try {
            return await findOneTask({ id, userId });
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            throw new Error(error.message);
        }
    }

    /**
     * Update task
     */
    async updateTask(id, updates, userId) {
        try {
            const task = await findOneTask({ id, userId });
            if (!task) return null;

            if (updates.status === "In Progress") {

                // Check if another task of the same user is already "In Progress"
                const existingInProgress = await findOneTask({
                    userId,
                    status: "In Progress"
                });

                // If exists and it is NOT the same task
                if (existingInProgress && existingInProgress.id !== task.id) {
                    throw new Error("You already have a task in progress. Complete it before starting another one.");
                }
            }

            await findAndUpdateTask({ id, userId }, updates);

            return await findOneTask({ id, userId });
        } catch (error) {
            console.error('Error updating task:', error);
            throw new Error(error.message);
        }
    }

    /**
     * Delete task
     */
    async deleteTask(id, userId) {
        try {
            const task = await findOneTask({ id, userId });
            if (!task) return false;

            await deleteTask({ id, userId });
            return true;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw new Error(error.message);
        }
    }
};
