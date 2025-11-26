import  { useState } from 'react';
import { Menu, X, Search, Plus, Bell, Settings, User, ChevronRight, ChevronDown, Home, ShoppingCart, Package, CreditCard, Clock, DollarSign, FileText, BarChart3, FileStack, PlayCircle } from 'lucide-react';

export default function ZohoBooksDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);


  const cards = [
    {
      icon: '📊',
      title: 'Configure Chart of Accounts',
      description: 'The Chart of Accounts in Zoho Books contains a list of default accounts that can be used by any type of business. If there are other accounts that your business needs, you can create them.',
      primaryBtn: 'Configure',
      secondaryBtn: 'Watch & Learn'
    },
    {
      icon: '💰',
      title: 'Enter Opening Balances',
      description: "If you're migrating from another software you must enter the opening balances in Zoho Books before you start creating transactions to keep your books intact.",
      primaryBtn: 'Configure',
      secondaryBtn: 'Watch & Learn'
    },
    {
      icon: '💳',
      title: 'Connect with Payment Gateways',
      description: 'Integrate with one of the leading payment gateways and collect payments faster from your customers.',
      primaryBtn: 'Configure',
      secondaryBtn: 'Watch & Learn',
      logos: ['Zoho Payments', 'Stripe', 'PayPal']
    },
    {
      icon: '👥',
      title: 'Enable Customer and Vendor Portals',
      description: "Customer and vendor portals allow your customers and vendors to keep track and communicate with you about all the transactions that you've created for them.",
      primaryBtn: 'Set up',
      secondaryBtn: 'Watch & Learn'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300 flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-4 border-b bg-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">B</div>
            <span className="font-semibold text-white">Books</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            <div className="bg-blue-50 text-blue-600 rounded-lg px-3 py-2 flex items-center gap-3 font-medium">
              <Home size={18} />
              <span>Home</span>
            </div>
            
            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Package size={18} />
              <span>Items</span>
            </div>

            <div>
              <div 
                onClick={() => setUsersOpen(!usersOpen)}
                className="px-3 py-2 flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} />
                  <span>Users</span>
                </div>
                {usersOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              {usersOpen && (
                <div className="ml-9 mt-1">
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    Users Adjustments
                  </div>
                </div>
              )}
            </div>

             <div>
              <div 
                onClick={() => setInventoryOpen(!inventoryOpen)}
                className="px-3 py-2 flex items-center justify-between text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} />
                  <span>Inventory</span>
                </div>
                {inventoryOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              {inventoryOpen && (
                <div className="ml-9 mt-1">
                  <div className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                    Inventory Adjustments
                  </div>
                </div>
              )}
            </div>

            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
              <ShoppingCart size={18} />
              <span>Sales</span>
            </div>

            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
              <CreditCard size={18} />
              <span>Purchases</span>
            </div>

            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Clock size={18} />
              <span>Time Tracking</span>
            </div>

            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
              <DollarSign size={18} />
              <span>Banking</span>
            </div>

            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
              <User size={18} />
              <span>Accountant</span>
            </div>

            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
              <BarChart3 size={18} />
              <span>Reports</span>
            </div>

            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileStack size={18} />
              <span>Documents</span>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t">
          <div className="text-xs text-gray-500 mb-2">APPS</div>
          <div className="space-y-1">
            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer text-sm">
              <FileText size={16} />
              <span>Zoho Payroll</span>
            </div>
            <div className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer text-sm">
              <CreditCard size={16} />
              <span>Zoho Payments</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 bg-slate-800 text-white flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2 flex-1 max-w-md">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search in Customers ( / )" 
                className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="text-xs md:text-sm text-gray-300 hidden sm:block">Your premium trial pla...</button>
            <button className="text-xs md:text-sm text-blue-400">Subscribe</button>
            <button className="bg-blue-500 rounded-lg p-2">
              <Plus size={20} />
            </button>
            <button className="hidden md:block">
              <Bell size={20} />
            </button>
            <button className="hidden md:block">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              M
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Hello, Dheerak Kumar</h1>
                  <p className="text-sm text-gray-500">pSOFTS</p>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Zoho Books India Helpline: 18003093036</div>
                  <div className="text-xs">Mon - Fri • 9:00 AM - 7:00 PM • Toll Free</div>
                </div>
              </div>

              <div className="flex gap-4 border-b mt-4">
                <button className="pb-3 border-b-2 border-transparent text-gray-600">Dashboard</button>
                <button className="pb-3 border-b-2 border-blue-500 text-blue-600 font-medium">Getting Started</button>
                <button className="pb-3 border-b-2 border-transparent text-gray-600">Recent Updates</button>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Welcome to Zoho Books
                <button className="ml-2 text-blue-500 text-sm">
                  Overview of Zoho Books
                </button>
              </h2>
              <p className="text-gray-600">Your journey to effortlessly manage your accounting starts here.</p>
            </div>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {cards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">{card.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                      {card.logos && (
                        <div className="flex gap-3 mb-4 flex-wrap">
                          {card.logos.map((logo, i) => (
                            <div key={i} className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                              {logo}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100">
                      {card.primaryBtn}
                    </button>
                    <button className="text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-1">
                      <PlayCircle size={16} />
                      {card.secondaryBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}