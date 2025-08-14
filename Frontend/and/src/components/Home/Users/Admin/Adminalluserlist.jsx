import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [editedUsers, setEditedUsers] = useState({});
  const [editingField, setEditingField] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [API_BASE_URL, setApiBaseUrl] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  // Load API base URL and fetch users after that
  useEffect(() => {
    const fetchBaseUrlAndUsers = async () => {
      try {
        const response = await fetch("/base_data.json");
        const data = await response.json();
        setApiBaseUrl(data.API_BASE_URL);

        const res = await axios.get(`${data.API_BASE_URL}/auth/admin/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data.users || []);
      } catch (error) {
        console.error("Error loading API_BASE_URL or fetching users:", error);
      }
    };

    fetchBaseUrlAndUsers();
  }, []);

  const handleEditChange = (and_id, field, value) => {
    setEditedUsers((prev) => ({
      ...prev,
      [and_id]: {
        ...prev[and_id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (and_id) => {
    const updatedFields = editedUsers[and_id];
    if (!updatedFields) return;

    try {
      await axios.put(
        `${API_BASE_URL}/auth/admin/users/${and_id}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers((prev) =>
        prev.map((user) =>
          user.and_id === and_id ? { ...user, ...updatedFields } : user
        )
      );
      setEditedUsers((prev) => {
        const newState = { ...prev };
        delete newState[and_id];
        return newState;
      });
      setEditingField((prev) => {
        const newState = { ...prev };
        delete newState[and_id];
        return newState;
      });
      alert("User updated successfully!");
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Update failed");
    }
  };

  const handleQuickAction = (and_id, value) => {
    handleEditChange(and_id, "user_type", value);
    handleSave(and_id);
  };

  const handleCellClick = (and_id, field) => {
    setEditingField({ and_id, field });
  };

  const filterUsers = (user) => {
    const q = searchQuery.toLowerCase();
    return Object.values(user).some((val) =>
      String(val).toLowerCase().includes(q)
    );
  };

  return (
    <Layout>
      <div className="h-screen w-screen">
        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white text-black w-[90%] max-w-lg p-6 rounded-2xl shadow-2xl">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
              >
                ×
              </button>
              <div className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  Restricted Access
                </h2>
                <p className="text-sm text-gray-700 mb-2">
                  Only <strong>Admins</strong> or <strong>Developers</strong>{" "}
                  are allowed to manage Users.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  If you're not authorized, you won't be able to access this
                  page.
                </p>
                <p className="text-xs text-gray-500 italic mb-1">
                  If you are an Admin or Developer, you can ignore this
                  message.
                </p>
                <p className="text-xs text-gray-500 italic">
                  Contact:{" "}
                  <a
                    href="mailto:andcanara0@gmail.com"
                    className="text-blue-600 underline"
                  >
                    andcanara0@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 bg-gray-900 text-white min-h-screen">
          <h1 className="text-2xl text-orange-400 font-bold mb-4">
            User Management
          </h1>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by any field..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-1/2 p-2 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-sm min-w-[1000px]">
              <thead className="bg-gray-800 text-orange-300">
                <tr>
                  <th className="p-2 border">AND ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">USN</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Password</th>
                  <th className="p-2 border">User Type</th>
                  <th className="p-2 border">Branch</th>
                  <th className="p-2 border">Phone No</th>
                  <th className="p-2 border">Semester</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(filterUsers).map((user) => (
                  <tr key={user.and_id} className="bg-gray-800 hover:bg-gray-700">
                    <td className="p-2 border">{user.and_id}</td>
                    {[
                      "name",
                      "USN",
                      "email",
                      "password",
                      "user_type",
                      "branch",
                      "phone_no",
                      "semester",
                    ].map((field) => (
                      <td
                        key={field}
                        className="p-2 border cursor-pointer"
                        onClick={() => handleCellClick(user.and_id, field)}
                      >
                        {editingField.and_id === user.and_id &&
                        editingField.field === field ? (
                          <input
                            type="text"
                            value={
                              editedUsers[user.and_id]?.[field] ??
                              user[field] ??
                              ""
                            }
                            onChange={(e) =>
                              handleEditChange(
                                user.and_id,
                                field,
                                e.target.value
                              )
                            }
                            onBlur={() => setEditingField({})}
                            autoFocus
                            className="bg-transparent text-white border border-gray-600 p-1 w-full"
                          />
                        ) : (
                          <span>{user[field]}</span>
                        )}
                      </td>
                    ))}
                    <td className="p-2 border space-y-1 w-[150px]">
                      <button
                        className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-xs w-full"
                        onClick={() => handleSave(user.and_id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-xs w-full"
                        onClick={() =>
                          handleQuickAction(user.and_id, "MAINTAINER")
                        }
                      >
                        Make Maintainer
                      </button>
                      <button
                        className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700 text-xs w-full"
                        onClick={() =>
                          handleQuickAction(user.and_id, "USER")
                        }
                      >
                        Make User
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center p-4 text-gray-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUserTable;
