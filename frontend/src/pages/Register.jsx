import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { Eye, EyeOff } from 'lucide-react'; // Import Lucide icons
import { useAuth } from '../context/AuthContext';
import { showErrorToast, showSuccessToast } from '../components/toastify';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility
  const [isTypingPassword, setIsTypingPassword] = useState(false); // Track if the user is typing in password
  const [isTypingConfirmPassword, setIsTypingConfirmPassword] = useState(false); // Track if the user is typing in confirm password

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match")
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance().post('/users/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setUser(response.data); // Store user in context
        showSuccessToast("Registration successful")
        navigate("/"); // Redirect after successful registration
      } else {
        showErrorToast("Registration failed")
        setError('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      showErrorToast("User already exists")
      setError('An error occurred during registration');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsTypingPassword(true); // Set to true once user starts typing in password
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsTypingConfirmPassword(true); // Set to true once user starts typing in confirm password
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-500 to-purple-600 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <h1 className='text-purple-500 text-3xl text-center'>
            <span className='text-orange-500'>hisaab</span>Dekho
          </h1>
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="name"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

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
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange} // Update typing state for password
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {isTypingPassword && (
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

          {/* Confirm Password Input with Eye Icon */}
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} // Update typing state for confirm password
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {isTypingConfirmPassword && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 mb-4 text-white bg-gradient-to-r from-orange-500 to-purple-600 rounded-md hover:from-orange-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
