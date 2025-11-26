import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">YourBrand</h1>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
          <Link to="/contact-us" className="text-gray-700 hover:text-blue-600">Contact Us</Link>
          <Link to="/student/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/student/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;