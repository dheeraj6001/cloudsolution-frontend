type Props = {
  question: any;
  index: number;
  selectedOption?: string;
  onOptionChange: (qid: string, selected: string) => void;
};



const QuestionView = ({ question, index, selectedOption, onOptionChange }: Props) => {
  const qData = question?.en;
  const options = qData?.options || {};
  const qid = question._id;

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <div className="text-lg font-semibold mb-3">
        Q{index + 1}. <span dangerouslySetInnerHTML={{ __html: qData.ques }} />
      </div>

      <div className="space-y-2">
        {Object.entries(options).map(([key, html]) => {
          const isSelected = selectedOption === key;

          return (
            <div
              key={key}
              onClick={() => onOptionChange(qid, isSelected ? '' : key)}
              className={`flex items-center p-3 rounded border cursor-pointer transition ${
                isSelected ? 'bg-blue-100 border-blue-500' : 'bg-gray-100 border-gray-300'
              } hover:bg-gray-200`}
            >
              <div className="w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center">
                {isSelected && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
              </div>
              <span dangerouslySetInnerHTML={{ __html:  String(html) }} />
            </div>
          );
        })}
      </div>

      <div className="text-sm text-gray-500 mt-2">
        Marks: +{question.marks_positive} / -{question.marks_negative}
      </div>
    </div>
  );
};

export default QuestionView;
