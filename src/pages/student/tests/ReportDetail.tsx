import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your real API call
    fetch(`/api/student/reports/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!report) return <div className="p-6">Report not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Test Report: {report.testName}</h2>
      <p className="mb-2 text-gray-600">Date: {report.date}</p>
      <p className="mb-4 text-gray-600">Score: {report.score} / {report.total}</p>

      <div className="space-y-4">
        {report.questions.map((q: any, idx: number) => (
          <div key={idx} className="p-4 border rounded-md shadow-sm bg-white">
            <p className="font-semibold">{idx + 1}. {q.question}</p>
            <p className="text-sm mt-1">
              Your Answer: <span className={q.correct ? 'text-green-600' : 'text-red-600'}>{q.userAnswer}</span>
            </p>
            {!q.correct && (
              <p className="text-sm text-gray-500">
                Correct Answer: <span className="text-green-700">{q.correctAnswer}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportDetail;
