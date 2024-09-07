// src/middleware/rateLimiter.js

import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, 
    message: 'Too many request attempts, please try again later.',
});

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, 
    message: 'Too many request attempts, please try again later.',
});

export const bookLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, 
    message: 'Too many request attempts, please try again later.',
});

