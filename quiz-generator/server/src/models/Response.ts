import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    questionId: String,
    isCorrect: Boolean,
    timestamp: Number,
}, {
    timestamps: true
});

const Response = mongoose.model('Response', responseSchema);
export default Response;
