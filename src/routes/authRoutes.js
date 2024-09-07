import express from 'express';
import { login, register } from '../controllers/authController.js';
import { authLimiter, loginLimiter } from '../middleware/rateLimiter.js';
import { registerValidationRules, loginValidationRules, validateAuthReq } from '../middleware/authReqValidation.js';

const router = express.Router()

// Register route
router.post('/register', authLimiter, registerValidationRules(), validateAuthReq, register);

// Login route
router.post('/login', loginLimiter, loginValidationRules(), validateAuthReq, login);

// Catch-all route for invalid routes
router.all('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

export default router;