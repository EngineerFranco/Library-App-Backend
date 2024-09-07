// src/models/auth.js
import pool from '../config/db.js';

export async function createUser(username, password, role) {
    const result = await pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
        [username, password, role]
    );
    return result.rows[0];
}

export async function findUserByUsername(username) {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [username]
    );
    return result.rows[0];
}

