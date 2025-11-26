import React, { useState } from "react";
import { studentMenu } from "@/constants/studentMenu";

import {
  ChevronRight,
  Circle,
  LayoutDashboard,
  Users,
  Settings,
  MessageSquare,
  BookOpen,
  ClipboardList,
  ListChecks,
  School,
  MoreHorizontal,
  Video,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  title: string;
  href?: string;
  icon?: string;
  children?: MenuItem[];
}

// Map icon strings → actual components
const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard,
  Users,
  Settings,
  MessageSquare,
  BookOpen,
  ClipboardList,
  Video,
  ListChecks,
  School,
  MoreHorizontal,
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-full w-64 bg-[#373a37] text-[#f2f2f2] shadow-md transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
    >
      {/* Header */}
      <div className="p-4 text-lg font-bold flex justify-between items-center border-b">
        Student Panel
        <button className="md:hidden text-sm text-red-600" onClick={toggleSidebar}>
          ✕
        </button>
      </div>

      {/* Menu */}
      <ul>
        {studentMenu.map((item: MenuItem, idx: number) => {
          const Icon = item.icon ? iconMap[item.icon] || Users : Users;

          return (
            <li key={idx}>
              {item.children ? (
                <>
                  {/* Parent item */}
                  <div
                    className="flex items-center justify-between px-6 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => toggleDropdown(item.title)}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.title ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown children */}
                  {openDropdown === item.title && (
                    <ul className="text-sm bg-[#2f312f]">
                      {item.children.map((child, childIdx) => (
                        <li key={childIdx}>
                          <a
                            href={child.href}
                            className="block px-8 py-2 hover:bg-gray-800 text-gray-200 flex items-center gap-2"
                          >
                            <Circle className="w-2 h-2" />
                            {child.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                /* Regular link */
                <a
                  href={item.href}
                  className="block px-6 py-2 hover:bg-gray-800 cursor-pointer flex gap-2 items-center"
                >
                  <Icon className="w-4 h-4" />
                  {item.title}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
