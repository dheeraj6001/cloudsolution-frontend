import { useEffect, useState } from 'react';
import { totalStudents } from '@/services/superadmin/dashboard';

type TotalStudentResponse = {
  totalStudent: number;
  totalTests:number;
  totalQuestions:number;
  totalReports:number;
  totalPdfs:number;
  totalVideos:number;

};


export default function Dashboard() {
  const [TotalCount, setTotalCount] = useState<TotalStudentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await totalStudents(); // assume res is { status: true, data: "124" }
        if (res.status) {
          setTotalCount(res.data);
        } else {
          throw new Error('Invalid response');
        }
      } catch (err) {
        setError('Failed to load students');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-2xl font-bold">{TotalCount?.totalStudent ?? 'N/A'}</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Total Tests</p>
          <h2 className="text-2xl font-bold">{TotalCount?.totalTests ?? 'N/A'}</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Total Questions</p>
          <h2 className="text-2xl font-bold">{TotalCount?.totalQuestions ?? 'N/A'}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Total Reports</p>
          <h2 className="text-2xl font-bold">{TotalCount?.totalReports ?? 'N/A'}</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Total Pdfs</p>
          <h2 className="text-2xl font-bold">{TotalCount?.totalPdfs ?? 'N/A'}</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Total Videos</p>
          <h2 className="text-2xl font-bold">{TotalCount?.totalVideos ?? 'N/A'}</h2>
        </div>
      </div>


      {/* Placeholder Chart */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 h-64 flex items-center justify-center text-gray-400">
        [ Chart Placeholder ]
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="text-gray-600">🟢 New user <strong>Jane Doe</strong> signed up</li>
          <li className="text-gray-600">📦 Order #1023 was placed</li>
          <li className="text-gray-600">💬 Feedback received from <strong>Alex</strong></li>
        </ul>
      </div>
    </div>
  );
}
