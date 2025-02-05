import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react'; // Import Lucide Eye icons
import { showErrorToast, showSuccessToast } from '../components/toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isTyping, setIsTyping] = useState(false); // Track if the user is typing
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axiosInstance().post('/users/login', { email, password }, { withCredentials: true });

      if (response.status === 200) {
        setUser(response.data);
        showSuccessToast('Login successful!');
        navigate("/"); // Redirect to home after successful login
      } else {
        showErrorToast('Invalid credentials');
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      showErrorToast('Invalid credentials');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsTyping(true); // Set to true once user starts typing
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-500 to-purple-600 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <h1 className='text-purple-500 text-3xl'><span className='text-orange-500'>hisaab</span>Dekho</h1>
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password Input with Eye Icon */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange} // Update typing state
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {/* Eye Toggle Button - Show only when user starts typing */}
              {isTyping && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} 
                </button>
              )}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 mb-4 text-white bg-gradient-to-r from-orange-500 to-purple-600 rounded-md hover:from-orange-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Log in
          </button>
        </form>

        {/* Create New Account Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 hover:text-orange-700">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
