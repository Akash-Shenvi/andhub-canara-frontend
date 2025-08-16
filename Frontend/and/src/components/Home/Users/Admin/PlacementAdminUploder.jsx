import React, { useState, useEffect } from 'react';
import Layout from './../Layout';

const PlacementUploadPage = () => {
  const [API_BASE_URL, setApiBaseUrl] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [details, setDetails] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const types = ["Aptitude", "Coding"];

  // Load API base URL
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

  // Fetch categories when type changes
  useEffect(() => {
    if (!API_BASE_URL || !selectedType) return;

    fetch(`${API_BASE_URL}/get_placement_materials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: selectedType }),
    })
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(err => console.error("Error fetching categories:", err));
  }, [API_BASE_URL, selectedType]);

  const handleFileUpload = async () => {
    if (!selectedType || !selectedCategory || !details.trim() || !pdfFile) {
      alert("Please fill in all fields and select a PDF file.");
      return;
    }

    setUploading(true); // start loading

    try {
      const token = localStorage.getItem('token');

      // Step 1: Get presigned URL
      const presignRes = await fetch(
        `${API_BASE_URL}/uploads/get-presigned-url?filename=${encodeURIComponent(pdfFile.name)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: selectedType,
            category: selectedCategory,
            originalFileName: pdfFile.name,
          }),
        }
      );

      const presignData = await presignRes.json();
      if (!presignRes.ok || !presignData.uploadUrl) {
        throw new Error(presignData.error || "Failed to get upload URL");
      }

      // Step 2: Proxy upload via backend
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("fileType", pdfFile.type);
      formData.append("uploadUrl", presignData.uploadUrl);

      const proxyUploadRes = await fetch(`${API_BASE_URL}/uploads/proxy-upload-to-google`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const proxyJson = await proxyUploadRes.json();
      if (!proxyUploadRes.ok) throw new Error(proxyJson.error || "Proxy upload failed");

      // Step 3: Save metadata
      const metaRes = await fetch(`${API_BASE_URL}/uploads/save-placement-metadata`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: selectedType,
          category: selectedCategory,
          details,
          description,
          originalFileName: pdfFile.name,
          fileUrl: proxyJson.id, // backend should return storage ID or URL
        }),
      });

      const metaJson = await metaRes.json();
      if (metaRes.ok) {
        alert("Placement material uploaded successfully!");
        // Reset form
        setSelectedType('');
        setSelectedCategory('');
        setDetails('');
        setDescription('');
        setPdfFile(null);
      } else {
        throw new Error(metaJson.error || "Failed to save metadata");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false); // stop loading
    }
  };

  // Button disabled logic
  const isFormValid = selectedType && selectedCategory && details.trim() && pdfFile;

  return (
    <div className="h-screen w-screen">
      <Layout>
        <div className="w-full flex justify-center items-start">
          <div className="max-w-lg w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-6 text-center">
              Upload Placement Material
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              {/* Type */}
              <div>
                <label className="block mb-2 text-gray-300">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setSelectedCategory('');
                  }}
                  className="w-full p-2 rounded bg-gray-700 border border-orange-500"
                >
                  <option value="">-- Select Type --</option>
                  {types.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Category (typeable with suggestions) */}
              <div>
                <label className="block mb-2 text-gray-300">Category</label>
                <input
                  list="categories"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  placeholder="Type or select a category..."
                  className="w-full p-2 rounded bg-gray-700 border border-orange-700"
                />
                <datalist id="categories">
                  {categories.map((c, idx) => (
                    <option key={idx} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Details */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Details</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter detailed file name here..."
                className="w-full p-2 rounded bg-gray-700 border border-orange-500"
                rows="2"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description..."
                className="w-full p-2 rounded bg-gray-700 border border-orange-500"
                rows="2"
              />
            </div>

            {/* PDF Upload */}
            <div className="mb-6">
              <label className="block mb-2 text-gray-300">Upload PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file?.type === "application/pdf") {
                    setPdfFile(file);
                  } else {
                    alert("Only PDF files allowed.");
                    e.target.value = "";
                  }
                }}
                className="w-full p-2 rounded bg-gray-700 border border-orange-500"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={handleFileUpload}
              disabled={!isFormValid || uploading}
              className={`w-full flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded shadow transition ${(!isFormValid || uploading) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {uploading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Uploading...</span>
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default PlacementUploadPage;
