import {
  ShoppingBag,
  BarChart2,
  UserPlus,
  PieChart,
  ArrowRightCircle
} from 'lucide-react';
const CounterSection = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Box 1: New Orders */}
      <div className="bg-blue-500 text-white rounded-lg shadow p-4 relative">
        <div>
          <h3 className="text-3xl font-bold">150</h3>
          <p className="text-sm">Total Questions</p>
        </div>
        <ShoppingBag className="absolute top-4 right-4 w-10 h-10 opacity-30" />
        <a href="#" className="block mt-4 text-sm text-white hover:underline flex items-center gap-1">
          More info <ArrowRightCircle size={16} />
        </a>
      </div>

      {/* Box 2: Bounce Rate */}
      <div className="bg-green-500 text-white rounded-lg shadow p-4 relative">
        <div>
          <h3 className="text-3xl font-bold">
            53<sup className="text-base">%</sup>
          </h3>
          <p className="text-sm">Total Students</p>
        </div>
        <BarChart2 className="absolute top-4 right-4 w-10 h-10 opacity-30" />
        <a href="#" className="block mt-4 text-sm text-white hover:underline flex items-center gap-1">
          More info <ArrowRightCircle size={16} />
        </a>
      </div>

      {/* Box 3: User Registrations */}
      <div className="bg-yellow-400 text-white rounded-lg shadow p-4 relative">
        <div>
          <h3 className="text-3xl font-bold">44</h3>
          <p className="text-sm">Total Tests</p>
        </div>
        <UserPlus className="absolute top-4 right-4 w-10 h-10 opacity-30" />
        <a href="#" className="block mt-4 text-sm text-white hover:underline flex items-center gap-1">
          More info <ArrowRightCircle size={16} />
        </a>
      </div>

      {/* Box 4: Unique Visitors */}
      <div className="bg-red-500 text-white rounded-lg shadow p-4 relative">
        <div>
          <h3 className="text-3xl font-bold">65</h3>
          <p className="text-sm">Total Reports</p>
        </div>
        <PieChart className="absolute top-4 right-4 w-10 h-10 opacity-30" />
        <a href="#" className="block mt-4 text-sm text-white hover:underline flex items-center gap-1">
          More info <ArrowRightCircle size={16} />
        </a>
      </div>
    </div>
   
    </>
  );
};
export default CounterSection;


 