import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createTest } from "@/services/admin/tests"; // <-- API function
import { useNavigate } from "react-router-dom";

const AddTestPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    testType: "Ranking",
    course: "",
    publishDate: "",
    endDate: "",
    duration: 30,
    totalQuestions: 0,
    totalMarks: 0,
    instructions: "",
    medium: "",
    proctoring: "No",
    keyboard: "No",
    randomQs: "No",
    mcqOrder: "Default",
    calculator: "No",
    passageAlign: "Left",
    passageSamePage: "No",
    questionNumbering: "Subject Wise",
    paletteWindow: "Subjectwise",
    status: "Active",
    featured: "No",
    submitSectionButton: "Enabled",
    fontSize: 18,
  });

  const [showAdvanced, setShowAdvanced] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        test_name: form.name,
        description: form.description,
        type: form.testType,
        course: form.course,
        publish_date: form.publishDate,
        end_date: form.endDate,
        duration: form.duration,
        total_questions: form.totalQuestions,
        total_marks: form.totalMarks,
        instructions: form.instructions,
        medium: form.medium,
        proctoring_allow: form.proctoring === "Yes",
        keyboard_allow: form.keyboard === "Yes",
        random_questions: form.randomQs === "Yes",
        mcq_option_order: form.mcqOrder,
        calculator_allow: form.calculator === "Yes",
        passage_alignment: form.passageAlign,
        passage_same_page: form.passageSamePage === "Yes",
        question_numbering: form.questionNumbering,
        q_palette_window: form.paletteWindow,
        status: form.status === "Active" ? 1 : 0,
        is_featured: form.featured === "Yes",
        submit_section_button: form.submitSectionButton === "Enabled",
        font_size: form.fontSize,
      };

      const res = await createTest(payload);

      if (res.status) {
        alert("✅ Test created successfully!");
        navigate("/admin/tests");
      } else {
        throw new Error((res.data as any)?.message || "Failed to create test");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error saving test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Setting - Left */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg mb-4">📝 Basic Setting</h2>

          {/* Name */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Test Type */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Test Type:</label>
            <select
              name="testType"
              value={form.testType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Ranking</option>
              <option>Practice</option>
            </select>
          </div>

          {/* Course */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Course:</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Course</option>
              <option>Testing [A]</option>
            </select>
          </div>

          {/* Duration / Questions */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Duration (mins):</label>
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Questions:</label>
              <input
                type="number"
                name="totalQuestions"
                value={form.totalQuestions}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Marks / Medium */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-sm font-medium mb-1">Total Marks:</label>
              <input
                type="number"
                name="totalMarks"
                value={form.totalMarks}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Medium:</label>
              <select
                name="medium"
                value={form.medium}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option>Hindi+English (BI)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Setting - Right */}
        <div className="bg-white rounded-lg shadow">
          <button
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="w-full flex justify-between items-center px-4 py-3 border-b text-left font-bold"
          >
            ⚙️ Advanced Setting
            {showAdvanced ? <ChevronUp /> : <ChevronDown />}
          </button>

          {showAdvanced && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Proctoring Allow", name: "proctoring", options: ["Yes", "No"] },
                { label: "Keyboard Allow", name: "keyboard", options: ["Yes", "No"] },
                { label: "Random Qs", name: "randomQs", options: ["Yes", "No"] },
                { label: "MCQ Option Order", name: "mcqOrder", options: ["Default", "Random"] },
                { label: "Calculator Allow", name: "calculator", options: ["Yes", "No"] },
                { label: "Passage AlignMent", name: "passageAlign", options: ["Left", "Right", "Center"] },
                { label: "Passage On Same Page", name: "passageSamePage", options: ["Yes", "No"] },
                { label: "Question Numbering", name: "questionNumbering", options: ["Subject Wise", "Continuous"] },
                { label: "Q-Pallette Window", name: "paletteWindow", options: ["Subjectwise", "Full"] },
                { label: "Status", name: "status", options: ["Active", "Inactive"] },
                { label: "Is Featured", name: "featured", options: ["Yes", "No"] },
                { label: "Submit Section Button", name: "submitSectionButton", options: ["Enabled", "Disabled"] },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-1">{field.label}:</label>
                  <select
                    name={field.name}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    {field.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1">Font Size</label>
                <input
                  type="number"
                  name="fontSize"
                  value={form.fontSize}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Save Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-6 py-2 rounded-lg shadow text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Saving..." : "💾 Save"}
        </button>
      </div>
    </div>
  );
};

export default AddTestPage;
