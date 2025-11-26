import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getTestsByTestSeriesId } from "@/services/admin/package";
import { createTest } from "@/services/admin/tests";

import TestActionMenu from "@/pages/admin/testpackage/components/TestActionMenu";
import AddTest from "@/pages/admin/testpackage/components/AddTest";

// ---------------------
// Define Test Interface
// ---------------------
interface TestItem {
  _id: string;
  test_name: string;
  time_limit: number;
  total_qs: number;
  max_score: number;
  status: string;
}

// ---------------------
// Component Start
// ---------------------
const TsTests: React.FC = () => {
  const { tsId } = useParams<{ tsId: string }>();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [list, setList] = useState<TestItem[]>([]);

  // -----------------------------
  // Fetch Tests List
  // -----------------------------
  const fetchTsTests = async () => {
    try {
      if (!tsId) return;

      const res = await getTestsByTestSeriesId({
  tsId,
  currentPage: 1,
  pageSize: 20,
});

      setList(res.data.tests || []);
    } catch (err) {
      console.error("Failed to fetch tests:", err);
    }
  };

  useEffect(() => {
    fetchTsTests();
  }, [tsId]);

  // -----------------------------
  // Handle Add Test Form Submit
  // -----------------------------
  const handleFormSubmit = async (data: any) => {
    try {
      await createTest(data);
      fetchTsTests();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Saving failed!");
    }
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="m-2">
        <h2>Tests</h2>
      </div>

      <div className="m-4 p-4 bg-white rounded-md">
        <button
          className="px-2 py-1 my-2 text-sm bg-green-600 text-white rounded shadow hover:bg-green-700"
          onClick={() => setEditModalOpen(true)}
        >
          + Add Test
        </button>

        <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
          <thead>
            <tr>
              <th className="w-[30px]">S.No.</th>
              <th>#</th>
              <th>Title</th>
              <th>Time Limit</th>
              <th>Total Qs</th>
              <th>Max Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((tst, index) => (
              <tr key={tst._id} className="odd:bg-gray-50 even:bg-white">
                <td>{index + 1}.</td>
                <td>#</td>

                <td>
                  <Link to={`/admin/tests/${tst._id}/viewquestion`}>
                    {tst.test_name}
                  </Link>
                </td>

                <td>{tst.time_limit}</td>
                <td>{tst.total_qs}</td>
                <td>{tst.max_score}</td>
                <td>{tst.status}</td>

                <td>
                  <TestActionMenu
                    onEdit={() => console.log("Edit:", tst._id)}
                    onAddQuestions={() =>
                      console.log("Add questions:", tst._id)
                    }
                    onViewQuestions={() =>
                      console.log("View questions:", tst._id)
                    }
                    onTakeTest={() => console.log("Take test:", tst._id)}
                    onDelete={() => console.log("Delete:", tst._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Test Modal */}
        {isEditModalOpen && tsId && (
          <AddTest
            name="Add Test"
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
            tsId={tsId}
          />
        )}
      </div>
    </>
  );
};

export default TsTests;
