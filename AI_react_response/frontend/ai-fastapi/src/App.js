import React, { useState } from 'react';
import './App.css';
import DataSender from './DataSender';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await DataSender(prompt);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Ask OpenAI</h1>
      <textarea
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        cols={60}
      />
      <br />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      <div className="response-box">
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
