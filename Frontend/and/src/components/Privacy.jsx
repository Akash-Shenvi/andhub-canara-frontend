import React from 'react';

// Assuming you have a Layout component like the one used in your Dashboard
// If not, you can create a simple one like this:


// Helper component for individual policy sections with an icon
const PolicySection = ({ title, icon, children }) => (
  <div className="mb-10 text-left" >
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

// Main Privacy Policy component
function Privacy() {
  return (
    <div className="h-screen w-screen bg-gray-900 overflow-y-auto">
      
        <div className="w-full text-white">

          {/* Welcome Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight pt-5">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
              Your privacy is important to us. Last updated: August 28, 2025
            </p>
          </header>

          {/* Main Content Card */}
          <main className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">

            <PolicySection 
              title="Introduction"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            >
              <p>
                Welcome to <strong>AND Hub</strong>. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
              </p>
            </PolicySection>

            <PolicySection 
              title="Information We Collect"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>}
            >
              <p>
                To provide you with the best experience, we collect the following information when you register:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li><strong>Name, USN, Branch & Semester:</strong> To identify you and tailor content.</li>
                <li><strong>Email:</strong> For account-related communication like password resets.</li>
                <li><strong>Phone Number:</strong> To contact you for critical account issues only.</li>
                <li><strong>Password:</strong> To secure your account (see note below).</li>
              </ul>
            </PolicySection>
            
            {/* Special Note Section */}
            <div className="bg-gray-900 border-l-4 border-orange-500 p-6 rounded-r-lg my-10 text-left">
                <h3 className="text-xl font-bold text-orange-400 mb-3">An Important Note on Your Data Security</h3>
                <p className="text-gray-300">
                We want to be crystal clear: <strong>your personal details are not shared with anyone.</strong> Your password is encrypted and is never visible to us. The phone number is collected solely for website owners to contact you directly regarding critical account issues. Your privacy is our top priority.
                </p>
            </div>

            <PolicySection 
              title="Data Security"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
            >
              <p>
                We have implemented appropriate security measures designed to protect the security of any personal information we process. However, please remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
            </PolicySection>

            <PolicySection 
              title="Contact Us"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            >
              <p>
                If you have any questions or comments about this policy, you may contact us at <a href="mailto:andcanara0@gmail.com" className="text-orange-400 hover:underline">andcanara0@gmail.com</a>.
              </p>
            </PolicySection>

          </main>
        </div>
      
    </div>
  );
}

export default Privacy;
