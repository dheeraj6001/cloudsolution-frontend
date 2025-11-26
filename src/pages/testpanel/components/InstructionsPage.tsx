const InstructionsPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-lg font-semibold">new ui finall</h1>
        </div>
        <select className="border px-2 py-1 rounded text-sm">
          <option>English</option>
        </select>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Instructions Section */}
        <div className="w-3/4 px-10 py-8">
          <h2 className="text-center text-lg font-bold mb-6">
            Please read the following instructions carefully
          </h2>

          <h3 className="font-semibold underline mb-2">General Instructions:</h3>
          <ol className="list-decimal pl-5 space-y-3 text-sm">
            <li>
              The clock has been set at the server and the countdown timer at the top right corner of your screen
              will display the time remaining for you to complete the exam...
            </li>
            <li>
              The question palette at the right of the screen shows one of the following statuses:
              <ul className="mt-2 space-y-1">
                <li><span className="inline-block w-6 h-6 border text-center">1</span> You have not visited the question yet.</li>
                <li><span className="inline-block w-6 h-6 bg-red-500 text-white text-center">3</span> You have not answered the question.</li>
                <li><span className="inline-block w-6 h-6 bg-green-500 text-white text-center">5</span> You have answered the question.</li>
                <li><span className="inline-block w-6 h-6 bg-purple-500 text-white text-center">7</span> You have NOT answered but marked for review.</li>
                <li><span className="inline-block w-6 h-6 bg-purple-500 text-white text-center">7</span> You have answered but marked for review.</li>
              </ul>
              <p className="text-xs text-gray-600 mt-1">
                The Marked for Review status simply acts as a reminder...
                <span className="text-red-600 italic"> If an answer is selected for a question that is Marked for Review, the answer will be considered in the final evaluation.</span>
              </p>
            </li>
          </ol>

          <h3 className="font-semibold underline mt-6 mb-2">Navigating to a question :</h3>
          <ol className="list-decimal pl-5 space-y-3 text-sm">
            <li>
              To select a question to answer, you can do one of the following:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Click on the question number on the question palette.</li>
                <li>Click on Save and Next to save and go to the next question.</li>
                <li>Click on Mark for Review and Next to save, mark for review, and go to the next question.</li>
              </ul>
            </li>
            <li>You can view the entire paper by clicking on the <strong>Question Paper</strong> button.</li>
          </ol>

          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">
            Proceed →
          </button>
        </div>

        {/* Profile Section */}
        <div className="w-1/4 border-l px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/php-icon.png"
              alt="Profile"
              className="h-16 w-16 rounded-full bg-gray-100"
            />
          </div>
          <div className="text-sm font-medium">Dheeraj Kumar</div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
