// src/controllers/bookController.js

import { saveBook, getBookByID, updateBookByID, deleteBookByID, getBookAllBooks, getBooksByTitleOrAuthor} from '../models/book.js';

// Get a book by ID
export async function getAllBooks(req, res) {
    try {
        const books = await getBookAllBooks();

        if (!books) {
            return res.status(404).json({ error: 'No Available books' });
        }

        res.status(200).json({ message: 'Books retrieved successfully', books });
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve book: ${error.message}` });
    }
}

// Search books by title or author
export async function searchBooks(req, res) {
    const { title, author } = req.query;

    try {

        const books = await getBooksByTitleOrAuthor(title, author);
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found.' });
        }

        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve books: ${error.message}` });
    }
}

// Add a new book
export async function addBook(req, res) {
    const { title, author, sypnosis, link } = req.body;

    try {
        const book = await saveBook(title, author, sypnosis, link);
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        res.status(500).json({ error: `Failed to add book: ${error.message}` });
    }
}

// Get a book by ID
export async function getBook(req, res) {
    const { id } = req.params;

    try {
        const book = await getBookByID(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        res.status(200).json({ message: 'Book retrieved successfully', book });
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve book: ${error.message}` });
    }
}

// Update a book by ID
export async function updateBook(req, res) {
    const { title, author, sypnosis, link } = req.body;
    const { id } = req.params;

    try {
        const book = await updateBookByID(id, title, author, sypnosis, link);

        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        res.status(500).json({ error: `Failed to update book: ${error.message}` });
    }
}

// Delete a book by ID (Bonus: you may need this as well)
export async function deleteBook(req, res) {
    const { id } = req.params;

    try {
        const deletedBook = await deleteBookByID(id);
        console.log(deletedBook)
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }

        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete book: ${error.message}` });
    }
}
