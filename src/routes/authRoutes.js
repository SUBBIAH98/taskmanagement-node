const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Joi validations
const { validateRegister, validateLogin } = require("../validations/authValidation");

/**
 * POST /users/register
 * Register new user
 */
router.post('/register', validateRegister, authController.register);

/**
 * POST /users/login
 * Login to get JWT token
 */
router.post('/login', validateLogin, authController.login);

module.exports = router;
