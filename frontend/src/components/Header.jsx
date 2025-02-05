import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { showErrorToast, showSuccessToast } from './toastify';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance().get(`/users/logout`);
      if (response.status === 200) {
        showSuccessToast("Logged out successfully");

        
        setUser(null);

        // Redirect to login page
        redirect("/login");
      }
    } catch (error) {
      console.log(error)
      showErrorToast("Something went wrong");
    }
  };
  console.log(user)
  const handleNavigation = (e, path) => {
    if (!user) {
      e.preventDefault();
      showErrorToast("You must be logged in .");
    } else {
      navigate(path);
    }
  };


  return (
    <nav className="bg-white shadow-lg  rounded-bl-xl rounded-br-xl">
      <div className="max-w-8xl mx-auto px-4  sm:px-6 lg:px-8  ">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-semibold tracking-wider text-black">
                <span className='text-orange-400'>hisaab</span><span className="text-purple-500">Dekho</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link onClick={(e) => { handleNavigation(e, "/dashboard") }}
                to="/dashboard"
                className="text-black text-sm md:text-base inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
              >
                Dashboard
              </Link>
              <Link onClick={(e) => { handleNavigation(e, "/transactions") }}
                to="/transactions"
                className="text-black text-sm md:text-base inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
              >
                Transactions
              </Link>
              <Link onClick={(e) => { handleNavigation(e, "/budget") }}
                to="/budget"
                className="text-black text-sm md:text-base inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
              >
                Budget
              </Link>
              <Link
                onClick={(e) => { handleNavigation(e, "/goals") }}
                to="/goals"
                className="text-black text-sm md:text-base inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
              >
                Goals
              </Link>
            </div>
          </div>
          <div className="flex items-center rounded-bl-xl rounded-br-xl">
            <div className="hidden sm:flex sm:items-center">
              <Link
                onClick={(e) => { handleNavigation(e, "/profile") }}
                to="/profile"
                className="text-black text-sm md:text-base inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-orange-500"
              >
                Profile
              </Link>
              <Link
              to={user ? "#" : "/login"} // Prevent navigation for logout
              onClick={(e) => {
                if (user) {
                  logOut(e); // Call logout function
                }
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-black hover:bg-orange-50 hover:border-orange-500"
            >
              {user ? "Logout" : "Login"}
            </Link>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 focus:text-white"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              onClick={(e) => { handleNavigation(e, "/dashboard") }}
              to="/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-base font-medium text-black bg-orange-50"
            >
              Dashboard
            </Link>
            <Link
              onClick={(e) => { handleNavigation(e, "/transactions") }}
              to="/transactions"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-black hover:bg-orange-50 hover:border-orange-500"
            >
              Transactions
            </Link>
            <Link
              onClick={(e) => { handleNavigation(e, "/budget") }}
              to="/budget"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-black hover:bg-orange-50 hover:border-orange-500"
            >
              Budget
            </Link>
            <Link
              onClick={(e) => { handleNavigation(e, "/goals") }}
              to="/goals"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-black hover:bg-orange-50 hover:border-orange-500"
            >
              Goals
            </Link>
            <Link
              onClick={(e) => { handleNavigation(e, "/profile") }}
              to="/profile"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-black hover:bg-orange-50 hover:border-orange-500"
            >
              Profile
            </Link>
            <Link
              to={user ? "#" : "/login"} // Prevent navigation for logout
              onClick={(e) => {
                if (user) {
                  logOut(e); // Call logout function
                }
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-black hover:bg-orange-50 hover:border-orange-500"
            >
              {user ? "Logout" : "Login"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
