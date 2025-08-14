import React from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const materials = [
  {
    name: "Notes",
    description: "Lecture and chapter-wise notes uploaded by students and faculties.",
    route: "/notes",
    color: "bg-orange-500 hover:bg-orange-600"
  },
  {
    name: "Question Papers",
    description: "Previous year university question papers for practice.",
    route: "/question-papers",
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    name: "Question Banks",
    description: "Compiled question sets for revision and preparation.",
    route: "/question-banks",
    color: "bg-green-500 hover:bg-green-600"
  },
   {
    name: "Model Question Papers",
    description: "Model question papers for practice and understanding exam patterns.",
    route: "/model-question-paper",
    color: "bg-orange-500 hover:bg-orange-600"
  },
];

const AllMaterialTypes = () => {
  const navigate = useNavigate();

  return (
        <div className="h-screen w-screen"> 
    <Layout>

      <div className="">
        <h1 className="text-3xl font-bold text-orange-400 mb-6">Available Material Categories</h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {materials.map((mat) => (
              <div
              key={mat.name}
              className={`rounded-xl p-6 shadow-xl cursor-pointer transition duration-200 ${mat.color}`}
              onClick={() => navigate(mat.route)}
              >
              <h2 className="text-xl font-semibold mb-2">{mat.name}</h2>
              <p className="text-sm text-gray-200">{mat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
          </div>
  );
};

export default AllMaterialTypes;
