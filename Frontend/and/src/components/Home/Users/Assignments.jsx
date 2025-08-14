import React, { useState, useEffect } from 'react';
import Layout from './Layout'; // Import Layout for consistent styling

function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentAssignments, setRecentAssignments] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch recently uploaded assignments from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/recent-assignments') // Adjust the Flask API endpoint
      .then((response) => response.json())
      .then((data) => setRecentAssignments(data))
      .catch((error) => console.error('Error fetching assignments:', error));
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('assignment', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload-assignment', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.message || 'Assignment uploaded successfully!');
    } catch (error) {
      console.error('Error uploading assignment:', error);
      alert('Failed to upload assignment.');
    }
  };

  return (
    <Layout>
      {/* Search Bar Section */}
      <div className='w-screen h-screen'>

      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-orange-400">Assignments</h1>
        <p className="text-base md:text-lg text-gray-300">Search, upload, and view assignments easily.</p>

        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
        </div>
      </section>

      {/* Upload Assignment Section */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-orange-400">Upload Assignment</h2>
        <form onSubmit={handleFileUpload} className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
            />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-orange-400 text-white font-semibold hover:bg-orange-500 transition"
            >
            Upload
          </button>
        </form>
      </section>

      {/* Recently Uploaded Assignments */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-orange-400 text-center">Recently Uploaded Assignments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentAssignments.map((assignment, index) => (
            <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={assignment.imageUrl}
                alt={`Assignment ${index + 1}`}
                className="w-full h-48 object-cover rounded-t-lg mb-2"
              />
              <p className="text-gray-300 text-sm">{assignment.title || 'Untitled Assignment'}</p>
            </div>
          ))}
        </div>
      </section>
          </div>
    </Layout>
  );
}

export default AssignmentsPage;
