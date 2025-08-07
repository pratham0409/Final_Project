import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import loggerRoutes from './routes/logger.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', loggerRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI!;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err);
    });

// Health check
app.get('/', (_, res) => {
    res.send('Server is running');
});
