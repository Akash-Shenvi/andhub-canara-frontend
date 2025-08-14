import { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";

export default function SemesterPage() {
  const [API_BASE_URL, setApiBaseUrl] = useState("");
  const [semester, setSemester] = useState(localStorage.getItem("user_semester") || "");
  const [branch, setBranch] = useState(localStorage.getItem("user_branch") || "");
  const [branches, setBranches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 loading state

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

    const fetchBranches = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/uploads/branches`);
        const data = await response.json();
        setBranches(data.branches || []);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();

    if (semester && branch) {
      fetchSubjects(semester, branch);
    }
  }, [API_BASE_URL]);

  const fetchSubjects = async (selectedSemester, selectedBranch) => {
    if (!API_BASE_URL) return;
    setLoading(true); // 🔹 start loading
    try {
      const response = await axios.get(`${API_BASE_URL}/views/get-notes-subjectcode`, {
        params: {
          semester: selectedSemester,
          branch: selectedBranch,
          upload_type: "Model Question Paper",
        },
      });

      const data = response.data;
      setSubjects(data.subjects || []);
      setMaterials([]);
      setSelectedSubject(null);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false); // 🔹 stop loading
    }
  };

  const fetchMaterials = async (subjectCode) => {
    if (!API_BASE_URL) return;
    setLoading(true); // 🔹 start loading
    try {
      const response = await fetch(`${API_BASE_URL}/views/get_materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          semester,
          branch,
          subjectCode,
        }),
      });
      const data = await response.json();
      setMaterials(data.materials || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false); // 🔹 stop loading
    }
  };

  const handleDownload = async (materialId) => {
    if (!API_BASE_URL) return;

    try {
      const res = await axios.get(`${API_BASE_URL}/views/download/${materialId}`);
      const downloadUrl = res.data.downloadUrl;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Download failed!");
      console.error(err);
    }
  };

  const filteredSubjects = subjects.filter((subject) => {
    const query = searchQuery.toLowerCase();
    return (
      subject.name.toLowerCase().includes(query) ||
      subject.code.toLowerCase().includes(query)
    );
  });

  const filteredMaterials = materials.filter((material) => {
    const query = searchQuery.toLowerCase();
    return (
      material.details?.toLowerCase().includes(query) ||
      material.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="h-screen w-screen bg-gray-900 overflow-y-auto">
  <Layout>
    <div className="p-8 flex flex-col items-center w-full">

        <h1 className="text-orange-400 text-2xl font-bold mb-4">Select Your Semester & Branch</h1>

        {/* Semester & Branch Dropdown */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <select
            className="p-2 bg-gray-800 text-white rounded-md w-64 border border-gray-600"
            value={semester}
            onChange={(e) => {
              const newSemester = e.target.value;
              setSemester(newSemester);
              localStorage.setItem("user_semester", newSemester);
              if (newSemester && branch) fetchSubjects(newSemester, branch);
            }}
          >
            <option value="">-- Select Semester --</option>
            {[...Array(8).keys()].map((num) => {
              const semString = `Semester ${num + 1}`;
              return (
                <option key={semString} value={semString}>
                  {semString}
                </option>
              );
            })}
          </select>

          <select
            className="p-2 bg-gray-800 text-white rounded-md w-64 border border-gray-600"
            value={branch}
            onChange={(e) => {
              const newBranch = e.target.value;
              setBranch(newBranch);
              localStorage.setItem("user_branch", newBranch);
              if (semester && newBranch) fetchSubjects(semester, newBranch);
            }}
          >
            <option value="">-- Select Branch --</option>
            {branches.map((br) => (
              <option key={br} value={br}>
                {br}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        {(subjects.length > 0 || materials.length > 0) && (
          <input
            type="text"
            placeholder="Search subjects or materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-6 p-2 w-64 sm:w-96 rounded-md bg-gray-800 text-white border border-gray-600"
          />
        )}

        {/* 🔹 Small Spinner */}
        {loading && (
          <div className="flex justify-center items-center my-4">
            <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Subjects */}
        {materials.length === 0 && !loading && (
          <>
            {filteredSubjects.length === 0 && semester && branch ? (
              <p className="text-gray-400">No items found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {filteredSubjects.map((subject) => (
                  <div
                    key={subject.code}
                    className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-gray-700"
                    onClick={() => {
                      fetchMaterials(subject.code);
                      setSelectedSubject(subject);
                      setSearchQuery("");
                    }}
                  >
                    <h2 className="text-lg font-semibold text-orange-400">{subject.name}</h2>
                    <p className="text-gray-300">Code: {subject.code}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Materials Display */}
        {materials.length > 0 && !loading && (
          <div className="mt-6 w-full max-w-5xl">
            {/* Back Button */}
            <button
              className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              onClick={() => {
                setMaterials([]);
                setSelectedSubject(null);
              }}
            >
              ← Back to Subjects
            </button>

            {selectedSubject && (
              <h1 className="text-xl text-orange-400 font-bold mb-4">
                Materials for {selectedSubject.name} ({selectedSubject.code})
              </h1>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  onClick={() => window.open(material.url, "_blank")}
                  className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 cursor-pointer"
                >
                  <div className="bg-gray-700 p-6 flex flex-col justify-center items-center rounded-md">
                    <span className="text-4xl">📄</span>
                    <p className="text-white mt-2 text-center">PDF File</p>
                  </div>

                  <p className="text-orange-400 text-sm mt-2">{material.details}</p>
                  <p className="text-gray-400 text-xs">{material.description}</p>

                  <div className="mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent PDF opening when clicking download
                        handleDownload(material.id);
                      }}
                      className="w-full flex items-center justify-center py-2.5 px-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-75 transition-colors duration-300"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
    </div>
  );
}
