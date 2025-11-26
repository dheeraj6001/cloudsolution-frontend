import { useEffect, useState } from "react";
import {
  Trash2,
  Edit,
  Search,
  UserPlus,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

/* ---------------------------------------------------------
   TYPES
--------------------------------------------------------- */

export interface Student {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: number;
  status: number; // 0 = inactive, 1 = active
}

interface StudentListResponse {
  status: boolean;
  results: Student[];
  total: number;
}

interface StudentListParams {
  currentPage: number;
  pageSize: number;
}

interface DeleteStudentParam {
  sid: string;
}

/* ---------------------------------------------------------
   MOCK API (Replace with real API)
--------------------------------------------------------- */

const studentList = async ({
  currentPage,
  pageSize,
}: StudentListParams): Promise<StudentListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockData: Student[] = Array.from({ length: pageSize }, (_, i) => ({
    _id: `student-${currentPage}-${i}`,
    firstname: ["John", "Jane", "Mike", "Sarah", "David"][i % 5],
    lastname: ["Doe", "Smith", "Johnson", "Williams", "Brown"][i % 5],
    email: `student${currentPage}${i}@example.com`,
    mobile: 9876543210 + i,
    status: i % 3 === 0 ? 0 : 1,
  }));

  return {
    status: true,
    results: mockData,
    total: 47,
  };
};

const deleteStudent = async ({
  sid: _sid,
}: DeleteStudentParam): Promise<{ status: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { status: true };
};

const deleteStudentsBulk = async (
  _ids: string[]
): Promise<{ status: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { status: true };
};

/* ---------------------------------------------------------
   PAGINATION COMPONENT (Fully Typed)
--------------------------------------------------------- */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) => (
  <div className="flex items-center justify-between mt-6 px-4">
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Rows per page:</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        {[5, 10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
      >
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  </div>
);

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */

const Students = () => {
  const [list, setList] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | "bulk" | null>(
    null
  );

  /* ---------------------------------------------------------
     FETCH STUDENTS
  --------------------------------------------------------- */

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await studentList({ currentPage, pageSize });

        if (!res.status) throw new Error("API Error");

        setList(res.results);
        setTotalPages(Math.ceil(res.total / pageSize));

        // Reset page if overflow
        if (res.total < (currentPage - 1) * pageSize) {
          setCurrentPage(1);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage, pageSize]);

  /* ---------------------------------------------------------
     SEARCH FILTERING
  --------------------------------------------------------- */

  const filteredList = list.filter((student) => {
    const q = searchQuery.toLowerCase();
    return (
      student.firstname.toLowerCase().includes(q) ||
      student.lastname.toLowerCase().includes(q) ||
      student.email.toLowerCase().includes(q) ||
      student.mobile.toString().includes(q)
    );
  });

  /* ---------------------------------------------------------
     DELETE HANDLERS
  --------------------------------------------------------- */

  const handleDelete = async (id: string) => {
    await deleteStudent({ sid: id });
    setList((prev) => prev.filter((s) => s._id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    setDeleteConfirm(null);
  };

  const handleBulkDelete = async () => {
    await deleteStudentsBulk(selectedIds);
    setList((prev) => prev.filter((s) => !selectedIds.includes(s._id)));
    setSelectedIds([]);
    setDeleteConfirm(null);
  };

  /* ---------------------------------------------------------
     TABLE, UI & MODALS
  --------------------------------------------------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Student Management</h1>
            <p className="text-gray-500 text-sm">Manage students easily</p>
          </div>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl">
            <UserPlus size={18} />
            Add Student
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl"
            />
          </div>

          {selectedIds.length > 0 && (
            <button
              onClick={() => setDeleteConfirm("bulk")}
              className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl"
            >
              <Trash2 size={18} />
              Delete ({selectedIds.length})
            </button>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 border border-red-200 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      filteredList.length > 0 &&
                      selectedIds.length === filteredList.length
                    }
                    onChange={(e) =>
                      setSelectedIds(
                        e.target.checked
                          ? filteredList.map((s) => s._id)
                          : []
                      )
                    }
                  />
                </th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Mobile</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No students found
                  </td>
                </tr>
              )}

              {filteredList.map((student, index) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>

                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(student._id)}
                      onChange={(e) =>
                        setSelectedIds((prev) =>
                          e.target.checked
                            ? [...prev, student._id]
                            : prev.filter((id) => id !== student._id)
                        )
                      }
                    />
                  </td>

                  <td className="px-4 py-3">
                    {student.firstname} {student.lastname}
                  </td>

                  <td className="px-4 py-3">{student.email}</td>

                  <td className="px-4 py-3">{student.mobile}</td>

                  <td className="px-4 py-3">
                    {student.status === 1 ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle size={14} /> Active
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} /> Inactive
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setEditingStudent(student)}
                        className="text-blue-600 hover:opacity-70"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(student._id)}
                        className="text-red-600 hover:opacity-70"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
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

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold mb-2 text-center">
              Confirm Delete
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {deleteConfirm === "bulk"
                ? `Delete ${selectedIds.length} selected students?`
                : "Are you sure you want to delete this student?"}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  deleteConfirm === "bulk"
                    ? handleBulkDelete()
                    : handleDelete(deleteConfirm)
                }
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                Delete
              </button>

              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-center">
              Edit Student
            </h3>

            <div className="space-y-4">
              {(["firstname", "lastname", "email", "mobile"] as const).map(
                (field) => (
                  <div key={field}>
                    <label className="text-sm font-medium capitalize">
                      {field}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={editingStudent[field]}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          [field]:
                            field === "mobile"
                              ? Number(e.target.value)
                              : e.target.value,
                        })
                      }
                      className="w-full border px-3 py-2 rounded-lg mt-1"
                    />
                  </div>
                )
              )}

              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  value={editingStudent.status}
                  onChange={(e) =>
                    setEditingStudent({
                      ...editingStudent,
                      status: Number(e.target.value),
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg mt-1"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setList((prev) =>
                    prev.map((s) =>
                      s._id === editingStudent._id ? editingStudent : s
                    )
                  );
                  setEditingStudent(null);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditingStudent(null)}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
