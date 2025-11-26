import type { Package } from '@/types/common';


const PackageList = ({ packages }: { packages: Package[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
     
      {packages.map((pkg) => (
        <div
          key={pkg._id}
          className="h-[300px] bg-white shadow-md rounded-xl p-4 flex flex-col"
        >
          {/* Image Section */}
          <div className="mb-3">
            <img
              src="https://www.studiestoday.com/sites/default/files/blogimages/CBSE%20Class%201%20Online%20Mock%20Test.jpg"
              alt={pkg.name}
              className="w-full h-28 object-cover rounded-md"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 truncate">{pkg.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{pkg.description}</p>
            <p className="text-sm font-semibold text-green-700 mt-2">
              Price: ₹{Number(pkg.price).toLocaleString()}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-auto pt-4 flex gap-2">
            <a
              className="flex-1 text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors text-sm font-medium"
              href={`/student/package-detail/${pkg._id}`}
            >
              Explore
            </a>
            <a
              className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
              href={`/student/buypackage/${pkg._id}`}
            >
              Buy
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageList;
