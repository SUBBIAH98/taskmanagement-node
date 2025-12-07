const jwt = require('jsonwebtoken');
const User = require('../models/user'); // update path if needed

/**
 * Authenticate user using JWT
 */
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // fetch user from DB
        const user = await User.findOneUser({id: decoded.id});

        if (!user) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // attach authenticated user to request
        req.user = {
            id: user.id,
            email: user.email,
            name: user.name
        };

        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authenticateToken
};
