import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SecondInstructionsPage = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleStartExam = () => {
    if (agreed) {
      // Navigate to exam page
      navigate('/exam');
    } else {
      alert('Please agree to the terms before starting the exam.');
    }
  };

  const handlePrevious = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-lg font-semibold">new ui finall</h1>
        </div>
        <select className="border px-2 py-1 rounded text-sm">
          <option>English</option>
        </select>
      </header>

      {/* Body */}
      <div className="flex">
        {/* Left Content */}
        <div className="w-3/4 px-10 py-8">
          <h2 className="text-center text-lg font-bold mb-6">
            Please read the following instructions carefully
          </h2>

          {/* Banner and Text */}
          <div className="flex items-start space-x-6 mb-6">
            <img src="/neet-banner.png" alt="NEET Banner" className="h-32" />
            <ul className="text-sm space-y-3">
              <li>
                <strong>Total Questions:</strong> The exam consists of{' '}
                <strong>50 multiple-choice questions</strong>. Each question carries equal weight.
              </li>
              <li>
                <strong>Attempt All Questions:</strong> You must attempt all questions. Leaving any question unanswered may affect your final score.
              </li>
              <li>
                <strong>Exam Duration:</strong> You have <strong>2 hours</strong> to complete the exam.
              </li>
              <li>
                <strong>Secure Your Answers:</strong> Once you select an answer, double-check it before moving on.
              </li>
            </ul>
          </div>

          {/* Language Selection and Consent */}
          <div className="text-sm mb-4">
            <label className="block mb-1 font-medium">Choose your default language:</label>
            <select className="border px-3 py-2 rounded mb-2 text-sm">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
            </select>
            <p className="text-gray-600 text-xs">
              Please note all questions will appear in your default language. This language can be changed later per question.
            </p>
          </div>

          <div className="flex items-start space-x-2 mt-4 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <p>
              I have read and understood the instructions. All Computer Hardwares allotted to me are in proper working condition...
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              ← Previous
            </button>
            <button
              onClick={handleStartExam}
              className={`px-6 py-2 rounded text-white shadow ${
                agreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!agreed}
            >
              Start Exam
            </button>
          </div>
        </div>

        {/* Right Profile */}
        <div className="w-1/4 border-l px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <img src="/php-icon.png" alt="Profile" className="h-16 w-16 rounded-full bg-gray-100" />
          </div>
          <div className="text-sm font-medium">Dheeraj Kumar</div>
        </div>
      </div>
    </div>
  );
};

export default SecondInstructionsPage;
