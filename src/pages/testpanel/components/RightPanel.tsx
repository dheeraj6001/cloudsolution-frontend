type Props = {
  questions: any[];
  answers: any;
  reviewStatus: any;
  onJump: (index: number) => void;
};

const RightPanel = ({ questions, answers, reviewStatus, onJump }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Question Palette</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((q, i) => {
          const qid = q._id;
          const isAnswered = !!answers[qid];
          const isReview = !!reviewStatus[qid];

          let bg = 'bg-red-500';
          if (isReview) bg = 'bg-yellow-400';
          else if (isAnswered) bg = 'bg-green-600';

          return (
            <button
              key={qid}
              onClick={() => onJump(i)}
              className={`${bg} text-white px-3 py-1 rounded`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RightPanel;
