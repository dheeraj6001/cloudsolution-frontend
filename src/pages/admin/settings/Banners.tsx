import { useState } from "react";
import { Home, Settings, FileText, Image, Loader, Database, Globe, Activity, Puzzle } from "lucide-react";
import DashboardTab from "./tabs/DashboardTab";
import FileOptimizationTab from "./tabs/FileOptimizationTab";
import MediaTab from "./tabs/MediaTab";
import PreloadTab from "./tabs/PreloadTab";
import AdvancedRulesTab from "./tabs/AdvancedRulesTab";
import DatabaseTab from "./tabs/DatabaseTab";
import CDNTab from "./tabs/CDNTab";
import HeartbeatTab from "./tabs/HeartbeatTab";
import AddOnsTab from "./tabs/AddOnsTab";

const sidebarItems = [
  { icon: Home, label: "Dashboard" },
  { icon: FileText, label: "File Optimization" },
  { icon: Image, label: "Media" },
  { icon: Loader, label: "Preload" },
  { icon: Settings, label: "Advanced Rules" },
  { icon: Database, label: "Database" },
  { icon: Globe, label: "CDN" },
  { icon: Activity, label: "Heartbeat" },
  { icon: Puzzle, label: "Add-ons" },
];

export default function Banners() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardTab />;
      case "File Optimization":
        return <FileOptimizationTab />;
      case "Media":
        return <MediaTab />;
      case "Preload":
        return <PreloadTab />;
      case "Advanced Rules":
        return <AdvancedRulesTab />;
      case "Database":
        return <DatabaseTab />;
      case "CDN":
        return <CDNTab />;
      case "Heartbeat":
        return <HeartbeatTab />;
      case "Add-ons":
        return <AddOnsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 space-y-6">
        <h1 className="text-2xl font-bold text-orange-600">WP Rocket</h1>
        <nav className="space-y-1">
          {sidebarItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition ${
                activeTab === label ? "bg-orange-200 text-orange-800" : "text-gray-700"
              }`}
              onClick={() => setActiveTab(label)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">{activeTab}</h2>
        {renderTabContent()}
      </div>
    </div>
  );
}