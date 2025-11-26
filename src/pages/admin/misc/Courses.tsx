import {courseList, updateCourse, deleteCourse, createCourse} from '@/services/admin/misc'
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import {  Course } from '@/types/common';

const Courses = () => {
  const [list,setList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(()=>{
    try{
      const fetchData = async () =>{
           try {
              const res = await courseList({pageSize,currentPage }); 

              if(res.status){
                 setList(res.results);
                 setTotalPages(Math.ceil(res.total / pageSize));
                  if (res.total && res.total < (currentPage - 1) * pageSize) {
                    setCurrentPage(1);
                  }
              }else{
                 throw new Error('No Data Found');
              }
           } catch (err) {
              setError('Failed to load Course');
           } finally {
            setLoading(false);
          }
      }
     fetchData();
    } catch (err){

    }
  },[currentPage, pageSize]);


  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setEditingCourse(null);
  };

const handleDeleteClick = async (courseId: String) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;
    try {
        const res = await deleteCourse({ courseId });
        if (res.status || res.data?.status) {
          // Refresh the list
          const updatedList = await courseList({pageSize,currentPage });
          setList(updatedList.results);
          setTotalPages(Math.ceil(updatedList.total / pageSize));
        } else {
          alert('Delete failed');
        }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting the course');
    }

}

const handleSave = async () => {
  if (!editingCourse) return;
  try {
    let res;
    if (editingCourse._id) {
      res = await updateCourse(editingCourse._id, {
        title: editingCourse.title,
        status: editingCourse.status,
        sort_id: editingCourse.sort_id,
      });
    } else {
      res = await createCourse({
        title: editingCourse.title,
        status: editingCourse.status,
        sort_id: editingCourse.sort_id,
      });
    }

    if (res.status === 200 || res.status) {
      const refreshed = await courseList({ pageSize,currentPage });
      setList(refreshed.results);
      setTotalPages(Math.ceil(refreshed.total / pageSize));
      handleCloseModal();
    } else {
      alert('Save failed');
    }
  } catch (err) {
    console.error('Failed to save course:', err);
    alert('An error occurred while saving.');
  }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
      <>
      <div className="m-2"><h2>Course List</h2></div>
      <div className="m-4 p-4 bg-white ounded rounded-xm">
        
        <button
          onClick={() => {
            setEditingCourse({
              _id: '', // placeholder for new
              title: '',
              status: 0,
              sort_id: 0,
              src: '',
            });
            setEditModalOpen(true);
          }}
          className="px-2 py-1 my-2 text-sm bg-green-600 text-white rounded rounded-sm shadow hover:bg-green-700"
        >
          + Add New Course
        </button>

        <table className="min-w-full  divide-y divide-gray-200 text-sm text-left text-gray-700 border border-gray-300">
          <thead>
          <tr>
            <th className="w-[30px] border border-gray-300 px-2 py-2">S.No.</th>
            <th className="border border-gray-300 px-2 py-2">Title</th>
            <th className="border border-gray-300 px-2 py-2">Status</th>
            <th className="border border-gray-300 px-2 py-2">Image</th>
            <th className="border border-gray-300 px-2 py-2">Order</th>
            <th className="border border-gray-300 px-2 py-2">Action</th>
          </tr>
           </thead>
           <tbody>
          {list.map((crs,index)=>(
            <tr key={index}>
            <td className="border border-gray-300 px-2 py-2">{(currentPage - 1) * pageSize + index + 1}.</td>
            <td className="border border-gray-300 px-2 py-2">{crs.title}</td>
            <td className="border border-gray-300 px-2 py-2">{crs.status}</td>
            <td className="border border-gray-300 px-2 py-2"></td>
            <td className="border border-gray-300 px-2 py-2">{crs.sort_id}</td>
            <td className="border border-gray-300 px-2 py-2">
               <button
                  onClick={() => handleEditClick(crs)}
                  className="px-2 py-1 mx-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteClick(crs._id)}
                  className="px-2 py-1 mx-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1); // reset to first page on size change
            }}
        />



         {isEditModalOpen && editingCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Edit Course</h2>

                <div className="mb-4">
                  <label className="block mb-1 text-sm">Title</label>
                  <input
                    type="text"
                    value={editingCourse.title}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, title: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm">Status</label>
                  <select
                    value={editingCourse.status}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, status: Number(e.target.value)  })
                    }
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm">Sort ID</label>
                  <input
                    type="number"
                    value={editingCourse.sort_id}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, sort_id: Number(e.target.value) })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
      </>
  );
};

export default Courses;
