import { useEffect, useState } from 'react';
import { freetestList } from '@/services/student/tests';
import Pagination from '@/components/Pagination';

interface Test {
  _id: string;
  test_name: string;
  status: number;
  // Add more fields if needed
}

const FreeTest = () => {
  const [list, setList] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await freetestList({ currentPage, pageSize });
        const results = res.data?.results || [];
        const total = res.data?.total || 0;

        if (res.status && results) {
          setList(results);
          setTotalPages(Math.ceil(total / pageSize));

          // Reset currentPage if current is out of bounds
          if ((currentPage - 1) * pageSize >= total) {
            setCurrentPage(1);
          }
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load Tests');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;

  return (
    <>

    <div className="p-4">
  <h3 className="text-lg font-semibold mb-2">Exam content here</h3>
  
  <div className="flex flex-wrap">
      <div className="w-full sm:w-9/12 p-2">

        {list.length === 0 ? (
            <div>
             
            </div>
          ) : (
            list.map((test, index) => (


        <div key={index} className="bg-white p-4 rounded shadow text-sm">
           <div className="bg-white p-4 rounded-md shadow-sm border text-sm max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-base text-gray-800 mb-1">{test.test_name}</h2>
                <div className="flex gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <i className="lucide lucide-list-check w-4 h-4"></i>
                    <span>10 Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="lucide lucide-file-text w-4 h-4"></i>
                    <span>10 Marks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="lucide lucide-clock w-4 h-4"></i>
                    <span>13 Mins</span>
                  </div>
                </div>
              </div>

              <a
                href={`/testpanel/starttest/${test._id}`}
                className="text-blue-500 border border-blue-400 rounded px-3 py-1 hover:bg-blue-50 flex items-center gap-1"
              >
              <i className="lucide lucide-lock w-4 h-4"></i>
                Start Test
              </a>
              
            </div>

            <div className="mt-3 border-t pt-2 flex items-center text-blue-500 text-sm gap-2">
              <a href="#" className="hover:underline">Syllabus</a>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <i className="lucide lucide-globe w-4 h-4 text-blue-400"></i>
                English, Hindi
              </span>
            </div>
          </div>
        </div>
      ))
    )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); // Reset page when size changes
        }}
      />
      </div>

      <div className="w-full sm:w-3/12 p-2">
        
      </div>
</div>
</div>


      
    </>
  );
};

export default FreeTest;
