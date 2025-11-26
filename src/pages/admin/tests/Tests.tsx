import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { testList } from "@/services/admin/tests";
import { useNavigate } from "react-router-dom";


type Test = {
  _id: string;
  test_name: string;
  status: number;
};

const Tests = () => {
  const [list, setList] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await testList({ pageSize, currentPage });  
        if (res.status) {
          setList(res.data);
          setTotalPages(Math.ceil(res.total / pageSize));
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
         // setError("Failed to load Tests");
      } finally {
         setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, pageSize]);

  const handleViewQuestions = (testId: string) => {
    navigate(`/admin/tests/${testId}/viewquestion`);
  };

  if (loading) return <p className="text-gray-600 text-center mt-10">Loading...</p>;
  // if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <>
    <div className="m-2"><h2>Tests List</h2></div>
    <div className="m-4 p-4 bg-white rounded rounded-xm">

    <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/admin/tests/new")}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
        >
          ➕ Add New Test
        </button>
    </div>
    
    <div className="">
      

      {list.length === 0 ? (
        <div className="text-center text-gray-500">No tests found</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 text-left"><input type="checkbox" /></th>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Test Name</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {list.map((test, index) => (
                <tr key={test._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="px-6 py-4">{(currentPage - 1) * pageSize + index + 1}</td>
                  <td className="px-6 py-4 font-medium">{test.test_name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        test.status === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {test.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewQuestions(test._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
                    >
                      View Questions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
     </div>
    </>
  );
};

export default Tests;
