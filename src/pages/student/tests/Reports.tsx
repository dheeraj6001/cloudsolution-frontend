import { useState, useEffect } from "react";
import { BadgeCheck, XCircle, Search, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { reports } from "@/services/student/tests";

// ---- Define Test interface ----
interface Test {
  id: number;
  testName: string;
  date: string;
  score: number;
  total: number;
  status: "Passed" | "Failed";
}

const TestReports = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, _setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // only value is used
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // ❗ search is NOT sent to backend
        const res = await reports({ currentPage, pageSize });

        const results: Test[] = res.data?.results || [];

        // local search filter
        const filtered = results.filter((item) =>
          item.testName.toLowerCase().includes(search.toLowerCase())
        );

        setList(filtered);
      } catch (err) {
        setError("Failed to load Tests");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize, search]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Test Reports</h2>

        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tests..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 font-medium text-gray-700">Test</th>
              <th className="p-3 font-medium text-gray-700">Date</th>
              <th className="p-3 font-medium text-gray-700">Score</th>
              <th className="p-3 font-medium text-gray-700">Status</th>
              <th className="p-3 font-medium text-gray-700 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {list.length > 0 ? (
              list.map((report) => (
                <tr
                  key={report.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{report.testName}</td>
                  <td className="p-3">{report.date}</td>
                  <td className="p-3">
                    {report.score} / {report.total}
                  </td>

                  <td className="p-3">
                    {report.status === "Passed" ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <BadgeCheck size={16} /> Passed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                        <XCircle size={16} /> Failed
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        navigate(`/student/reports/${report.id}`)
                      }
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-medium"
                    >
                      <FileText size={16} /> View Report
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500"
                >
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestReports;
