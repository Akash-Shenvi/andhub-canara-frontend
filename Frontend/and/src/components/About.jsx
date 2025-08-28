import React from 'react';

// Helper component for individual sections with an icon
const AboutSection = ({ title, icon, children }) => (
  <div className="mb-10">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-semibold text-orange-400 ml-3">
        {title}
      </h2>
    </div>
    <div className="text-gray-300 space-y-4 text-base sm:text-lg border-l-2 border-gray-700 pl-6">
      {children}
    </div>
  </div>
);


// Main About Us component
function AboutUs() {
  return (
    <div className="h-screen w-screen bg-gray-900 overflow-y-auto text-left pt-5">
        <div className="w-full text-white">

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                About AND Hub
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Learn more about our mission, our story, and how you can be a part of our community.
            </p>
          </header>

          {/* Main Content Card */}
          <main className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">

            <AboutSection
              title="Our Mission"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /></svg>}
            >
              <p>
                Our mission is to create a free, centralized, and collaborative platform for students to easily share and access high-quality academic resources. We believe that learning is easier when we work together.
              </p>
            </AboutSection>

            <AboutSection
              title="What We Offer"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            >
              <p>
                On AND Hub, you'll find a comprehensive collection of resources curated by students, for students:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Detailed class notes and study guides.</li>
                <li>Previous years' question papers to help you prepare.</li>
                <li>Curated question banks for targeted practice.</li>
                <li>Essential placement preparation materials to kickstart your career.</li>
              </ul>
            </AboutSection>

            <AboutSection
              title="Our Story"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            >
              <p>
                AND Hub was started by a group of students who were tired of searching through scattered and unreliable resources. We wanted to build a single, organized hub where all the necessary academic materials could be found, shared, and trusted by the student community.
              </p>
            </AboutSection>

           <AboutSection
  title="Join Our Community"
  icon={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-orange-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-6a4 4 0 11-8 0 4 4 0 018 0zm6 6v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h14a2 2 0 012 2z"
      />
    </svg>
  }
>
  <p>
    This platform is built by students, for students. We encourage you to upload
    your own materials to help the community grow and support your peers.
    Together, we can make learning more accessible for everyone.
  </p>
</AboutSection>

          </main>
        </div>
    </div>
  );
}

export default AboutUs;
