
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js'
import bookRoutes from './src/routes/bookRoutes.js'; 
import cors from 'cors'
// Initialize the app
const app = express();

// CORS
app.use(cors());

// Load environment variables
dotenv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/lib/auth', authRoutes);
app.use('/lib/book', bookRoutes); 

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
