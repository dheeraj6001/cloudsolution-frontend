import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@/components/Pagination';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = `http://localhost:3000/superadmin/enquiry?page=${currentPage}&limit=${pageSize}`;

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch enquiries');

        const data = await response.json();
        setEnquiries(data.data.results);
        setTotalPages(Math.ceil(data.data.total / pageSize));
        if (data.data.total && data.data.total < (currentPage - 1) * pageSize) {
          setCurrentPage(1);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, [currentPage, pageSize]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentIds = enquiries.map((e) => e.id);
    const allSelected = currentIds.every((id) => selectedIds.includes(id));

    setSelectedIds((prev) =>
      allSelected ? prev.filter((id) => !currentIds.includes(id)) : [...new Set([...prev, ...currentIds])]
    );
  };

  const handleSendEmail = () => {
    const selectedEmails = enquiries
      .filter((e) => selectedIds.includes(e.id))
      .map((e) => e.email);

    if (selectedEmails.length === 0) {
      alert('No enquiries selected.');
      return;
    }

    alert(`Sending email to:\n${selectedEmails.join(', ')}`);
    // You can POST to an email API here
  };

  return (
    <div className="">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4 text-gray-600">
        <ol className="list-reset flex">
          <li>
            <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-800 font-medium">Enquiries</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Enquiry List</h1>
        <div className="flex gap-2">
          <button onClick={handleSendEmail} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">Send Email</button>
          <button onClick={() => window.location.reload()} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-300">Refresh</button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading enquiries...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* Table */}
      {!loading && !error && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="py-3 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={enquiries.length > 0 && enquiries.every((e) => selectedIds.includes(e.id))}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b">Mobile</th>
                  <th className="py-3 px-4 border-b">Subject</th>
                  <th className="py-3 px-4 border-b">Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((item) => (
                  <tr key={item.id} className="text-sm text-gray-800 hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                    <td className="py-3 px-4 border-b">{item.name}</td>
                    <td className="py-3 px-4 border-b">{item.email}</td>
                    <td className="py-3 px-4 border-b">{item.mobile}</td>
                    <td className="py-3 px-4 border-b">{item.subject}</td>
                    <td className="py-3 px-4 border-b">{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
        </>
      )}
    </div>
  );
};

export default Enquiry;
