// components/FinalSubmitScreen.tsx
// import React from 'react';

import React,{ useEffect } from 'react';
import { Subject } from '@/types/test';


interface FinalSubmitScreenProps {
  subjects: Subject[]; // ✅ now compatible with StartTest.tsx
  answers: { [questionId: string]: string };
  reviewStatus: { [questionId: string]: boolean };
  onSubmit: () => Promise<void>;
  onBack: () => void;
  autoSubmit?: boolean;
}

const FinalSubmitScreen: React.FC<FinalSubmitScreenProps> = ({
  subjects,
  answers,
  reviewStatus,
  onSubmit,
  onBack,
  autoSubmit,
}) => {
  useEffect(() => {
    if (autoSubmit) {
      onSubmit(); // auto-submit when flag is true
    }
  }, [autoSubmit, onSubmit]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Test Summary</h2>

      {subjects.map((subject, sIdx) => {
        const total = subject.questions.length;
        const answered = subject.questions.filter((q) => answers[q._id]).length;
        const marked = subject.questions.filter((q) => reviewStatus[q._id]).length;
        const unanswered = total - answered;

        return (
          <div key={sIdx} className="mb-4">
            <h3 className="font-bold text-lg">{subject.name}</h3>
            <ul className="pl-4 text-gray-700">
              <li>Total Questions: {total}</li>
              <li>Answered: {answered}</li>
              <li>Unanswered: {unanswered}</li>
              <li>Marked for Review: {marked}</li>
            </ul>
          </div>
        );
      })}

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="px-4 py-2 bg-gray-400 text-white rounded">Back</button>
        <button onClick={onSubmit} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Submit Test</button>
      </div>
    </div>
  );
};

export default FinalSubmitScreen;
