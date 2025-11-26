import { useState, useEffect } from 'react';

interface TrueFalseProps {
  config: {
    question?: string;
    answer?: boolean;
  };
}

const TrueFalse = ({ config }: TrueFalseProps) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    if (config) {
      setQuestion(config.question || '');
      setAnswer(typeof config.answer === 'boolean' ? config.answer : null);
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
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={answer === true}
            onChange={() => setAnswer(true)}
          />
          True
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={answer === false}
            onChange={() => setAnswer(false)}
          />
          False
        </label>
      </div>
    </div>
  );
};

export default TrueFalse;
