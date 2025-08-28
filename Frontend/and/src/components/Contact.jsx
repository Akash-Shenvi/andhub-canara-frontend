import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactUs() {
  const [API_BASE_URL, setApiBaseUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const response = await fetch("/base_data.json");
        const data = await response.json();
        setApiBaseUrl(data.API_BASE_URL);
      } catch (error) {
        console.error("Error loading API_BASE_URL:", error);
      }
    };
    fetchBaseUrl();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setSending(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/users/contact`, formData);

      if (response.status === 200) {
        alert("Thank you for your message! We will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send your message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-screen w-screen">
    
    <div className="min-h-screen w-full bg-gray-900 overflow-y-auto pt-5 px-4 sm:px-6 md:px-0">
      <div className="w-full text-white">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
            Have questions, feedback, or a suggestion? We'd love to hear from you!
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Side: Contact Form */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-7 sm:p-8">
            <h2 className="text-2xl font-semibold text-orange-400 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { label: "Full Name", type: "text", name: "name" },
                { label: "Email Address", type: "email", name: "email" },
                { label: "Subject", type: "text", name: "subject" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-300 mb-2"
                    >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="appearance-none w-full md:w-[450px] bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full md:w-[450px] bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full md:w-[450px] bg-gradient-to-r from-orange-500 to-yellow-500 
                    text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg 
                    transition-transform transform hover:scale-105 hover:-translate-y-1 
                    ${sending ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                  {sending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 text-left">
            <h2 className="text-2xl font-semibold text-orange-400 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-400 mr-4 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-gray-400">
                    For any questions, feedback, or support inquiries.
                  </p>
                  <a
                    href="mailto:andcanara0@gmail.com"
                    className="text-orange-400 hover:underline break-all"
                    >
                    andcanara0@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-400 mr-4 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Response Time</h3>
                  <p className="text-gray-400">
                    We do our best to respond to all inquiries within 24-48
                    hours on business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
                    </div>
  );
}

export default ContactUs;
