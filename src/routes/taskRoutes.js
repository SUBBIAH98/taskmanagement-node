const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

// Middleware
const { authenticateToken } = require('../middleware/authMiddleware');

// Joi validations
const {
    validateTaskCreate,
    validateTaskUpdate,
    validateTaskPatchUpdate
} = require("../validations/taskValidation");

/**
 * POST /tasks 
 * Create task for logged-in user
 */
router.post('/', authenticateToken, validateTaskCreate, taskController.createTask);

/**
 * GET /tasks
 * Get all tasks (pagination + filters + sorting)
 */
router.get('/', authenticateToken, taskController.listTasks);

/**
 * GET /tasks/:id
 * Get single task by ID
 */
router.get('/:id', authenticateToken, taskController.getTask);

/**
 * PUT /tasks/:id
 * Update task (title, description, priority, status)
 */
router.put('/:id', authenticateToken, validateTaskUpdate, taskController.updateTask);


router.patch('/:id', authenticateToken, validateTaskPatchUpdate, taskController.updateTask);

/**
 * DELETE /tasks/:id
 * Delete task
 */
router.delete('/:id', authenticateToken, taskController.removeTask);

module.exports = router;
