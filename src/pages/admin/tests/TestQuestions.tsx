// src/pages/admin/tests/TestQuestions.tsx
import  { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TestQuestions as fetchTestQuestions,
  fetchAvailableSubjects,
  addSubjecttoTest,
  fatchTestSubject,
} from "@/services/admin/tests";
import { createSubject } from "@/services/admin/misc";

import SubjectTabs from "./components/SubjectTabs";
import AddSubjectModal from "./components/AddSubjectModal";
import { MathJax, MathJaxContext } from "better-react-mathjax";

/**
 * Types
 */
type Question = {
  _id: string;
  en?: {
    ques?: string;
    options?: string[];
  };
  question_type?: string;
  marks_positive?: string | number;
};

/**
 * This type represents the subject object that contains questions (returned by fetchTestQuestions)
 */
type SubjectDefinition = {
  sub_id: string;
  name: string;
  no_of_question: number | string;
  questions: Question[];
};

/**
 * This type represents the test subject metadata (returned by fatchTestSubject)
 * Fields based on your usage in the sidebar: title, no_of_question, subject_time, qlimit
 */
type TestSubject = {
  _id?: string;
  title: string;
  no_of_question?: number | string;
  subject_time?: number | string;
  qlimit?: number | string;
};

/**
 * Utility: add lazy loading to <img> tags inside HTML string
 */
