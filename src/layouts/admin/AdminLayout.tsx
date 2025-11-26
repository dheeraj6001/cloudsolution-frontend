import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import AdminSidebar from './Sidebar';
import AdminHeader from './Header';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && (
        <div
          id="backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );
};

export default AdminLayout;