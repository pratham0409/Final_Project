import React, { useState } from 'react';
import axios from 'axios';

type Question = {
  id: string;
  question: string;
  options: string[];
};

function fetchQuiz<T>(topic: string): Promise<T[]> {
  return axios.post('https://quiz-master-pqan.onrender.com/api/quiz', { topic }).then(res => res.data);
}

const App: React.FC = () => {
  const topics = ["React", "JavaScript"];
  const [inputValue, setInputValue] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  const filtered = topics.filter(opt =>
    opt.toLowerCase().includes(inputValue.toLowerCase())
  );

  const startQuiz = async () => {
    const data = await fetchQuiz<Question>(selectedTopic);
    setQuiz(data);
    setStarted(true);
  };

  const handleAnswer = async (option: string) => {
    const q = quiz[current];
    const response = {
      questionId: q.id,
      selectedOption: option,
      timestamp: current * 25
    };

    try {
      const res = await axios.post('https://quiz-master-pqan.onrender.com/api/response', response);
      if (res.data.correct) {
        setScore(prev => prev + 1);
      }
    } catch { }

    setCurrent(prev => prev + 1);
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
      padding: '40px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }}>
        {!started ? (
          <>
            <h1 style={{ textAlign: 'center' }}>AI-Powered Quiz</h1>

            <label style={{ display: 'block', marginBottom: 8 }}>Choose a Topic:</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                placeholder="Type or choose a topic"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setSelectedTopic(e.target.value);
                  setShowOptions(true);
                }}
                onFocus={() => setShowOptions(true)}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  marginBottom: '8px'
                }}
              />
              {showOptions && filtered.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    zIndex: 1000
                  }}
                >
                  {filtered.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setInputValue(option);
                        setSelectedTopic(option);
                        setShowOptions(false);
                      }}
                      style={{
                        padding: '10px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee'
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <br />
            <button
              onClick={startQuiz}
              disabled={!selectedTopic}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Start Quiz
            </button>
          </>
        ) : current < quiz.length ? (
          <>
            <h2 style={{ marginBottom: 10 }}>Question {current + 1} of {quiz.length}</h2>
            <p style={{ marginBottom: 20 }}>{quiz[current].question}</p>
            {quiz[current].options.map(opt => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px',
                  marginBottom: '10px',
                  fontSize: '15px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  background: '#f9f9f9',
                  cursor: 'pointer'
                }}
              >
                {opt}
              </button>
            ))}
            <p style={{ marginTop: 20, textAlign: 'right' }}>Current Score: {score}</p>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: 'center' }}>Quiz Completed</h2>
            <p style={{ textAlign: 'center', fontSize: 18 }}>
              Your Score: <strong>{score} / {quiz.length}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
