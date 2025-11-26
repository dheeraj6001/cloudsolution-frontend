// components/AddSubjectModal.tsx
import  { useState, useEffect } from "react";

interface AddSubjectModalProps {
  show: boolean;
  onClose: () => void;
  availableSubjects: {
    _id: string;
    title: string;
  }[];
  onAddSubject: (payload: {
    name: string;
    no_of_question: number;
    subjectId?: string;
  }) => void;
}

export default function AddSubjectModal({
  show,
  onClose,
  availableSubjects,
  onAddSubject,
}: AddSubjectModalProps) {
  const [useExistingSubject, setUseExistingSubject] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newQuestionCount, setNewQuestionCount] = useState(1);

  useEffect(() => {
    if (show) {
      setUseExistingSubject(true);
      setSelectedSubjectId(null);
      setNewSubjectName("");
      setNewQuestionCount(1);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Subject</h2>

        <div className="flex items-center mb-4 space-x-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={useExistingSubject}
              onChange={() => setUseExistingSubject(true)}
            />
            Select Existing
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={!useExistingSubject}
              onChange={() => setUseExistingSubject(false)}
            />
            Add New
          </label>
        </div>

        {useExistingSubject ? (
          <select
            className="w-full px-4 py-2 border rounded-md mb-3"
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            value={selectedSubjectId || ""}
          >
            <option value="" disabled>
              -- Select Subject --
            </option>
            {availableSubjects.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.title}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder="New Subject Name"
            className="w-full px-4 py-2 border rounded-md mb-3"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
          />
        )}

        <input
          type="number"
          placeholder="Number of Questions"
          className="w-full px-4 py-2 border rounded-md mb-4"
          value={newQuestionCount}
          min={1}
          onChange={(e) => setNewQuestionCount(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg"
            onClick={() => {
              const name = useExistingSubject
                ? availableSubjects.find((s) => s._id === selectedSubjectId)
                    ?.title
                : newSubjectName;

              if (!name) return;

              onAddSubject({
                name,
                no_of_question: newQuestionCount,
                subjectId: useExistingSubject
                  ? selectedSubjectId || undefined
                  : undefined,
              });

              onClose();
            }}
          >
            Add Subject
          </button>
        </div>
      </div>
    </div>
  );
}
