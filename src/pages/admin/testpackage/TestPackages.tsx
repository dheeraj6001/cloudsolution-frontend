import { useState } from 'react';
import { Search, Plus, Eye, ChevronDown, Home, Package } from 'lucide-react';

type PackageType = {
  id: number;
  package: string;
  course: string;
  price: number;
  isSpecial: boolean;
  noOfTestSeries: number;
  noOfVideoSeries: number;
  buyers: string;
  enrolledStudents: string;
  sort: number;
  status: 'Published' | 'Unpublished';
};

const mockPackages: PackageType[] = [
  { id: 1, package: 'Complete CLASS-VI', course: 'sambhavam', price: 100, isSpecial: false, noOfTestSeries: 1, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 1, status: 'Published' },
  { id: 2, package: 'Testing team package', course: 'Testing [A]', price: 900, isSpecial: true, noOfTestSeries: 0, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 0, status: 'Published' },
  { id: 3, package: 'Sambhavam Demo', course: 'sambhavam', price: 0, isSpecial: true, noOfTestSeries: 1, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 1, status: 'Unpublished' },
  { id: 4, package: 'IELTS PRO', course: 'IELTS PRO', price: 0, isSpecial: false, noOfTestSeries: 1, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 0, status: 'Unpublished' },
  { id: 5, package: 'DEMO', course: 'EIASM', price: 1000, isSpecial: false, noOfTestSeries: 0, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 3, status: 'Unpublished' },
  { id: 6, package: 'storepackagedheeraj', course: 'EIASM', price: 100, isSpecial: false, noOfTestSeries: 1, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 1, status: 'Unpublished' },
  { id: 7, package: 'Mayur ios testing', course: 'trigr', price: 0, isSpecial: false, noOfTestSeries: 1, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 0, status: 'Unpublished' },
  { id: 8, package: 'SSC CPO TEST PACKAGE', course: 'SSC-CPO', price: 0, isSpecial: false, noOfTestSeries: 1, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 0, status: 'Unpublished' },
  { id: 9, package: 'SSC', course: 'SSC-CPO', price: 0, isSpecial: false, noOfTestSeries: 3, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 0, status: 'Unpublished' },
  { id: 10, package: 'endorphin testing demo', course: 'EIASM', price: 0, isSpecial: false, noOfTestSeries: 0, noOfVideoSeries: 0, buyers: 'view', enrolledStudents: 'view', sort: 0, status: 'Unpublished' },
];

const TestPackages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [packages] = useState<PackageType[]>(mockPackages);

  const courses = Array.from(new Set(packages.map(p => p.course)));

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.package.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = !selectedCourse || pkg.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const handleViewBuyers = (id: number) => {
    console.log('View buyers for package:', id);
  };

  const handleViewEnrolled = (id: number) => {
    console.log('View enrolled students for package:', id);
  };

  const handleAction = (id: number) => {
    console.log('Action menu for package:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Home size={16} />
            <span>Home</span>
            <ChevronDown size={16} className="rotate-[-90deg]" />
            <span className="text-gray-900 font-medium">Package/Batch</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Package/Batch</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Package className="text-white" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Package List</h2>
              </div>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl">
                <Plus size={20} />
                Add
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search Packages"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Show</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer min-w-[180px]"
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">#</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Package</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Course</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Price</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Is Special</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">No of Test Series</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">No of Video Series</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Buyers</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Enrolled Students</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Sort</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPackages.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center py-12">
                      <Package size={48} className="mx-auto mb-3 text-gray-300" />
                      <p className="text-gray-500 text-lg font-medium">No packages found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredPackages.map((pkg, index) => (
                    <tr key={pkg.id} className="hover:bg-indigo-50 transition-colors">
                      <td className="px-4 py-4 text-gray-700 font-medium">{index + 1}</td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">{pkg.package}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-700">{pkg.course}</td>
                      <td className="px-4 py-4 text-gray-900 font-semibold">{pkg.price}</td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pkg.isSpecial 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {pkg.isSpecial ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-700">{pkg.noOfTestSeries}</td>
                      <td className="px-4 py-4 text-center text-gray-700">{pkg.noOfVideoSeries}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleViewBuyers(pkg.id)}
                          className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
                        >
                          <Eye size={16} />
                          view
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleViewEnrolled(pkg.id)}
                          className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
                        >
                          <Eye size={16} />
                          view
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-700">{pkg.sort}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          pkg.status === 'Published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {pkg.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleAction(pkg.id)}
                          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1.5 rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-medium text-sm flex items-center justify-center gap-1.5"
                        >
                          <ChevronDown size={16} />
                          Action
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-indigo-50 font-medium text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-indigo-50 font-medium text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                3
              </button>
              <button
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-indigo-50 font-medium text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPackages;