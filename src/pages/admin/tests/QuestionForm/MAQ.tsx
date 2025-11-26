import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface MAQProps {
  config: {
    question?: string;
    options?: string[];
    correct?: number[];
  };
}

const MAQ = ({ config }: MAQProps) => {
  const [question, setQuestion] = useState(config.question || '');
  const [options, setOptions] = useState(config.options || ['', '', '']);
  const [correct, setCorrect] = useState<number[]>(config.correct || []);

  const toggleCorrect = (i: number) => {
    setCorrect((prev) =>
      prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i]
    );
  };

  useEffect(() => {
    // Update state if config changes (optional, only needed if config can change during runtime)
    setQuestion(config.question || '');
    setOptions(config.options || ['', '', '']);
    setCorrect(config.correct || []);
  }, [config]);

  return (
    <div>
      <label className="block font-medium mb-2">Question</label>
      <div className="ckeditor-height-fix border rounded mb-4">
        <CKEditor
            editor={ClassicEditor as any}
            data={question}
            onChange={(_, editor) => {
              const data = editor.getData();
              setQuestion(data);
            }}
          />
      </div>

      <label className="block font-medium mb-2">Options</label>
      {options.map((opt, i) => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={correct.includes(i)}
            onChange={() => toggleCorrect(i)}
          />
          <input
            type="text"
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            className="w-full border px-2 py-1"
            placeholder={`Option ${i + 1}`}
          />
        </div>
      ))}

      {options.length < 5 && (
        <button
          type="button"
          onClick={() => setOptions([...options, ''])}
          className="text-blue-600 text-sm mt-2"
        >
          + Add Option
        </button>
      )}
    </div>
  );
};

export default MAQ;
