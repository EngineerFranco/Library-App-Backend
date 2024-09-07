import express from 'express';
import { addBook, getBook, deleteBook, updateBook, getAllBooks, searchBooks} from '../controllers/bookController.js';
import { validateBookReq, addValidations, updateValidations, deleteValidations, getValidations, searchValidations } from '../middleware/bookReqValidation.js';
import { bookLimiter } from '../middleware/rateLimiter.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router()

// Add Book
router.post('/add', bookLimiter, authenticateToken, addValidations(), validateBookReq, addBook);

// Get All Books
router.get('/get', bookLimiter, authenticateToken, getAllBooks);

// Get Book
router.get('/get/:id', bookLimiter, authenticateToken, getValidations(), validateBookReq, getBook);

// Update Book
router.put('/update/:id', bookLimiter, authenticateToken, updateValidations(), validateBookReq, updateBook)

// Delete Book
router.delete('/delete/:id', bookLimiter, authenticateToken, deleteValidations(), validateBookReq, deleteBook)

// Search Books by title or author
router.get('/search', bookLimiter, authenticateToken, searchValidations(), validateBookReq, searchBooks);

// Catch-all route for invalid routes
router.all('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

export default router;