import { useState } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Home,
  ShoppingCart,
  BarChart3,
  FileStack
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [usersOpen, setUsersOpen] = useState<boolean>(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b bg-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="font-semibold text-white">Books</span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            <div
              onClick={() => navigate("/admin/dashboard")}
              className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <Home size={18} />
              <span>Home</span>
            </div>

            <div
              onClick={() => navigate("/admin/students")}
              className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <Home size={18} />
              <span>Students</span>
            </div>

            <div
              onClick={() => navigate("/admin/packages")}
              className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <Home size={18} />
              <span>Packages</span>
            </div>

            <div
              onClick={() => navigate("/admin/sales")}
              className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <ShoppingCart size={18} />
              <span>Sales</span>
            </div>

            <div>
              <div
                onClick={() => setUsersOpen(prev => !prev)}
                className="px-3 py-2 flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileStack size={18} />
                  <span>Documents</span>
                </div>
                {usersOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>

              {usersOpen && (
                <div className="ml-9 mt-1">
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    News
                  </div>
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    Time Table
                  </div>
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    Syllabus
                  </div>
                </div>
              )}
            </div>

            <div
              onClick={() => navigate("/admin/view-solutions")}
              className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <BarChart3 size={18} />
              <span>Reports</span>
            </div>
          </div>
        </nav>
      </aside>

      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 md:hidden z-40 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:from-indigo-700 hover:to-purple-700"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
}
