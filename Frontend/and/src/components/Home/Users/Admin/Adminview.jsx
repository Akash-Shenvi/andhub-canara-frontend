import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "📄 Material View Page",
      description: "Manage and view all uploaded materials.",
      route: "/admin-viewer-page",
      bg: "bg-blue-600",
    },
    {
      title: "👥 User Management",
      description: "View, edit, promote, or demote users.",
      route: "/admin-user-list-page",
      bg: "bg-green-600",
    },
    {
      title: "⤴️ Upload Materials",
      description: "Upload new notes, question papers or banks.",
      route: "/admin-uploader",
      bg: "bg-purple-600",
    },
  ];

  return (
      <div className="h-screen w-screen">
    <Layout>

      <div className="">
        <h1 className="text-3xl font-bold text-orange-400 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
            key={index}
            className={`rounded-lg shadow-md p-6 hover:scale-[1.02] transition-transform duration-200 ${card.bg} cursor-pointer`}
              onClick={() => navigate(card.route)}
              >
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
              </div>
  );
};

export default AdminDashboard;
