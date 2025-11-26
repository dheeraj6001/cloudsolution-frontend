import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from './components/TopBar';
import SectionTabs from './components/SectionTabs';
import PassagePanel from './components/PassagePanel';
import QuestionView from './components/QuestionView';
import ActionButtons from './components/ActionButtons';
import RightPanel from './components/RightPanel';
import FinalSubmitScreen from './components/FinalSubmitScreen';
import Timer from './components/Timer'; 
import { Subject } from '@/types/test';



const StartTest = () => {
  const { testId } = useParams<{ testId: string }>();
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [instructionPage, setInstructionPage] = useState(1);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [reviewStatus, setReviewStatus] = useState<{ [questionId: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  const currentQuestions = subjects[selectedSubjectIndex]?.questions || [];
  const currentQ = currentQuestions[currentIndex];

  useEffect(() => {
    if (!showInstructions) {
      const fetchQuestions = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/student/starttest/${testId}`);
          const json = await res.json();
          const subjectList = json?.data?.subjects || [];
          setSubjects(subjectList);
        } catch (err) {
          console.error('Failed to fetch questions:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [showInstructions, testId]);

  // const handleOptionChange = (qid: string, selected: string) => {
  //   setAnswers((prev) => ({ ...prev, [qid]: selected }));
  // };

  const handleMarkForReview = () => {
    if (!currentQ?._id) return;
    setReviewStatus((prev) => ({ ...prev, [currentQ._id]: true }));
    goToNext();
  };

  const goToNext = () => {
    const q = currentQ;
    if (q && answers[q._id]) {
      handleOptionChange(q._id, answers[q._id]); // re-save to be safe
    }
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };


  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const submitTest = async () => {
  try {
    const res = await fetch(`http://localhost:3000/student/submit-test/${testId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testId,
        answers,
        reviewStatus,
      }),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      alert('✅ Test submitted successfully!');
      // Optional: redirect to result page or dashboard
    } else {
      alert('❌ Submission failed. Try again.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('❌ Network error. Please try again.');
  }
};

const handleOptionChange = async (qid: string, selected: string) => {
  setAnswers((prev) => ({ ...prev, [qid]: selected }));

  // ✅ Call API here
  try {
    await fetch(`http://localhost:3000/student/save-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId: qid,
        selectedOption: selected,
        testId, // include this if needed
      }),
    });
  } catch (err) {
    console.error('Error saving answer:', err);
  }
};
  // Instructions screen
  if (showInstructions) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        {instructionPage === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-4">📝 General Instructions</h1>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The test consists of multiple sections and questions.</li>
              <li>Each section may contain a passage or standalone questions.</li>
              <li>You can move between questions and sections.</li>
            </ul>
            <div className="mt-6 text-right">
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setInstructionPage(2)}
              >
                Next
              </button>
            </div>
          </>
        )}

        {instructionPage === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-4">📌 Important Notes Before You Start</h1>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Once the test starts, the timer cannot be paused.</li>
              <li>Click “Mark for Review” if you're unsure and want to revisit.</li>
              <li>You must click “Finish & Review” to submit your test.</li>
            </ul>
            <div className="mt-6 flex justify-between">
              <button
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setInstructionPage(1)}
              >
                Back
              </button>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowInstructions(false)}
              >
                Start Test
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


  // Loading state
  if (loading) return <div className="text-center mt-10">Loading questions...</div>;

  // Final review screen
  if (showFinalScreen) {
    return (
      <FinalSubmitScreen
        subjects={subjects}
        answers={answers}
        reviewStatus={reviewStatus}
        onBack={() => setShowFinalScreen(false)}
        onSubmit={submitTest}
        autoSubmit={true}
      />
    );
  }

  // Main test panel
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="absolute right-6 top-4">
        <Timer
            durationMinutes={1}
            onTimeUp={() => {
              submitTest();  // Auto-submit
              setShowFinalScreen(true);  // Optional: show summary
            }}
          />
      </div>

      <SectionTabs
        subjects={subjects}
        selectedIndex={selectedSubjectIndex}
        onSelect={(index: number) => {
          setSelectedSubjectIndex(index);
          setCurrentIndex(0);
        }}
      />

      <button
        onClick={() => setShowRightPanel(!showRightPanel)}
        className="fixed top-24 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        {showRightPanel ? 'Hide Palette' : 'Show Palette'}
      </button>


      <div className="flex flex-grow transition-all duration-300 ease-in-out">
        {/* Left Panel */}
       <div
    className={`transition-all duration-300 ease-in-out flex flex-col relative border-r max-h-[calc(100vh-100px)] ${
      showRightPanel ? 'w-3/4' : 'w-full'
    }`}
  >

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {currentQ ? (
              <>
                {currentQ.passage && <PassagePanel passage={currentQ.passage} />}
                <QuestionView
                  question={currentQ}
                  index={currentIndex}
                  selectedOption={answers[currentQ._id]}
                  onOptionChange={handleOptionChange}
                />
              </>
            ) : (
              <div className="text-center text-gray-500">No question available</div>
            )}
          </div>

          {/* Sticky Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t px-4 py-4 z-10">
            <ActionButtons
              onNext={goToNext}
              onPrevious={goToPrevious}
              onMark={handleMarkForReview}
              disableNext={currentIndex === currentQuestions.length - 1}
              disablePrevious={currentIndex === 0}
            />
            {currentIndex === currentQuestions.length - 1 && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowFinalScreen(true)}
                  className="px-6 py-2 bg-green-600 text-white rounded"
                >
                  Finish & Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}

       <div
    className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
      showRightPanel ? 'w-1/4 opacity-100 translate-x-0' : 'w-0 opacity-0 translate-x-full'
    }`}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-blue-50 overflow-y-auto p-4 max-h-[calc(100vh-100px)] shadow-lg">
      <RightPanel
        questions={currentQuestions}
        answers={answers}
        reviewStatus={reviewStatus}
        onJump={(index) => setCurrentIndex(index)}
      />
    </div>
  </div>
      </div>
    </div>
  );
};

export default StartTest;
