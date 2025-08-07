
const API_BASE = 'https://tab-tracker-5m2m.onrender.com/api';

export async function sendLog(log: {
    timestamp: string;
    duration: number;
    trustScore: number;
}) {
    const res = await fetch(`${API_BASE}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(log),
    });
    return res.json();
}
