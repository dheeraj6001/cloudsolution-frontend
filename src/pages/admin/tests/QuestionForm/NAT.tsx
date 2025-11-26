import { useState, useEffect } from 'react';

interface NATProps {
  config: any; // Replace 'any' with a proper type if known
}

const NAT = ({ config }: NATProps) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (config) {
      setQuestion(config.question || '');
      setAnswer(config.answer || '');
    }
  }, [config]);

  return (
    <div>
      <label className="block font-medium mb-2">Question</label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-4"
      />

      <label className="block font-medium mb-2">Answer</label>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border px-2 py-1"
        placeholder="Enter numeric answer"
      />
    </div>
  );
};

export default NAT;
