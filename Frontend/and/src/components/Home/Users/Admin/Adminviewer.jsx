import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout";

const AdminMaterialView = () => {
  const [API_BASE_URL, setApiBaseUrl] = useState('');
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [uploadType, setUploadType] = useState("");
  const [branches, setBranches] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  const uploadOptions = ["Question Paper", "Notes", "Question Bank", "Model Question Paper"];

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const response = await fetch('/base_data.json');
        const data = await response.json();
        setApiBaseUrl(data.API_BASE_URL);
      } catch (error) {
        console.error('Error loading API_BASE_URL:', error);
      }
    };
    fetchBaseUrl();
  }, []);

  useEffect(() => {
    if (!API_BASE_URL) return;
    axios.get(`${API_BASE_URL}/uploads/branches`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setBranches(res.data.branches || []))
      .catch((err) => console.error("Branch fetch error", err));
  }, [API_BASE_URL]);

  const fetchMaterials = () => {
    if (!API_BASE_URL || !semester || !branch || !uploadType) {
      alert("Select all fields first!");
      return;
    }

    axios.post(`${API_BASE_URL}/views/get_materials_admin`, {
      semester,
      branch,
      upload_type: uploadType,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setMaterials(res.data.materials || []);
      })
      .catch((err) => {
        console.error("Error fetching materials", err);
      });
  };

  const handleDelete = async (materialId) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/views/delete/${materialId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Deleted successfully");
      setMaterials((prev) => prev.filter((mat) => mat.id !== materialId));
    } catch (err) {
      alert("Failed to delete");
      console.error(err);
    }
  };

  const handleEditClick = (mat) => {
    setEditingRowId(mat.id);
    setEditedData({ ...mat }); // deep clone
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditedData({});
  };

  const handleFieldChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE_URL}/views/update/${editedData.id}`, editedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMaterials((prev) =>
        prev.map((mat) => (mat.id === editedData.id ? editedData : mat))
      );
      alert("Saved successfully!");
      setEditingRowId(null);
      setEditedData({});
    } catch (err) {
      console.error("Save error", err);
      alert("Failed to save changes");
    }
  };

  const filteredMaterials = materials.filter((mat) =>
    [mat.subject_code, mat.details, mat.original_file_name]
      .filter(Boolean) // avoid null/undefined
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
      <div className="h-screen w-screen">
    <Layout>
        

        <div className="">
          <h1 className="text-2xl font-bold text-orange-400 mb-4">Admin Material Viewer</h1>

          <div className="flex flex-wrap gap-4 mb-4">
            <select
              className="bg-gray-800 p-2 rounded border border-gray-600"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">-- Select Semester --</option>
              {[...Array(8).keys()].map((i) => (
                <option key={i + 1} value={`Semester ${i + 1}`}>
                  Semester {i + 1}
                </option>
              ))}
            </select>

            <select
              className="bg-gray-800 p-2 rounded border border-gray-600"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">-- Select Branch --</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              className="bg-gray-800 p-2 rounded border border-gray-600"
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value)}
            >
              <option value="">-- Upload Type --</option>
              {uploadOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
              onClick={fetchMaterials}
            >
              Load Materials
            </button>
          </div>

          <input
            type="text"
            className="w-full sm:w-96 bg-gray-800 border border-gray-600 p-2 rounded mb-4 text-white"
            placeholder="Search by Subject Code / Details / File Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-sm">
              <thead className="bg-gray-800 text-orange-300">
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">User ID</th>
                  <th className="p-2 border">Semester</th>
                  <th className="p-2 border">Branch</th>
                  <th className="p-2 border">Upload Type</th>
                  <th className="p-2 border">Subject Code</th>
                  <th className="p-2 border">Details</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">File Name</th>
                  <th className="p-2 border">S3 Key</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((mat) => (
                    <tr key={mat.id} className="bg-gray-700 hover:bg-gray-600">
                      <td className="p-2 border">{mat.id}</td>
                      <td className="p-2 border">{mat.and_id}</td>

                      {["semester", "branch", "upload_type", "subject_code", "details", "description", "original_file_name"].map(
                        (field) => (
                          <td className="p-2 border" key={field}>
                            {editingRowId === mat.id ? (
                              <input
                                className="bg-gray-800 border border-gray-600 p-1 rounded w-full"
                                value={editedData[field] || ""}
                                onChange={(e) =>
                                  handleFieldChange(field, e.target.value)
                                }
                              />
                            ) : (
                              mat[field]
                            )}
                          </td>
                        )
                      )}

                      <td className="p-2 border text-xs break-all">{mat.s3_key}</td>

                      <td className="p-2 border space-y-1 flex flex-col">
                        {editingRowId === mat.id ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="bg-green-600 px-2 py-1 rounded hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <a
                              href={mat.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700 text-center"
                            >
                              View
                            </a>
                            <button
                              onClick={() => handleDelete(mat.id)}
                              className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleEditClick(mat)}
                              className="bg-yellow-600 px-2 py-1 rounded hover:bg-yellow-700"
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="p-4 text-center text-gray-400">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    </Layout>
      </div>
  );
};

export default AdminMaterialView;
