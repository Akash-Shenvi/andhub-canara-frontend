import React, { useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const materials = [
  {
    name: "Notes",
    description: "Lecture and chapter-wise notes uploaded by students and faculties.",
    route: "/notes",
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    name: "Question Papers",
    description: "Previous year university question papers for practice.",
    route: "/question-papers",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    name: "Question Banks",
    description: "Compiled question sets for revision and preparation.",
    route: "/question-banks",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Model Question Papers",
    description: "Model question papers for practice and understanding exam patterns.",
    route: "/model-question-paper",
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    name: "Aptitude",
    description: "Aptitude questions and resources for placement preparation.",
    route: "/aptitude",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    name: "Coding",
    description: "Programming resources and code snippets for various languages.",
    route: "/code",
    color: "bg-green-500 hover:bg-green-600",
  },
];

const AllMaterialTypes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter materials by name or description
  const filteredMaterials = materials.filter(
    (mat) =>
      mat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-screen">
      <Layout>
        <div className="">
          <h1 className="text-3xl font-bold text-orange-400 mb-6">
            Available Material Categories
          </h1>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search materials Categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Material Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((mat) => (
                <div
                  key={mat.name}
                  className={`rounded-xl p-6 shadow-xl cursor-pointer transition duration-200 ${mat.color}`}
                  onClick={() => navigate(mat.route)}
                >
                  <h2 className="text-xl font-semibold mb-2">{mat.name}</h2>
                  <p className="text-sm text-gray-200">{mat.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No materials found.
              </p>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AllMaterialTypes;
