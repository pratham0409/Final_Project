import express from 'express';
import ResponseModel from '../models/Response'; // Make sure this line exists

const router = express.Router();

const mockQuizzes: Record<string, any[]> = {
    react: [
        {
            id: "q1",
            question: "What is React?",
            options: ["Library", "Framework", "Language", "Database"],
            answer: "Library"
        },
        {
            id: "q2",
            question: "What hook is used for state?",
            options: ["useState", "useEffect", "useRef", "useMemo"],
            answer: "useState"
        }
    ],
    javascript: [
        {
            id: "q3",
            question: "Which keyword declares a constant in JavaScript?",
            options: ["let", "var", "const", "static"],
            answer: "const"
        },
        {
            id: "q4",
            question: "Which of these is not a JavaScript data type?",
            options: ["Number", "Boolean", "Float", "String"],
            answer: "Float"
        }
    ]
};

router.post('/quiz', (req, res) => {
    const { topic } = req.body;
    const key = topic.toLowerCase();
    const selectedQuiz = mockQuizzes[key] || mockQuizzes['react'];
    const quizWithoutAnswers = selectedQuiz.map(({ answer, ...rest }) => rest);
    res.json(quizWithoutAnswers);
});


router.post('/response', async (req, res) => {
    const { questionId, selectedOption, timestamp } = req.body;

    // Flatten all quiz questions across all topics
    const allQuestions = Object.values(mockQuizzes).flat();
    const question = allQuestions.find(q => q.id === questionId);
    const isCorrect = question?.answer === selectedOption;

    // Optional: if you still want to save logs (remove if not needed)
    const response = new ResponseModel({
        questionId,
        isCorrect,
        timestamp
    });
    await response.save();

    res.json({ correct: isCorrect });
});

export default router;
