const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="md:hidden">
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <span className="text-sm hidden sm:inline">Admin</span>
        <img src="https://i.pravatar.cc/40" className="rounded-full w-8 h-8" alt="avatar" />
      </div>
    </header>
  );
};

export default Header;
