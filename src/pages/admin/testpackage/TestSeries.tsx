import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createTestSeries,
  testSeriesList,
  deleteTestSeries,
} from "@/services/admin/package";

// --------------------
// Type Definitions
// --------------------

export interface TestSeries {
  _id: string;
  name: string;
  status?: number;
  testsCount?: number;
}

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
}

// --------------------
// Modal Component
// --------------------
const Modal: React.FC<ModalProps> = ({ title, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/20">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Save Test Series
          </button>
        </form>
      </div>
    </div>
  );
};

// --------------------
// TestSeries Page
// --------------------

const TestSeries: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [list, setList] = useState<TestSeries[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Fetch test series
  useEffect(() => {
    getTestSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const getTestSeries = async () => {
    try {
      setLoading(true);
      const res = await testSeriesList({ pageSize, currentPage });

      if (res.status) {
        setList(res.data);
        setTotalPages(Math.ceil(res.total / pageSize));

        if (res.total && res.total < (currentPage - 1) * pageSize) {
          setCurrentPage(1);
        }
      } else {
        throw new Error("No Data Found");
      }
    } catch (err) {
      setError("Failed to load Test Series");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (tsId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Test Series?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteTestSeries({ tsId });
      if (res.status) {
        getTestSeries();
        alert("Test Series Deleted Successfully");
      }
    } catch (error) {
      alert("Error deleting Test Series: " + error);
    }
  };

  const handleFormSubmit = async (data: { name: string }) => {
    try {
      const res = await createTestSeries(data);

      if (res.status) {
        getTestSeries();
        setModalOpen(false);
        alert("Test Series saved!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Saving failed!");
    }
  };



  return (
    <>

    {error && (
  <div className="p-2 my-2 text-red-700 bg-red-100 border border-red-300 rounded">
    {error}
  </div>
)}

    {loading && <div className="p-2 text-gray-500">Loading...</div>}


      <div className="m-2">
        <h2 className="text-xl font-bold">Test Series</h2>
      </div>

      <div className="m-4 p-4 bg-white rounded shadow">
        <button
          onClick={() => setModalOpen(true)}
          className="px-2 py-1 my-2 text-sm bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          + Add New Test Series
        </button>

        <div className="mb-4">
  <label className="mr-2">Page Size:</label>
  <select
    value={pageSize}
    onChange={(e) => setPageSize(Number(e.target.value))}
    className="border rounded px-2 py-1"
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
  </select>
</div>

        <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700">
          <thead>
            <tr>
              <th className="w-[50px]">S.No.</th>
              <th>Test Series Name</th>
              <th>No. of Tests</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((ts, index) => (
              <tr key={ts._id} className="odd:bg-gray-50">
                <td>{(currentPage - 1) * pageSize + index + 1}.</td>

                <td>
                  <Link
                    to={`/admin/test-series/${ts._id}/tests`}
                    className="text-blue-600 hover:underline"
                  >
                    {ts.name}
                  </Link>
                </td>

                <td>{ts.testsCount ?? "-"}</td>

                <td>{ts.status === 1 ? "Active" : "Inactive"}</td>

                <td>
                  <button className="px-2 py-1 mx-1 text-sm rounded bg-green-600 text-white hover:bg-green-700">
                    Edit
                  </button>

                  <button
                    className="px-2 py-1 mx-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                    onClick={() => handleDeleteClick(ts._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
  <span className="mr-4">
    Page {currentPage} of {totalPages}
  </span>

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="px-3 py-1 border rounded mr-2"
  >
    Prev
  </button>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="px-3 py-1 border rounded"
  >
    Next
  </button>
</div>


      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal title="Add Test Series" onClose={() => setModalOpen(false)} onSubmit={handleFormSubmit} />
      )}
    </>
  );
};

export default TestSeries;
