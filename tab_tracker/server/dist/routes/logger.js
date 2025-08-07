import express from 'express';
import LogModel from '../models/Log.js';
const router = express.Router();
router.post('/log', async (req, res) => {
    const { timestamp, duration, trustScore } = req.body;
    try {
        const log = new LogModel({ timestamp, duration, trustScore });
        await log.save();
        res.status(201).json({ message: 'Log saved successfully' });
    }
    catch (error) {
        console.error('Error saving log:', error);
        res.status(500).json({ error: 'Failed to save log' });
    }
});
export default router;
