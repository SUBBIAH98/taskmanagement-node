const TaskService = require('../services/taskService');
const taskService = new TaskService(); // create instance of your service

module.exports = {
    // CREATE a new task
    createTask: async (req, res) => {
        try {
            const userId = req.user.id;
            const created = await taskService.createTaskData({...req.body, userId});
            res.status(201).json({ data: created });
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // GET all tasks with filtering, pagination, search, sorting
    listTasks: async (req, res) => {
        try {
            const { page, limit, status, priority, sortBy, order, search } = req.query;
            const userId = req.user.id;

            const result = await taskService.getAllTasks({
                userId,
                page,
                limit,
                status,
                priority,
                sortBy,
                order,
                search
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // GET a single task by ID
    getTask: async (req, res) => {
        try {
            const id = req.params.id;
            const userId = req.user.id;
            const task = await taskService.getTaskById(id, userId);

            if (!task) return res.status(404).json({ message: 'Task not found' });

            res.status(200).json({ data: task });
        } catch (error) {
            console.error('Error fetching task:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // UPDATE task by ID
    updateTask: async (req, res) => {
        try {
            const id = req.params.id;
            const userId = req.user.id;
            const updated = await taskService.updateTask(id, req.body, userId);

            if (!updated) return res.status(404).json({ message: 'Task not found' });

            res.status(200).json({ data: updated });
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // DELETE task by ID
    removeTask: async (req, res) => {
        try {
            const id = req.params.id;
            const userId = req.user.id;
            const deleted = await taskService.deleteTask(id, userId);

            if (!deleted) return res.status(404).json({ message: 'Task not found' });

            res.status(200).json({ message: 'Deleted successfully' });
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(400).json({ message: error.message });
        }
    }
};
