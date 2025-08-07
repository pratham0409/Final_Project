import mongoose from 'mongoose';
const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    duration: { type: Number, required: true },
    trustScore: { type: Number, required: true },
});
const LogModel = mongoose.model('Log', LogSchema);
export default LogModel;
