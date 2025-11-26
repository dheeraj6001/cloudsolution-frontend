import { useState, ChangeEvent, FormEvent } from "react";

// ----------------------------------------
// Props Interface
// ----------------------------------------
interface AddTestProps {
  name: string;
  onClose: () => void;
  onSubmit: (data: AddTestForm & { ts_id: string }) => void;
  tsId: string;
}

// ----------------------------------------
// Form Data Interface
// ----------------------------------------
interface AddTestForm {
  name: string;
  description: string;
  total_marks: string;
  time_limit: string;
  instruction: string;
  status: string;
  difficulty: string;
  negative_marking: string;
  passing_score: string;
  attempt_limit: string;
}

// ----------------------------------------
// Component
// ----------------------------------------
const AddTest: React.FC<AddTestProps> = ({ name, onClose, onSubmit, tsId }) => {
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");

  const [formData, setFormData] = useState<AddTestForm>({
    name: "",
    description: "",
    total_marks: "",
    time_limit: "",
    instruction: "",
    status: "",
    difficulty: "",
    negative_marking: "",
    passing_score: "",
    attempt_limit: "",
  });

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, ts_id: tsId });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/20">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className="border-b mb-4 flex gap-4">
          <button
            className={`pb-2 ${
              activeTab === "basic"
                ? "border-b-2 border-green-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Settings
          </button>

          <button
            className={`pb-2 ${
              activeTab === "advanced"
                ? "border-b-2 border-green-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced Settings
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC TAB */}
          {activeTab === "basic" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border rounded px-3 py-2"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="w-full border rounded px-3 py-2"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Total Marks */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Total Marks
                  </label>
                  <input
                    type="text"
                    name="total_marks"
                    className="w-full border rounded px-3 py-2"
                    value={formData.total_marks}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Time Limit */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Time Limit (min)
                  </label>
                  <input
                    type="text"
                    name="time_limit"
                    className="w-full border rounded px-3 py-2"
                    value={formData.time_limit}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Instruction */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Instruction
                  </label>
                  <textarea
                    name="instruction"
                    className="w-full border rounded px-3 py-2"
                    value={formData.instruction}
                    onChange={handleChange}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    className="w-full border rounded px-3 py-2"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ADVANCED TAB */}
          {activeTab === "advanced" && (
            <div className="grid grid-cols-2 gap-4">
              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  className="w-full border rounded px-3 py-2"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option value="">Select Level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Negative Marking */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Negative Marking
                </label>
                <input
                  type="text"
                  name="negative_marking"
                  className="w-full border rounded px-3 py-2"
                  value={formData.negative_marking}
                  onChange={handleChange}
                />
              </div>

              {/* Passing Score */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Passing Score
                </label>
                <input
                  type="text"
                  name="passing_score"
                  className="w-full border rounded px-3 py-2"
                  value={formData.passing_score}
                  onChange={handleChange}
                />
              </div>

              {/* Attempt Limit */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Attempt Limit
                </label>
                <input
                  type="text"
                  name="attempt_limit"
                  className="w-full border rounded px-3 py-2"
                  value={formData.attempt_limit}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Save Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
