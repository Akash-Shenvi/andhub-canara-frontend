import React, { useState } from 'react';
import '../../../index.css';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="layout-wrapper min-h-screen w-full flex flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white">

      {/* Header */}
      <header className="layout-header bg-black text-white py-4 px-6 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold tracking-wide">MyDashboard</div>
        <nav>
          <ul className="layout-nav hidden md:flex space-x-6">
            <li><Link to="/dashboard" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><Link to="/materials" className="hover:text-orange-400 transition-colors">All-Materials</Link></li>
            <li><Link to="/notes" className="hover:text-orange-400 transition-colors">Notes</Link></li>
            <li><Link to="/question-papers" className="hover:text-orange-400 transition-colors">Question Papers</Link></li>
            <li><Link to="/question-banks" className="hover:text-orange-400 transition-colors">Question Banks</Link></li>
            <li><Link to="/admin-uploader" className="hover:text-orange-400 transition-colors">Upload</Link></li>
            <li><Link to="/profile" className="hover:text-orange-400 transition-colors">Profile</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="layout-menu-icon md:hidden">
          <button
            className="text-white hover:text-orange-400 focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="layout-drawer fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
          <button
            className="self-end text-white p-4"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="flex-1 overflow-auto px-6 py-4">
            <ul className="space-y-4">
              <li><Link to="/dashboard" className="block text-lg hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/materials" className="hover:text-orange-400 transition-colors">All-Materials</Link></li>
              <li><Link to="/notes" className="block text-lg hover:text-orange-400 transition-colors">Notes</Link></li>
              <li><Link to="/question-papers" className="block text-lg hover:text-orange-400 transition-colors">Question Papers</Link></li>
              <li><Link to="/question-banks" className="block text-lg hover:text-orange-400 transition-colors">Question Banks</Link></li>
              <li><Link to="/admin-uploader" className="hover:text-orange-400 transition-colors">Upload</Link></li>
              <li><Link to="/profile" className="block text-lg hover:text-orange-400 transition-colors">Profile</Link></li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 md:px-7 md:py-16 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="layout-footer bg-black text-white py-6 text-center w-full border-t border-gray-800">
        <p className="text-sm md:text-base font-medium text-orange-400">
          📚 Made by Students, for Students
        </p>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          &copy; {new Date().getFullYear()} TEAM-AND-HUB — Empowering academic success.
        </p>
        <p className="text-xs text-gray-500">
          Learn • Share • Grow Together 🚀
        </p>
      </footer>

    </div>
  );
}

export default Layout;
