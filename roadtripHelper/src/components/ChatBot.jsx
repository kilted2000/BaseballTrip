import { useState } from 'react';
import { queryAI } from '../api/apiService'; 

function ChatBot() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');

  const handleSend = async () => {
    try {
      const aiReply = await queryAI(input);
      setReply(aiReply);
    } catch (err) {
      setReply('Error: ' + err.message);
    }
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend}>🌭Ask Tubey</button>
      <div>🌭Tubey says: {reply}</div>
    </div>
  );
}

export default ChatBot;