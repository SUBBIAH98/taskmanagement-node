const Joi = require('joi');

/**
 * Schema for CREATE Task
 * -> Required fields only for create
 */
const taskCreateSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required'
    }),

    description: Joi.string().allow('', null),

    priority: Joi.string()
        .valid('Low', 'Medium', 'High')
        .default('Low')
        .messages({
            'any.only': 'Priority must be Low, Medium, or High'
        }),

    status: Joi.string()
        .valid('Pending', 'In Progress', 'Done')
        .default('Pending')
        .messages({
            'any.only': 'Status must be Pending, In Progress, or Done'
        })
});

/**
 * Schema for UPDATE Task
 * -> All fields optional, but 1 field required
 */
const taskUpdateSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200).optional(),

    description: Joi.string().allow('', null).optional(),

    priority: Joi.string()
        .valid('Low', 'Medium', 'High')
        .optional(),

    status: Joi.string()
        .valid('Pending', 'In Progress', 'Done')
        .optional()
}).min(1);

const taskPatchSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200).optional(),

    description: Joi.string().allow('', null).optional(),

    priority: Joi.string()
        .valid('Low', 'Medium', 'High')
        .optional(),

    status: Joi.string()
        .valid('Pending', 'In Progress', 'Done')
        .optional()
})
.min(1);  // 🔥 ensures at least one field is updated

/**
 * Middleware wrapper
 */
const validateTask = (schema) => {
    return (req, res, next) => {
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
    validateTaskCreate: validateTask(taskCreateSchema),
    validateTaskUpdate: validateTask(taskUpdateSchema),
    validateTaskPatchUpdate: validateTask(taskPatchSchema)
};
