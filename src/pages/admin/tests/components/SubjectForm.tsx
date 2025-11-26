import { useEffect, useState } from "react";

// ----------------------
// Types moved locally
// ----------------------
export interface Subject {
  subject_id: string;
  name: string;
  no_of_question: number;
}

export interface AvailableSubject {
  _id: string;
  title: string;
}

export interface SubjectFormValues {
  subject_id?: string; // used only when editing
  availableSubjectId: string;
  no_of_question: number;
}

// ----------------------
// Component
// ----------------------
interface SubjectFormProps {
  availableSubjects: AvailableSubject[];
  initialData: Subject | null;
  onSubmit: (data: SubjectFormValues) => void;
  onCancel: () => void;
}

export default function SubjectForm({
  availableSubjects,
  initialData,
  onSubmit,
  onCancel,
}: SubjectFormProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [noOfQuestions, setNoOfQuestions] = useState<number>(1);

  // Pre-fill if editing
  useEffect(() => {
    if (initialData) {
      setSelectedSubjectId(initialData.subject_id);
      setNoOfQuestions(initialData.no_of_question);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!selectedSubjectId) {
      alert("Please select a subject.");
      return;
    }

    const payload: SubjectFormValues = {
      subject_id: initialData?.subject_id, // only for edit
      availableSubjectId: selectedSubjectId,
      no_of_question: noOfQuestions,
    };

    onSubmit(payload);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {initialData ? "Edit Subject" : "Add Subject"}
      </h3>

      {/* Subject Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Select Subject
        </label>
        <select
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select --</option>
          {availableSubjects.map((subj) => (
            <option key={subj._id} value={subj._id}>
              {subj.title}
            </option>
          ))}
        </select>
      </div>

      {/* Questions Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Number of Questions
        </label>
        <input
          type="number"
          min={1}
          value={noOfQuestions}
          onChange={(e) => setNoOfQuestions(Number(e.target.value))}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          {initialData ? "Update" : "Add"}
        </button>

        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
