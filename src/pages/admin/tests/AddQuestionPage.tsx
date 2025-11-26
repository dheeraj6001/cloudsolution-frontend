import { useState } from 'react';
import QuestionForm from './QuestionForm';



const AddQuestionPage = () => {
  const [questionType, setQuestionType] = useState('MCQ');
  const [language, setLanguage] = useState('EN');
  const [font, setFont] = useState('ARIL');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [marksPositive, setMarksPositive] = useState('');
  const [marksNegative, setMarksNegative] = useState('');
  const [hint, setHint] = useState('');
  const [havePassage, setHavePassage] = useState(false);
  const [haveSolution, setHaveSolution] = useState(false);
  const [haveInstruction, setHaveInstruction] = useState(false);
  const [haveOptionE, setHaveOptionE] = useState(false);

  const subjects = [
    { id: '6081630af7ad8a422b7a2003', name: 'zoom' },
    { id: '621d0c3325fb6f0cda281b27', name: 'Gk' },
    { id: '6656efb67ed9933d2d7c1986', name: 'Organisational Behaviour' },
    { id: '6656efc1525d70755b3e4609', name: 'Marketing Management' },
  ];

  return (
    <div className="flex gap-6 p-6">
      <aside className="w-1/4 border p-4 bg-white space-y-4 text-sm">
        <div>
          <label className="block font-medium mb-1">Question Type</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="MCQ">MCQ Single Answer</option>
            <option value="MAQ">MCQ Multiple Answers</option>
            <option value="VMAQ">VMAQ</option>
            <option value="SUBJECTIVE">Subjective</option>
            <option value="NAT">Numeric Answer</option>
            <option value="TRUE_FALSE">True / False</option>
            <option value="MTQ">Matrix Type</option>
            <option value="SLCT">Single Select Dropdown</option>
            <option value="MULTI_SLCT">Multi Select Dropdown</option>
            <option value="MCQ_MULTI_OPTIONS">MCQ Multiple Options</option>
            <option value="TXT_INPUT">Text Type</option>
            <option value="AUDIO_TYPE">Voice Type</option>
            <option value="FILL_BLANKS">Fill in the Blanks</option>
            <option value="SENTENCE_ARRANGMENT">Sentence Rearrangement</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="EN">English</option>
            <option value="HI">Gujarati</option>
            <option value="BI">English + Gujarati</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Font</label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="ARIL">ARIL</option>
            <option value="CHNK">NARAD</option>
            <option value="KDLI">KUNDALI</option>
            <option value="PRNK">PRIYAANK (Telugu)</option>
            <option value="WC01">Walkman Chanakya</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Hint</label>
          <input
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>{subj.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">First select subject</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Difficulty Level</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Marks</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="+VE"
              value={marksPositive}
              onChange={(e) => setMarksPositive(e.target.value)}
              className="w-1/2 border rounded px-2 py-1"
            />
            <input
              type="text"
              placeholder="-VE"
              value={marksNegative}
              onChange={(e) => setMarksNegative(e.target.value)}
              className="w-1/2 border rounded px-2 py-1"
            />
          </div>
        </div>

        <hr />

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={havePassage} onChange={() => setHavePassage(!havePassage)} />
            Have Passage?
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={haveSolution} onChange={() => setHaveSolution(!haveSolution)} />
            Have Solution?
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={haveInstruction} onChange={() => setHaveInstruction(!haveInstruction)} />
            Have Instruction Part?
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={haveOptionE} onChange={() => setHaveOptionE(!haveOptionE)} />
            Have Option "E"?
          </label>
        </div>
      </aside>

      <main className="flex-1 bg-white border p-6 rounded">
        <h2 className="text-lg font-semibold mb-4">Question Builder</h2>
        <QuestionForm type={questionType} config={{
  subject,
  topic,
  difficulty,
  marksPositive,
  marksNegative,
  hint,
  language,
  font,
  havePassage,
  haveSolution,
  haveInstruction,
  haveOptionE,
}}/>
      </main>
    </div>
  );
};

export default AddQuestionPage;
