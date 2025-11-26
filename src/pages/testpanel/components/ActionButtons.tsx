type Props = {
  onNext: () => void;
  onPrevious: () => void;
  onMark: () => void;
  disableNext: boolean;
  disablePrevious: boolean;
};

const ActionButtons = ({ onNext, onPrevious, onMark, disableNext, disablePrevious }: Props) => {
  return (
    <div className="mt-4 flex justify-between">
      <button
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        onClick={onPrevious}
        disabled={disablePrevious}
      >
        Previous
      </button>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-yellow-400 rounded" onClick={onMark}>
          Mark for Review
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          onClick={onNext}
          disabled={disableNext}
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
