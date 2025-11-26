import { useEffect, useState } from 'react';
import { bookmarksQuestion } from '@/services/student/tests';
import Pagination from '@/components/Pagination';

interface BookmarkQuestion {
  _id: string;
  question: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
}

export default function BookMarksQuestions() {
  const [list, setList] = useState<BookmarkQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await bookmarksQuestion({ currentPage, pageSize });
        const results = res.data?.results || [];
        const total = res.data?.total || 0;

        if (res.status) {
          setList(results);
          setTotalPages(Math.ceil(total / pageSize));

          if ((currentPage - 1) * pageSize >= total) {
            setCurrentPage(1);
          }
        }
      } catch (err) {
        setError('Failed to load');
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
    <div>
    	<div className="mb-2"><h4>Book Marks Questions</h4></div>
      {list.map((item, index) => (
        <div key={item._id} className="p-4 bg-white border-b">
          <div
            className="font-medium text-gray-800 mb-2"
            dangerouslySetInnerHTML={{
              __html: `Q${(currentPage - 1) * pageSize + index + 1}. ${item.question}`,
            }}
          />
          <ul className="pl-5 space-y-1 text-sm text-gray-700 list-disc">
            <li dangerouslySetInnerHTML={{ __html: item.opt1 }} />
            <li dangerouslySetInnerHTML={{ __html: item.opt2 }} />
            <li dangerouslySetInnerHTML={{ __html: item.opt3 }} />
            <li dangerouslySetInnerHTML={{ __html: item.opt4 }} />
          </ul>
        </div>
      ))}

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
    </>
  );
}
