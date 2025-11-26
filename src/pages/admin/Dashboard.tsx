export default function Dashboard() {
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
          <p className="text-gray-500">Users</p>
          <h2 className="text-2xl font-bold">1,284</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold">$21,430</h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-2xl font-bold">345</h2>
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