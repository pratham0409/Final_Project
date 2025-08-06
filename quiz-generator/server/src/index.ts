import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import quizRoutes from './routes/quiz';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', quizRoutes);

// MongoDB Connection
const MONGO_URI = "mongodb+srv://quizuser:quizpass123@quiz-generator.zdci8fm.mongodb.net/quizDB?retryWrites=true&w=majority&appName=Quiz-generator";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
