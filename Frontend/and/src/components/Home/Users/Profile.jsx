import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const UserProfile = () => {
  const [API_BASE_URL, setApiBaseUrl] = useState('');
  const [user, setUser] = useState({
    and_id: "",
    name: "",
    USN: "",
    email: "",
    branch: "",
    phone_no: "",
    semester: ""
  });

  const [branches, setBranches] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // <-- NEW loading state
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const semesters = [
    "Semester 1", "Semester 2", "Semester 3", "Semester 4",
    "Semester 5", "Semester 6", "Semester 7", "Semester 8"
  ];

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const response = await fetch("/base_data.json");
        const data = await response.json();
        setApiBaseUrl(data.API_BASE_URL);
      } catch (error) {
        console.error("Error loading API_BASE_URL:", error);
      }
    };
    fetchBaseUrl();
  }, []);

  useEffect(() => {
    if (!API_BASE_URL) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/pages/dashboard`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setUser(data);
        localStorage.setItem("user_semester", data.semester);
        localStorage.setItem("user_branch", data.branch);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false); // ✅ stop loading after data fetched
      }
    };

    const fetchBranches = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/uploads/branches`);
        const data = await res.json();
        setBranches(data.branches);
      } catch (err) {
        console.error("Error fetching branches:", err);
      }
    };

    fetchUserData();
    fetchBranches();
  }, [API_BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!API_BASE_URL) return;

    try {
      const payload = {
        name: user.name,
        branch: user.branch,
        phone_no: user.phone_no,
        semester: user.semester,
        email: user.email
      };

      const res = await fetch(`${API_BASE_URL}/pages/update-user-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message || "Profile updated successfully!");

      localStorage.setItem("user_semester", user.semester);
      localStorage.setItem("user_branch", user.branch);

      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_semester");
    localStorage.removeItem("user_branch");
    navigate("/");
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-screen w-screen bg-gray-900 text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-orange-400">Profile Settings</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
              >
                Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Name" name="name" value={user.name} editable={true} isEditing={isEditing} handleChange={handleChange} />
              <InputField label="USN" name="USN" value={user.USN} editable={false} isEditing={isEditing} />
              <InputField label="Email" name="email" value={user.email} editable={false} isEditing={isEditing} />
              <InputField label="User ID" name="and_id" value={user.and_id} editable={false} isEditing={isEditing} />
              <InputField label="Phone Number" name="phone_no" value={user.phone_no} editable={true} isEditing={isEditing} handleChange={handleChange} />

              <div>
                <label className="block text-sm text-gray-400 mb-1">Branch</label>
                {isEditing ? (
                  <select
                    name="branch"
                    value={user.branch}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={user.branch}
                    readOnly
                    className="w-full p-2 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Semester</label>
                {isEditing ? (
                  <select
                    name="semester"
                    value={user.semester}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>{sem}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={user.semester}
                    readOnly
                    className="w-full p-2 rounded bg-gray-700 text-gray-400 cursor-not-allowed"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              {isEditing && (
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 transition duration-300 p-2 rounded text-white font-semibold"
                >
                  Save Changes
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 transition duration-300 p-2 rounded text-white font-semibold"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const InputField = ({ label, name, value, editable, isEditing, handleChange }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      readOnly={!editable || !isEditing}
      className={`w-full p-2 rounded bg-gray-700 ${
        isEditing && editable
          ? "text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          : "text-gray-400 cursor-not-allowed"
      }`}
    />
  </div>
);

export default UserProfile;
