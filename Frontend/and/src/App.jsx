import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Icon = ({ d, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={d} />
  </svg>
);
const ICONS = {
  notes: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  questionPapers: "M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2L7.5 3.5L6 2v14h14V2l-1.5 1.5zM19 15h-2v-2h2v2zm-4 0h-2v-2h2v2zm-4 0H9v-2h2v2zm-4 0H5v-2h2v2zm4-4H9V9h2v2zm-4 0H5V9h2v2zm8 0h-2V9h2v2zm4 0h-2V9h2v2z",
  questionBanks: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 9h-2.5v2.5h-3V11H8V8h2.5V5.5h3V8H16v3z",
  modelPapers: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  aptitude: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 12.17l7.59-7.59L19 6l-9 9z",
  coding: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  ease: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z",
  secure: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
  collaborative: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  upload: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z",
  search: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  learn: "M12 14c1.66 0 2.99-1.34 2.99-3L15 5H9v6c0 1.66 1.34 3 3 3zm-1.21-9.9l.21-.21c.39-.39 1.02-.39 1.41 0l.21.21c.39.39.39 1.02 0 1.41l-.21.21c-.39.39-1.02-.39-1.41 0l-.21-.21a.9959.9959 0 0 1 0-1.41zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
};
const App = () => {
  const navigate = useNavigate();


useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  const materialCategories = [
    { title: 'Notes', description: 'Lecture and chapter-wise notes uploaded by students and faculties.', color: 'bg-orange-500', icon: ICONS.notes },
    { title: 'Question Papers', description: 'Previous year university question papers for practice.', color: 'bg-blue-500', icon: ICONS.questionPapers },
    { title: 'Question Banks', description: 'Compiled question sets for revision and preparation.', color: 'bg-green-500', icon: ICONS.questionBanks },
    { title: 'Model Question Papers', description: 'Model question papers for practice and understanding exam patterns.', color: 'bg-red-500', icon: ICONS.modelPapers },
    { title: 'Aptitude', description: 'Aptitude questions and resources for placement preparation.', color: 'bg-indigo-500', icon: ICONS.aptitude },
    { title: 'Coding', description: 'Programming resources and code snippets for various languages.', color: 'bg-purple-500', icon: ICONS.coding },
  ];

  const features = [
    { title: 'Ease of Use', description: 'Quickly share assignments and notes with just a few clicks.', icon: ICONS.ease },
    { title: 'Secure Platform', description: 'Your data is safe and accessible only to authorized users.', icon: ICONS.secure },
    { title: 'Collaborative Tools', description: 'Work with peers and improve resource sharing efficiently.', icon: ICONS.collaborative },
  ];
  
  const howItWorksSteps = [
    { title: 'Upload & Share', description: 'Easily upload your documents, notes, and assignments to our secure cloud.', icon: ICONS.upload },
    { title: 'Discover & Download', description: 'Search and filter through a vast library of resources shared by the community.', icon: ICONS.search },
    { title: 'Learn & Collaborate', description: 'Use the shared knowledge to enhance your studies and collaborate on projects.', icon: ICONS.learn },
  ];

  // This function now uses the navigate hook to change routes
  const handleGetStarted = () => {
    navigate('/participate');
  };

  return (
    <div className="h-screen w-screen">
      <div className="bg-gray-900 text-white font-sans">
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
        .animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
        .animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }
        .animate-on-scroll:nth-child(5) { transition-delay: 0.4s; }
        .animate-on-scroll:nth-child(6) { transition-delay: 0.5s; }
        .card-glow:hover {
          box-shadow: 0 0 15px 5px var(--glow-color);
        }
      `}</style>
      
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        <div className="relative z-20 p-6 animate-on-scroll is-visible">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
            Welcome to <span className="text-orange-400">AND</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
            The Ultimate Assignment and Notes Sharing Platform
          </p>
          <p className="mt-4 text-md md:text-lg text-gray-300 max-w-2xl mx-auto">
            Seamlessly share assignments, notes, and resources to boost your collaborative learning experience.
          </p>
        </div>
        <div className="absolute bottom-10 z-20 text-white animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </div>
      </div>

      <section className="py-20 bg-black/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Why Choose <span className="text-orange-400">AND</span>?</h2>
            <p className="mt-4 text-lg text-gray-400">We provide the best tools for a collaborative educational environment.</p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3 text-center">
            {features.map((feature) => (
              <div key={feature.title} className="animate-on-scroll">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-orange-400 text-gray-900 shadow-lg">
                  <Icon d={feature.icon} className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-extrabold text-orange-400">Simple Steps to Success</h2>
            <p className="mt-4 text-lg text-gray-400">Get started in just a few moments.</p>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3 text-center">
            {howItWorksSteps.map((step) => (
              <div key={step.title} className="animate-on-scroll">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-800 border-2 border-orange-400 text-orange-400 shadow-lg">
                  <Icon d={step.icon} className="h-12 w-12" />
                </div>
                <h3 className="mt-8 text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-extrabold text-orange-400">Available Material Categories</h2>
            <p className="mt-4 text-lg text-gray-400">Explore a wide range of resources shared by your peers and faculty.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {materialCategories.map((category) => (
              <div
                key={category.title}
                className={`flex flex-col p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${category.color} text-white animate-on-scroll card-glow`}
                style={{ '--glow-color': category.color.replace('bg-', 'var(--tw-color-') + '-500' }}
              >
                <div className="flex-shrink-0">
                  <Icon d={category.icon} className="h-10 w-10 text-white/80" />
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="mt-2 text-white/90">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gray-800 p-10 rounded-2xl shadow-2xl animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to Elevate Your Learning?</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Join the AND community today and unlock a world of shared knowledge. It's free and always will be.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold text-lg rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-orange-400/50"
          >
            Get Started Now
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-gray-800">
  <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
    {/* Navigation Links */}
    <div className="mb-4 flex justify-center space-x-6">
      <a href="/about" className="text-gray-400 hover:text-gray-200 transition">
        About
      </a>
      <a href="/contact" className="text-gray-400 hover:text-gray-200 transition">
        Contact Us
      </a>
      <a href="/privacy" className="text-gray-400 hover:text-gray-200 transition">
        Privacy Policy
      </a>
    </div>

    {/* Copyright */}
    <p className="text-gray-500">
      &copy; {new Date().getFullYear()} AND Platform. All rights reserved.
    </p>
  </div>
</footer>

    </div>
    </div>
  );
};

export default App;
