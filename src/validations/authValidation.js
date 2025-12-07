const Joi = require('joi');

/**
 * Joi schema for REGISTER validation
 */
const registerSchema = Joi.object({
    name: Joi.string().trim().min(1).max(100).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 1 character long',
        'any.required': 'Name is required'
    }),

    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),

    password: Joi.string().min(6).max(255).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});

/**
 * Joi schema for LOGIN validation
 */
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),

    password: Joi.string().min(6).max(255).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});

/**
 * Generic validator middleware
 */
const validateBody = (schema) => {
    return (req, res, next) => {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is required' });
        }
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path[0],
                message: detail.message
            }));
            return res.status(400).json({ errors });
        }

        next();
    };
};

module.exports = {
    validateRegister: validateBody(registerSchema),
    validateLogin: validateBody(loginSchema)
};
