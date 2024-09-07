// src/middleware/authValidation.js

import { body, validationResult } from 'express-validator';

// Validation rules for registration
export const registerValidationRules = () => [
    body('username')
        .isString().withMessage('Username must be a string')
        .isEmail().withMessage('Invalid email address')
        .trim()
        .normalizeEmail(),
    body('password')
        .isString().withMessage('Password must be a string')
        .exists().withMessage('Password is required')
        .notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long') // Adjust length as needed
        .isLength({ max: 20 }).withMessage('Password must be less than 20 characters long') // Adjust length as needed
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character')
        .trim(),
    body('role')
        .isString().withMessage('Role must be a string')
        .isIn(['admin', 'librarian', 'user']).withMessage('Invalid role')
        .trim()
];

// Validation rules for login
export const loginValidationRules = () => [
    body('username')
        .isString().withMessage('Username must be a string')
        .isEmail().withMessage('Invalid email address')
        .trim()
        .normalizeEmail(),
    body('password')
        .isString().withMessage('Password must be a string')
        .exists().withMessage('Password is required')
        .notEmpty().withMessage('Password cannot be empty')
        .trim()
];

// Middleware to handle validation errors
export const validateAuthReq = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
