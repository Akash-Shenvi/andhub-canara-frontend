import React, { useState, useEffect } from 'react';
import Layout from './../Layout';

const UploadPage = () => {
  const [API_BASE_URL, setApiBaseUrl] = useState('');
  const [selectedSem, setSelectedSem] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [subjectCodes, setSubjectCodes] = useState([]);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState('');
  const [selectedUploadType, setSelectedUploadType] = useState('');
  const [details, setDetails] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [uploading, setUploading] = useState(false);
  const uploadTypes = ["Question Paper", "Question Bank", "Notes", "Model Question Paper"];
  const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

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

  // Fetch branches
  useEffect(() => {
    if (!API_BASE_URL) return;
    fetch(`${API_BASE_URL}/uploads/branches`)
      .then(res => res.json())
      .then(data => setBranches(data.branches || []))
      .catch(err => console.error("Error fetching branches:", err));
  }, [API_BASE_URL]);

  // Fetch subject codes
  useEffect(() => {
    if (!API_BASE_URL || !selectedSem || !selectedBranch) return;
    fetch(`${API_BASE_URL}/uploads/subject-codes?semester=${selectedSem}&branch=${selectedBranch}`)
      .then(res => res.json())
      .then(data => setSubjectCodes(data.subject_codes || []))
      .catch(err => console.error("Error fetching subject codes:", err));
  }, [API_BASE_URL, selectedSem, selectedBranch]);

  const handleFileUpload = async () => {
    if (!selectedSem || !selectedBranch || !selectedUploadType || !selectedSubjectCode || !details.trim() || !pdfFile) {
      alert("Please fill in all fields and select a PDF file.");
      return;
    }
    setUploading(true);

    try {
      const token = localStorage.getItem('token');

      // Step 1: Get presigned URL
      const presignRes = await fetch(`${API_BASE_URL}/uploads/get-presigned-url?filename=${encodeURIComponent(pdfFile.name)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          semester: selectedSem,
          uploadType: selectedUploadType,
          subjectCode: selectedSubjectCode,
          originalFileName: pdfFile.name,
        })
      });

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
      const metaRes = await fetch(`${API_BASE_URL}/uploads/save-metadata`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          semester: selectedSem,
          branch: selectedBranch,
          uploadType: selectedUploadType,
          subjectCode: selectedSubjectCode,
          details,
          originalFileName: pdfFile.name,
          s3Key: proxyJson.id,
          description
        })
      });

      const metaJson = await metaRes.json();
      if (metaRes.ok) {
        alert("File Uploaded Successfully");
      }
      if (!metaRes.ok) throw new Error(metaJson.error || "Failed to save metadata");

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed: " + err.message);
    }
    finally{
      setUploading(false);
    }
  };
 const isFormValid =
    selectedSem &&
    selectedBranch &&
    selectedUploadType &&
    selectedSubjectCode &&
    details.trim() &&
    pdfFile;
  return (
    // FIX: The component now returns Layout as the root element, removing the redundant outer div.
    <div className="h-screen w-screen">
    <Layout>
      {/* FIX: The main content container no longer needs extra padding. */}
      <div className="w-full">
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
                <div className="text-3xl mb-3">⚠️</div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Upload Access Restricted</h2>
                <p className="text-sm text-gray-700 mb-1">
                  Only <strong>Admins</strong> and <strong>Developers</strong> can upload study materials.
                </p>
                <p className="text-sm text-gray-700 mb-3">
  For access, contact <a href="mailto:andcanara0@gmail.com" className="text-blue-600 underline">andcanara0@gmail.com</a> or visit <a href="/contact" className="text-blue-600 underline">Contact Us</a> and include "Request Admin Access" in the subject.
</p>

                <p className="text-xs text-gray-500 italic">
                  If you are a Developer or Admin, you may ignore this message.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FIX: Removed padding from this container as the Layout component handles it. */}
        <div className="flex justify-center items-start">
          <div className="">
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-6 text-center">Upload Study Material</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              {/* Semester */}
              <div>
                <label className="block mb-2 text-gray-300">Semester</label>
                <select
                  value={selectedSem}
                  onChange={(e) => {
                    setSelectedSem(e.target.value);
                    setSelectedSubjectCode('');
                  }}
                  className="w-full p-2 rounded bg-gray-700 border border-orange-500"
                >
                  <option value="">-- Select Semester --</option>
                  {semesters.map((sem, idx) => (
                    <option key={idx} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>

              {/* Branch */}
              <div>
                <label className="block mb-2 text-gray-300">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-orange-500"
                >
                  <option value="">-- Select Branch --</option>
                  {branches.map((branch, idx) => (
                    <option key={idx} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              {/* Upload Type */}
              <div>
                <label className="block mb-2 text-gray-300">Material Type</label>
                <select
                  value={selectedUploadType}
                  onChange={(e) => setSelectedUploadType(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-orange-500"
                >
                  <option value="">-- Select Material Type --</option>
                  {uploadTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Subject Code */}
              <div>
                <label className="block mb-2 text-gray-300">Subject Code</label>
                <select
                  value={selectedSubjectCode}
                  onChange={(e) => setSelectedSubjectCode(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 border border-orange-500"
                >
                  <option value="">-- Select Subject Code --</option>
                  {subjectCodes.map((code, idx) => (
                    <option key={idx} value={code}>{code}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Detailed Filename */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Detailed File Name</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder='Enter detailed file name here...'
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
                placeholder='Enter a brief description of the material...'
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
                  if (file?.type === 'application/pdf') {
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
      </div>
    </Layout>
    </div>
  );
};

export default UploadPage;
