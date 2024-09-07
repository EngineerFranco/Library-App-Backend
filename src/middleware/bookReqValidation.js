import { body, param, query, validationResult } from 'express-validator';

// Add book validations
export const addValidations = () => [
    body('title')
        .isString().withMessage('Title must be a string')
        .notEmpty().withMessage('Title is required'),
    body('author')
        .isString().withMessage('Author must be a string')
        .notEmpty().withMessage('Author is required'),
    body('sypnosis')
        .custom(value => {
            if (value === undefined || value === null) {
                throw new Error('Sypnosis is required');
            }
            if (typeof value !== 'string') {
                throw new Error('Sypnosis must be a string');
            }
            return true;
        }),
    body('link')
        .custom(value => {
            if (value === undefined || value === null) {
                throw new Error('Link is required');
            }
            if (typeof value !== 'string') {
                throw new Error('Link must be a string');
            }
            if (value && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
                throw new Error('Link must be a valid URL');
            }
            return true;
        })
];

// Update book validations
export const updateValidations = () => [
    param('id')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
    body('title')
        .optional()
        .isString().withMessage('Title must be a string'),
    body('author')
        .optional()
        .isString().withMessage('Author must be a string'),
    body('sypnosis')
        .optional()
        .custom(value => {
            if (value !== undefined && value !== null && typeof value !== 'string') {
                throw new Error('Sypnosis must be a string');
            }
            return true;
        }),
    body('link')
        .optional()
        .custom(value => {
            if (value !== undefined && value !== null && typeof value !== 'string') {
                throw new Error('Link must be a string');
            }
            if (value && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
                throw new Error('Link must be a valid URL');
            }
            return true;
        })
];

// Get book validations
export const getValidations = () => [
    param('id')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
];

// Delete book validations
export const deleteValidations = () => [
    param('id')
        .isInt({ gt: 0 }).withMessage('ID must be a positive integer')
];

// Search book validations
export const searchValidations = () => [
    query('title')
        .optional()
        .isString().withMessage('Title must be a string')
        .trim().escape() 
        .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),
    query('author')
        .optional()
        .isString().withMessage('Author must be a string')
        .trim().escape()
        .isLength({ max: 100 }).withMessage('Author must not exceed 100 characters'),
    query().custom((value, { req }) => {
        if (!req.query.title && !req.query.author) {
            throw new Error('At least one of "title" or "author" must be provided');
        }
        return true;
    })
];

// Middleware to handle validation errors
export const validateBookReq = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
