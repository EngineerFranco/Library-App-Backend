// src/controllers/authController.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { createUser, findUserByUsername } from '../models/auth.js';
import dotenv from 'dotenv'
dotenv.config();

export async function register(req, res){
    const { username, password, role } = req.body;
    try {
        const isExist = await findUserByUsername(username);
        if(isExist){
            return res.status(400).json({ error: 'Email is already registered' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, hashedPassword, role);
        res.status(201).json({message:newUser});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function login(req, res){
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
