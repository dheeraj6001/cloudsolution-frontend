import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { adminlogin } from '@/services/admin/auth';


const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
      try {
        const res = await adminlogin(email, password); // pass credentials if required
        if (res.status) { 
          localStorage.setItem('adminToken', res.token);
          navigate('/admin/dashboard');
        } else {
          alert('Login failed: ' + (res.message || 'Invalid credentials'));
        }
      } catch (err) {
        console.error('Login error:', err);
        // alert('Something went wrong. Please try again.');
      }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="admin"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-150"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
