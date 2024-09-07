// src/models/book.js

import pool from "../config/db.js";

// Get a book by ID with transaction support
export async function getBookAllBooks() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const query = 'SELECT * FROM books';
        const result = await client.query(query);
        await client.query('COMMIT'); 
        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`Transaction error: ${error.message}`);
        throw new Error('Transaction failed.');
    } finally {
        client.release();
    }
}

// Get books by title or author with transaction support
export async function getBooksByTitleOrAuthor(title, author) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Build the query dynamically based on provided parameters
        let query = 'SELECT * FROM books WHERE';
        const queryParams = [];
        
        if (title) {
            query += ' title ILIKE $1';
            queryParams.push(`%${title}%`);
        }
        if (author) {
            if (title) {
                query += ' AND';
            }
            query += ' author ILIKE $2';
            queryParams.push(`%${author}%`);
        }

        // Execute the query
        const result = await client.query(query, queryParams);
        await client.query('COMMIT');
        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`Transaction error: ${error.message}`);
        throw new Error('Transaction failed.');
    } finally {
        client.release();
    }
}

// Save a book with transaction support
export async function saveBook(title, author, sypnosis, link) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const query = 'INSERT INTO books (title, author, sypnosis, link) VALUES($1, $2, $3, $4) RETURNING *';
        const result = await client.query(query, [title, author, sypnosis, link]);
        await client.query('COMMIT'); 
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error(`Transaction error: ${error.message}`);
        throw new Error('Transaction failed.');
    } finally {
        client.release();
    }
}

// Get a book by ID with transaction support
export async function getBookByID(id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const query = 'SELECT * FROM books WHERE id = $1';
        const result = await client.query(query, [id]);
        await client.query('COMMIT'); 
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`Transaction error: ${error.message}`);
        throw new Error('Transaction failed.');
    } finally {
        client.release();
    }
}


// Update a book by ID with transaction support
export async function updateBookByID(id, title, author, sypnosis, link) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const query = 'UPDATE books SET title = $2, author = $3, sypnosis = $4, link = $5 WHERE id = $1 RETURNING *';
        const result = await client.query(query, [id, title, author, sypnosis, link]);
        await client.query('COMMIT'); 
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error(`Transaction error: ${error.message}`);
        throw new Error('Transaction failed.');
    } finally {
        client.release();
    }
}

// Delete a book by ID with transaction support
export async function deleteBookByID(id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
        const result = await client.query(query, [id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error(`Transaction error: ${error.message}`);
        throw new Error('Transaction failed.');
    } finally {
        client.release();
    }
}
