const jwt = require('jsonwebtoken');
const authServices = require('../services/authService');

/**
 * Generate JWT token
 */
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

/**
 * Register controller
 */
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        // Check if user exists
        const existingUser = await authServices.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = await authServices.registerUser({ name, email, password });

        // Generate token
        const token = generateToken(newUser);

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Login controller
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authServices.loginUser({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login, register };
