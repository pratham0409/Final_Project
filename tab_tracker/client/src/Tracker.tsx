import { useEffect, useRef, useState } from "react";
import { sendLog } from "./utils/api";

interface Log {
    timestamp: string;
    duration: number;
    trustScore: number;
}

const Tracker = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const awayStartRef = useRef<number | null>(null);

    useEffect(() => {
        const handleBlur = () => {
            awayStartRef.current = Date.now();
        };

        const handleFocus = () => {
            if (awayStartRef.current) {
                const now = Date.now();
                const duration = Math.floor((now - awayStartRef.current) / 1000);
                const trustScore = Math.max(0, 100 - duration * 0.5);

                const log: Log = {
                    timestamp: new Date().toISOString(),
                    duration,
                    trustScore: parseFloat(trustScore.toFixed(2)),
                };

                sendLog(log);
                setLogs(prev => [log, ...prev]);
                awayStartRef.current = null;
            }
        };

        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
            <h2 style={{ textAlign: "center", color: "#343a40" }}>Tab Activity Tracker</h2>

            <div style={{ overflowX: "auto", marginTop: "2rem" }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}>
                    <thead style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
                        <tr>
                            <th style={thStyle}>Timestamp</th>
                            <th style={thStyle}>Duration (s)</th>
                            <th style={thStyle}>Trust Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, i) => (
                            <tr key={i} style={i % 2 === 0 ? rowEven : rowOdd}>
                                <td style={tdStyle}>{new Date(log.timestamp).toLocaleString()}</td>
                                <td style={tdStyle}>{log.duration}</td>
                                <td style={tdStyle}>{log.trustScore}</td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td style={tdStyle} colSpan={3}>No logs yet. Switch tabs and return to start tracking.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const thStyle: React.CSSProperties = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
};

const tdStyle: React.CSSProperties = {
    padding: "12px",
    borderBottom: "1px solid #dee2e6",
    color: "#212529",
};

const rowEven: React.CSSProperties = {
    backgroundColor: "#f1f3f5",
};

const rowOdd: React.CSSProperties = {
    backgroundColor: "#ffffff",
};

export default Tracker;