const enhanceImages = (html: string) =>
  html.replace(
    /<img(?![^>]*loading=['"]lazy['"])([^>]*?)\/?>(?!<\/img>)/g,
    (_match, attrs) => `<img loading="lazy" ${attrs?.trim() ?? ""} />`
  );

export default function TestQuestions() {
  const { testId } = useParams<{ testId?: string }>();
  const navigate = useNavigate();

  // modal + available subjects pulled from service
  const [showModal, setShowModal] = useState<boolean>(false);
  const [availableSubjects, setAvailableSubjects] = useState<
    { _id: string; title: string }[]
  >([]);

  // main subjects with questions (from fetchTestQuestions)
  const [subjects, setSubjects] = useState<SubjectDefinition[]>([]);
  // test-specific subjects metadata (from fatchTestSubject)
  const [testSubjects, setTestSubjects] = useState<TestSubject[]>([]);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // dropdown for add-question options
  const [showImportOptions, setShowImportOptions] = useState<boolean>(false);

  // Fetch available subjects once
  useEffect(() => {
    let mounted = true;
    const loadAvailable = async () => {
      try {
        const res = await fetchAvailableSubjects();
        // defensive checks for response structure
        if (res?.status && res.data?.results && Array.isArray(res.data.results)) {
          const normalized = res.data.results.map((s: any) => ({
            _id: s._id,
            title: s.title ?? s.name ?? "Untitled",
          }));
          if (mounted) setAvailableSubjects(normalized);
        }
      } catch (err) {
        // non-fatal; log
        // eslint-disable-next-line no-console
        console.error("Failed to fetch available subjects", err);
      }
    };

    loadAvailable();
    return () => {
      mounted = false;
    };
  }, []);

  // Load questions for the test and test subjects metadata
  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      if (!testId) {
        if (mounted) {
          setSubjects([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const res = await fetchTestQuestions(testId);
        if (res?.status && res.data?.subjects && Array.isArray(res.data.subjects)) {
          // keep types consistent: ensure each subject has `sub_id`, `name`, `questions`
          const normalized: SubjectDefinition[] = res.data.subjects.map((s: any) => ({
            sub_id: s.sub_id ?? s._id ?? String(s.id ?? ""),
            name: s.name ?? s.title ?? "Untitled",
            no_of_question: s.no_of_question ?? (s.questions?.length ?? 0),
            questions: Array.isArray(s.questions) ? s.questions : [],
          }));
          if (mounted) setSubjects(normalized);
        } else {
          // unexpected response — clear subjects and show nothing fatal
          if (mounted) setSubjects([]);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error fetching questions:", err);
        if (mounted) setError("Failed to fetch questions.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const loadTestSubjects = async () => {
      if (!testId) return;
      try {
        const res = await fatchTestSubject(testId);
        // defensive access — many APIs wrap results differently
        const dataArray = res?.data?.data ?? res?.data ?? [];
        if (Array.isArray(dataArray)) {
          // normalize to TestSubject
          const normalized: TestSubject[] = dataArray.map((s: any) => ({
            _id: s._id ?? s.sub_id ?? s.id,
            title: s.title ?? s.name ?? "Untitled",
            no_of_question: s.no_of_question ?? s.questions_count ?? undefined,
            subject_time: s.subject_time,
            qlimit: s.qlimit,
          }));
          setTestSubjects(normalized);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log("No subjects found or failed to load test subjects", err);
      }
    };

    fetchQuestions();
    loadTestSubjects();

    return () => {
      mounted = false;
    };
  }, [testId]);

  /**
   * handleAddSubject must match AddSubjectModal's expected callback:
   * onAddSubject: (payload: { name: string; no_of_question: number; subjectId?: string }) => void
   */
  const handleAddSubject = useCallback(
    async ({
      name,
      no_of_question,
      subjectId,
    }: {
      name: string;
      no_of_question: number;
      subjectId?: string;
    }) => {
      try {
        if (!testId) {
          alert("Missing test ID.");
          return;
        }

        const payload = {
          name,
          testId,
          no_of_question,
          subjectId,
        };

        // create subject - adapt as per your backend
        const res = await createSubject(payload);

        if (res?.status && res.data) {
          const createdId = res.data.data?._id ?? res.data.data?.id ?? res.data._id;
          if (!createdId) {
            alert("Failed to add subject (no id returned).");
            return;
          }

          // attach subject to test
          await addSubjecttoTest({
            testId,
            subjectId: createdId,
            questions: no_of_question,
          });

          // refresh test subjects and questions
          // re-fetch test subjects
          try {
            const ts = await fatchTestSubject(testId);
            const arr = ts?.data?.data ?? ts?.data ?? [];
            if (Array.isArray(arr)) {
              const normalized = arr.map((s: any) => ({
                _id: s._id ?? s.sub_id ?? s.id,
                title: s.title ?? s.name ?? "Untitled",
                no_of_question: s.no_of_question,
                subject_time: s.subject_time,
                qlimit: s.qlimit,
              }));
              setTestSubjects(normalized);
            }
          } catch (err) {
            // best-effort refresh
            // eslint-disable-next-line no-console
            console.warn("Failed to refresh test subjects", err);
          }

          // Optional: re-fetch questions for the test (if adding created questions)
          try {
            const qRes = await fetchTestQuestions(testId);
            if (qRes?.status && qRes.data?.subjects) {
              const normalized: SubjectDefinition[] = qRes.data.subjects.map((s: any) => ({
                sub_id: s.sub_id ?? s._id ?? String(s.id ?? ""),
                name: s.name ?? s.title ?? "Untitled",
                no_of_question: s.no_of_question ?? (s.questions?.length ?? 0),
                questions: Array.isArray(s.questions) ? s.questions : [],
              }));
              setSubjects(normalized);
            }
          } catch {
            // ignore
          }
        } else {
          alert("Failed to add subject.");
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Add subject error:", err);
        alert("An error occurred while adding the subject.");
      }
    },
    [testId]
  );

  // import handlers navigate to import pages for currently active subject
  const handleImport = (type: "doc" | "excel" | "manual") => {
    setShowImportOptions(false);
    const subjectId = subjects[activeIndex]?.sub_id;
    if (!testId || !subjectId) {
      alert("Please select a subject first.");
      return;
    }
    if (type === "doc") {
      navigate(`/admin/tests/${testId}/subjects/${subjectId}/import-doc`);
    } else if (type === "excel") {
      navigate(`/admin/tests/${testId}/subjects/${subjectId}/import-excel`);
    } else if (type === "manual") {
      navigate(`/admin/tests/${testId}/subjects/${subjectId}/import-manual`);
    }
  };

  // Loading / error UI
  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <>
      <div className="m-2">
        <h2>Tests</h2>
      </div>

      <div className="m-4 p-4 rounded">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9 p-2 bg-white">
            <h1 className="text-xl font-semibold text-gray-800">Questions</h1>
            <div />
          </div>

          <div className="col-span-3 p-2 bg-white">
            <h1 className="text-xl font-semibold text-gray-800">Subjects</h1>

            <div className="mb-4">
              {testSubjects.length === 0 && (
                <div className="text-sm text-gray-500">No subjects added to this test.</div>
              )}

              {testSubjects.map((sub, index) => (
                <div
                  key={sub._id ?? index}
                  className="mb-2 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{sub.title}</h3>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-700">Questions:</span>{" "}
                      {sub.no_of_question ?? "—"}
                    </p>

                    <p>
                      <span className="font-medium text-gray-700">Time:</span>{" "}
                      {sub.subject_time ?? "—"}
                    </p>

                    <p>
                      <span className="font-medium text-gray-700">Limit:</span>{" "}
                      {sub.qlimit ?? "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MathJaxContext
        version={3}
        config={{
          loader: { load: ["input/tex", "output/chtml"] },
          tex: {
            inlineMath: [["\\(", "\\)"]],
            displayMath: [["\\[", "\\]"]],
          },
        }}
      >
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm border">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Questions for Test: {testId}
              </h1>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="text-sm px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                >
                  + Add Subject
                </button>

                <AddSubjectModal
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  availableSubjects={availableSubjects}
                  onAddSubject={({ name, no_of_question, subjectId }) =>
                    handleAddSubject({
                      name,
                      no_of_question: Number(no_of_question),
                      subjectId,
                    })
                  }
                />

                <button
                  onClick={() => navigate(-1)}
                  className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
                >
                  ← Back
                </button>
              </div>
            </div>

            {/* Subject Tabs */}
            <SubjectTabs
              subjects={subjects}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />

            {/* Subject name + Add Question menu */}
            <div className="flex items-center justify-between mb-4 relative">
              <input
                type="text"
                value={subjects[activeIndex]?.name ?? ""}
                onChange={(e) => {
                  const updated = [...subjects];
                  // guard index
                  if (updated[activeIndex]) {
                    updated[activeIndex] = {
                      ...updated[activeIndex],
                      name: e.target.value,
                    };
                    setSubjects(updated);
                  }
                }}
                className="text-lg font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-orange-500 px-2 py-1 w-full max-w-sm"
                placeholder="Enter subject name"
              />

              <div className="relative">
                <button
                  onClick={() => setShowImportOptions(!showImportOptions)}
                  className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
                >
                  + Add Question
                </button>

                {showImportOptions && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md overflow-hidden border z-10">
                    <button
                      onClick={() => handleImport("doc")}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      📄 From Doc
                    </button>
                    <button
                      onClick={() => handleImport("excel")}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      📊 From Excel
                    </button>
                    <button
                      onClick={() => handleImport("manual")}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      ✏️ Manual
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Questions list */}
            {subjects[activeIndex]?.questions?.length ? (
              <div className="space-y-4">
                {subjects[activeIndex].questions.map((q, i) => (
                  <div
                    key={q._id}
                    className="bg-gray-50 p-4 rounded-md shadow-sm border text-gray-800"
                  >
                    <div className="font-medium text-gray-700 mb-1">
                      Q{i + 1}:
                      <MathJax hideUntilTypeset="first">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: enhanceImages(q.en?.ques ?? ""),
                          }}
                        />
                      </MathJax>

                      {q.en?.options?.map((opt, optIndex) => (
                        <MathJax hideUntilTypeset="first" key={optIndex}>
                          <div className="pl-4 py-1 text-gray-700 flex items-start gap-2">
                            <span className="font-medium">{optIndex + 1}).</span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: enhanceImages(opt),
                              }}
                            />
                          </div>
                        </MathJax>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500">
                      Type: {q.question_type ?? "—"}, Marks: {q.marks_positive ?? "—"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No questions available.</div>
            )}
          </div>
        </div>
      </MathJaxContext>
    </>
  );
}
