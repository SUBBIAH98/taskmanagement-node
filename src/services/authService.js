const {
    createUser,
    findOneUser,
    findAndUpdateUser,
    deleteUser
} = require('../models/user');

const bcrypt = require('bcryptjs');

/**
 * Login user by email
 */
async function loginUser({ email, password }) {
    const user = await findOneUser({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
}

/**
 * Register a new user
 */
async function registerUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return createUser({
        ...data,
        password: hashedPassword
    });
}

/**
 * Get user by email
 */
async function getUserByEmail(email) {
    return findOneUser({ email });
}

/**
 * Get user by ID
 */
async function getUserById(id) {
    return findOneUser({ id });
}

/**
 * Update user by filters
 */
async function updateUser(filters, updates) {
    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
    }

    return findAndUpdateUser(filters, updates);
}

/**
 * Delete user
 */
async function removeUser(filters) {
    return deleteUser(filters);
}

module.exports = {
    loginUser,
    registerUser,
    getUserByEmail,
    getUserById,
    updateUser,
    removeUser
};
