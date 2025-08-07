"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const quiz_1 = __importDefault(require("./routes/quiz"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API routes
app.use('/api', quiz_1.default);
// MongoDB Connection
const MONGO_URI = "mongodb+srv://quizuser:quizpass123@quiz-generator.zdci8fm.mongodb.net/quizDB?retryWrites=true&w=majority&appName=Quiz-generator";
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
// Root route
app.get('/', (req, res) => {
    res.send('Server is running');
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=index.js.map