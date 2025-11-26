import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { studentlogin } from '@/services/student/auth';
import { User, Lock } from 'lucide-react';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await studentlogin(username, password);
      if (res.status) {
        localStorage.setItem('studentToken', res.token);
        navigate('/student/dashboard');
      } else {
        alert('Login failed: ' + (res.message || 'Invalid credentials'));
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden">

        {/* Left: Branding */}
        <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold">Welcome Back!</h2>
            <p className="text-blue-100">Login to access your dashboard and start learning.</p>
            <img
              src="https://illustrations.popsy.co/gray/student-reading-book.svg"
              alt="Student"
              className="w-64 mx-auto mt-6"
            />
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Student Login</h2>

          {/* Username */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="ml-3 w-full bg-transparent focus:outline-none"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-3 w-full bg-transparent focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{' '}
            <Link to="/student/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
