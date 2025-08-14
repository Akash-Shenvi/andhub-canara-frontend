import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { Link,useNavigate } from 'react-router-dom'; // for navigation

function Dashboard() {
  const [semester, setSemester] = useState(null);
  // const [uploads, setUploads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem('token');
    //   if (!token){

    //     // alert("Please Login"); // Welcome message
    //     navigate('/'); 
    //   };
    // Fetch logic commented until feature is live
    /*
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile');
        const data = await response.json();
        if (data.semester) {
          setSemester(data.semester);
          fetchUploads(data.semester);
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    const fetchUploads = async (sem) => {
      try {
        const response = await fetch(`http://localhost:5000/api/recent-uploads?sem=${sem}`);
        const data = await response.json();
        setUploads(data);
      } catch (error) {
        console.error('Failed to fetch recent uploads', error);
      }
    };

    fetchProfile();
    */
  }, []);

  return (
    <Layout>
      <div className='h-screen w-screen'>

      <div className="min-h-screen w-full px-4 md:px-8 py-8 bg-gray-900">
        {/* Welcome Section */}
        <section className="dashboard-welcome text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
            Welcome to{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                AND HUB
              </span>
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 mt-4 animate-fade-in-delay">
            Your all-in-one platform for academic success.
          </p>
        </section>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Recently Uploaded Section */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 lg:w-2/3">
            <h2 className="text-xl font-semibold text-orange-400 mb-4">Recently Uploaded</h2>

            {/* Coming Soon Placeholder */}
            <div className="text-center text-gray-400 text-lg py-10">
              🚧 This feature is coming soon!
            </div>

            {/* Uncomment when ready:
            {loading ? (
              <p className="text-center text-gray-300">Loading...</p>
              ) : uploads.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                {uploads.map((item, index) => (
                  <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 rounded-lg p-4 hover:shadow-orange-400/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block"
                  >
                  <h3 className="text-lg font-medium text-orange-400">{item.name}</h3>
                  <p className="text-sm text-gray-300">{item.date}</p>
                  </a>
                  ))}
                  </div>
                  ) : (
                    <p className="text-gray-300">No recent uploads for your semester.</p>
                    )}
                    */}
          </div>

          {/* Sidebar Options */}
          <div className="lg:w-1/3 bg-gray-800 rounded-xl shadow-2xl p-6">
            <section className="space-y-4">
              {[
                {
                  title: 'Assignments',
                  description: 'Access uploaded assignments and submit your solutions easily',
                  link: '/assignments',
                },
                {
                  title: 'Notes',
                  description: 'Access well-organized notes for your semester',
                  link: '/notes',
                },
                {
                  title: 'Question Papers',
                  description: 'Practice with previous year question papers.',
                  link: '/question-papers',
                },
                {
                  title: 'Question Banks',
                  description: 'Comprehensive question sets for exams.',
                  link: '/question-banks',
                },
              ].map((card, index) => (
                <Link
                key={index}
                to={card.link}
                className="block bg-orange-400 rounded-xl shadow-lg p-4 hover:shadow-orange-400/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                >
                  <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">
                    {card.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-900">{card.description}</p>
                </Link>
              ))}
            </section>
          </div>
        </div>
      </div>
              </div>
    </Layout>
  );
}

export default Dashboard;
