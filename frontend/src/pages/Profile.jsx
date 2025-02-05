import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react"; // Import camera icon
import { axiosInstance } from "../lib/axios"; // Axios instance for API requests

const Profile = () => {
  // User State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for editing profile
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  // Fetch User Profile on Mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance().get("/users/profile", { withCredentials: true });
        setUser(res.data.user);
        setUpdatedUser(res.data.user);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle profile picture change
  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdatedUser({ ...updatedUser, profilePic: imageUrl });

      // Upload image to backend (if required)
      const formData = new FormData();
      formData.append("profilePic", file);
    }
  };

  // Handle Profile Update
  const handleUpdate = async () => {
    try {
      const res = await axiosInstance().put("/users/profile", updatedUser, { withCredentials: true });
      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">User Profile</h1>
          <p className="text-lg">View and edit your profile information</p>
        </div>
      </header>

      {/* Profile Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md transition-all">
          {/* Profile Picture */}
          <div className="flex flex-col items-center relative">
            <img
              src={editMode ? updatedUser?.profilePic : user?.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-md border-4 border-gray-200 transition-all"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
                <Camera size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Profile Info */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium">username</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={updatedUser?.username || ""}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            ) : (
              <p className="text-lg text-gray-800">{user?.username}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Email Address</label>
            <p className="text-lg text-gray-800">{user?.email}</p> {/* Email is not editable */}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Bio</label>
            {editMode ? (
              <textarea
                name="bio"
                value={updatedUser?.bio || ""}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            ) : (
              <p className="text-lg text-gray-800">{user?.bio}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            {editMode ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-all"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 hDekho. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
