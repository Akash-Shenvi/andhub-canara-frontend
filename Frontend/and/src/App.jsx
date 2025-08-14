import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const App = () => {
  const navigate = useNavigate();
  const [API_BASE_URL, setApiBaseUrl] = useState("");

  // Step 1: Load base URL
  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const response = await fetch('/base_data.json');
        const data = await response.json();
        setApiBaseUrl(data.API_BASE_URL);
      } catch (error) {
        console.error('Failed to load API_BASE_URL:', error);
      }
    };
    fetchBaseUrl();
  }, []);

  const handleGetStarted = () => {
    navigate('/participate'); // or '/Login'
  };

  return (
    <div className="h-screen w-screen">
      <div className="relative min-h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
        <video
          id="background-video"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>

        <header className="flex flex-col items-center text-center py-12">
          <h1 className="text-5xl font-bold text-orange-400 mb-2 animate-fade-in">AND</h1>
          <h2 className="text-2xl font-medium bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent animate-fade-in-delay">
            Assignment and Notes Sharing Platform
          </h2>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center space-y-6">
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed animate-fade-in-up">
            Welcome to AND! Our platform makes sharing assignments, notes, and resources seamless and efficient.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </main>

        <section className="bg-gray-900 text-gray-200 py-10 px-4">
          <h3 className="text-3xl font-semibold text-center mb-6 animate-fade-in">
            Why Choose AND?
          </h3>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              { title: 'Ease of Use', desc: 'Quickly share assignments and notes with just a few clicks.' },
              { title: 'Secure Platform', desc: 'Your data is safe and accessible only to authorized users.' },
              { title: 'Collaborative Tools', desc: 'Work with peers and improve resource sharing efficiently.' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 bg-orange-400 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-800">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-black text-gray-400 text-center py-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} AND. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
