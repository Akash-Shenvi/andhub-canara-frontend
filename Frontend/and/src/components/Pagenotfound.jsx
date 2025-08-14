import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white flex flex-col items-center justify-center bg-black">
      {/* 🔄 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-60"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 -z-10" />

      {/* ❌ Error Message */}
      <div className="text-center px-6 animate-fade-in-up">
        <h1 className="text-6xl sm:text-8xl font-bold text-red-500 mb-4 drop-shadow-lg animate-pulse">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-orange-400 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm sm:text-base">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/Dashboard")}
          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-black font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          ⬅ Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
