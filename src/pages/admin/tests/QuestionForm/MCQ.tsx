import { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MCQ = ({ config }: { config: any }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correct, setCorrect] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Handle input changes
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Add fifth option if allowed
  const addOption = () => {
    if (options.length < 5) setOptions([...options, '']);
  };

  const handleSubmit = async () => {
    if (!question || correct === null || !options[correct]) {
      setMessage('Please enter question and valid correct option.');
      return;
    }

    const payload = {
      type: 'MCQ',
      question,
      options: options,
      correctAnswer: options[correct],
      subjectId: config.subject,
      topicId: config.topic,
      language: config.language,
      font: config.font,
      hint: config.hint,
      marksPositive: config.marksPositive,
      marksNegative: config.marksNegative,
      difficulty: config.difficulty,
      hasPassage: config.havePassage,
      hasSolution: config.haveSolution,
      hasInstruction: config.haveInstruction,
    };

    try {
      setLoading(true);
      const res = await axios.post('/api/admin/questions', payload);
      if (res.status === 200 || res.status === 201) {
        setMessage('✅ Question submitted successfully');
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrect(null);
      } else {
        setMessage('❌ Failed to submit question.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error submitting question.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Question Input */}
      <label className="block font-medium mb-2">Question</label>
      <div className="border mb-4 rounded">
        <CKEditor
            editor={ClassicEditor as any}
            data={question}
            onChange={(_, editor) => {
              const data = editor.getData();
              setQuestion(data);
            }}
          />
      </div>

      {/* Options */}
      <label className="block font-medium mb-2">Options</label>
      {options.map((opt, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            name="correct"
            checked={correct === index}
            onChange={() => setCorrect(index)}
          />
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            placeholder={`Option ${String.fromCharCode(65 + index)}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </div>
      ))}

      {/* Add Option E if allowed */}
      {options.length < 5 && (
        <button
          type="button"
          onClick={addOption}
          className="text-blue-600 text-sm mb-4"
        >
          + Add Option E
        </button>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Submitting...' : 'Submit Question'}
      </button>

      {/* Status Message */}
      {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default MCQ;
