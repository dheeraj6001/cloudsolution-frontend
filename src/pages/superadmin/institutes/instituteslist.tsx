import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Institue {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  site_url: string;
  status: string; 
}


const InstituteList = () => {
 const [institutes, setInstitutes] = useState<Institue[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const API_URL = `http://localhost:3000/superadmin/institutes?page=${currentPage}&limit=${pageSize}`;

  useEffect(() => {
    const fetchInstitues = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch enquiries');

        const data = await response.json(); console.log(data.data.results);
        setInstitutes(data.data.results);
        // setTotalPages(data.data.total || 1);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setLoading(false);
      }
    };

    fetchInstitues();
  }, [currentPage]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const currentIds = institutes.map((e) => e.id);
    const allSelected = currentIds.every((id) => selectedIds.includes(id));

    setSelectedIds((prev) =>
      allSelected ? prev.filter((id) => !currentIds.includes(id)) : [...new Set([...prev, ...currentIds])]
    );
  };

  const handleClick = async (url: string) => {
    try {
        const API_URL = `http://localhost:3000/superadmin/instituteurl/${url}`;
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();  console.log(result);
        const token = result?.data;

        if (!token) {
          throw new Error('Token not found in response');
        }

        localStorage.setItem('admin_token', token);

        const redirectUrl = `/admin/dashboard`;

        window.location.href = redirectUrl;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return <>
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

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Institute List</h1>
        <div className="flex gap-2">
          {/*<button onClick={handleSendEmail} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">Send Email</button>*/}
          {/*<button onClick={() => window.location.reload()} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-300">Refresh</button>*/}
        </div>
      </div>

      {loading && <p>Loading enquiries...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="py-3 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={institutes.length > 0 && institutes.every((e) => selectedIds.includes(e.id))}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b">Mobile</th>
                  <th className="py-3 px-4 border-b">Url</th>
                  <th className="py-3 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {institutes.map((item) => (
                  <tr key={item.id} className="text-sm text-gray-800 hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                     <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                    <td className="py-3 px-4 border-b">{item.firstname} {item.lastname}</td>
                    <td className="py-3 px-4 border-b">{item.email}</td>
                    <td className="py-3 px-4 border-b">{item.mobile}</td>
                    <td className="py-3 px-4 border-b"><a className="cursor-pointer" onClick={() => handleClick(item.site_url)} >{item.site_url}</a></td>
                    <td className="py-3 px-4 border-b">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
<button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>

          </div>
      )}
  </>;
};

export default InstituteList;
