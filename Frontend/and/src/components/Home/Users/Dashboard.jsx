import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

// Data for the quick access cards to keep the JSX cleaner.
const quickAccessLinks = [
  {
    title: "All-Materials",
    description: "Explore all the resources we’ve curated just for you",
    link: "/materials",
  },
  {
    title: "Notes",
    description: "Access well-organized notes for your semester.",
    link: "/notes",
  },
  {
    title: "Question Papers",
    description: "Practice with past year question papers.",
    link: "/question-papers",
  },
  {
    title: "Question Banks",
    description: "Comprehensive sets of exam questions.",
    link: "/question-banks",
  },
];

function Dashboard() {
  return (
    <div className="h-screen w-screen bg-gray-900 overflow-y-auto">
    <Layout>
      {/* FIX: This container no longer needs its own padding, as the Layout component handles it. */}
      <div className="w-full text-white">
        
        {/* Welcome Header */}
        {/* FIX: Removed padding (py-12 px-4) as Layout's <main> tag provides it. Added bottom margin (mb-12) for spacing. */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              AND HUB
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
            Your all-in-one platform for sharing assignments, notes, and academic resources.
          </p>
        </header>

        {/* Main Content Grid 
          FIX: Removed padding classes (px-*, pb-*) as the Layout component now controls this spacing.
        */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-10">
          
          {/* Left: Recently Uploaded Section */}
          <section className="bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-orange-400 mb-6">
              Recently Uploaded
            </h2>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <p className="text-gray-400 text-base sm:text-lg text-center px-2">
                🚧 This feature is coming soon!
              </p>
            </div>
          </section>

          {/* Right: Quick Access Cards */}
          <aside className="space-y-5">
            {quickAccessLinks.map((card, idx) => (
              <Link
                key={idx}
                to={card.link}
                className="block w-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl shadow-lg p-5 
                transition-transform transform hover:scale-105 hover:-translate-y-1 hover:shadow-orange-400/30"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-gray-800">
                  {card.description}
                </p>
              </Link>
            ))}
          </aside>
        </div>
      </div>
    </Layout>
    </div>
  );
}

export default Dashboard;
