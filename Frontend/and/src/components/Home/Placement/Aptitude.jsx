import { useState, useEffect } from "react";
import Layout from ".././Users/Layout";
import axios from "axios";

export default function Aptitude() {
  const [API_BASE_URL, setApiBaseUrl] = useState("");
  const [categories, setCategories] = useState([]); // Instead of subjects
  const [materials, setMaterials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

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

    // Fetch aptitude categories instead of branches/subjects
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/views/get_placement_materials`,
          {params:{
            type:"Aptitude"
          },
      });
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [API_BASE_URL]);

  const fetchMaterials = async (category) => {
    if (!API_BASE_URL) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/views/get-aptitude-materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });
      const data = await response.json();
      setMaterials(data.materials || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (materialId) => {
    if (!API_BASE_URL) return;
    setDownloadingId(materialId);

    try {
      const res = await axios.get(`${API_BASE_URL}/views/download-placement/${materialId}`);
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
    } finally {
      setTimeout(() => setDownloadingId(null), 3000);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMaterials = materials.filter((material) =>
    (material.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-screen w-screen bg-gray-900 overflow-y-auto">
      <Layout>
        <div className="flex flex-col items-center w-full">
          <h1 className="p-8 text-orange-400 text-2xl font-bold mb-4">
            Aptitude Materials
          </h1>

          {/* Search Bar */}
          {(categories.length > 0 || materials.length > 0) && (
            <input
              type="text"
              placeholder="Search categories or materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-6 p-2 w-64 sm:w-96 rounded-md bg-gray-800 text-white border border-gray-600"
            />
          )}

          {/* Spinner */}
          {loading && (
            <div className="flex justify-center items-center my-4">
              <div className="w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Categories */}
          {materials.length === 0 && !loading && (
            <>
              {filteredCategories.length === 0 ? (
                <p className="text-gray-400">No categories found</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                  {filteredCategories.map((cat) => (
                    <div
                      key={cat}
                      className="bg-gray-800 p-10 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 cursor-pointer border border-gray-700"
                      onClick={() => {
                        fetchMaterials(cat);
                        setSelectedCategory(cat);
                        setSearchQuery("");
                      }}
                    >
                      <h2 className="text-lg font-semibold text-orange-400">
                        {cat}
                      </h2>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Materials */}
          {materials.length > 0 && !loading && (
            <div className="mt-6 w-full max-w-5xl">
              {/* Back Button */}
              <button
                className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                onClick={() => {
                  setMaterials([]);
                  setSelectedCategory(null);
                }}
              >
                ← Back to Categories
              </button>

              {selectedCategory && (
                <h1 className="text-xl text-orange-400 font-bold mb-4">
                  Materials for {selectedCategory}
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
                          e.stopPropagation();
                          handleDownload(material.id);
                        }}
                        className="w-full flex items-center justify-center py-2.5 px-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-75 transition-colors duration-300"
                      >
                        {downloadingId === material.id ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          "Download"
                        )}
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
