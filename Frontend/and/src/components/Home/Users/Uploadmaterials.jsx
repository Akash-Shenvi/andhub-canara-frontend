// import React, { useState, useEffect } from 'react';
// import Layout from './Layout';

// const UploadPage = () => {
//   const [selectedSem, setSelectedSem] = useState('');
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [selectedUploadType, setSelectedUploadType] = useState('');
//   const [uploadTypes] = useState(["Question Paper", "Question Bank", "Notes", "Assignments"]);

//   const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

//   useEffect(() => {
//     if (selectedSem) {
//       fetch(`http://10.193.152.138:5000/pages/upload/academics?semester=${selectedSem}`)
//         .then(response => response.json())
//         .then(data => setSubjects(data.subjects))
//         .catch(error => console.error("Error fetching subjects:", error));
//     }
//   }, [selectedSem]);

//   return (
//     <Layout>
//       <div className='h-screen w-screen'>
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
//           <h1 className="text-3xl md:text-4xl font-semibold text-orange-400 mb-6">Upload Page</h1>
          
//           {/* Semester Selection */}
//           <div className="w-full max-w-md">
//             <label className="block text-lg mb-2 text-gray-300">Select Semester:</label>
//             <select
//               className="w-full p-3 bg-gray-800 text-white rounded-lg border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
//               value={selectedSem}
//               onChange={(e) => {
//                 setSelectedSem(e.target.value);
//                 setSelectedSubject('');
//                 setSelectedUploadType('');
//               }}
//             >
//               <option value="">-- Select Semester --</option>
//               {semesters.map((sem, index) => (
//                 <option key={index} value={sem}>{sem}</option>
//               ))}
//             </select>
//           </div>
          
//           {/* Subject Selection */}
//           {subjects.length > 0 && (
//             <div className="mt-6 w-full max-w-md">
//               <label className="block text-lg mb-2 text-gray-300">Select Subject:</label>
//               <select
//                 className="w-full p-3 bg-gray-800 text-white rounded-lg border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 value={selectedSubject}
//                 onChange={(e) => {
//                   setSelectedSubject(e.target.value);
//                   setSelectedUploadType('');
//                 }}
//               >
//                 <option value="">-- Select Subject --</option>
//                 {subjects.map((subject, index) => (
//                   <option key={index} value={subject}>{subject}</option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Upload Type Selection */}
//           {selectedSubject && (
//             <div className="mt-6 w-full max-w-md">
//               <label className="block text-lg mb-2 text-gray-300">Select Upload Type:</label>
//               <select
//                 className="w-full p-3 bg-gray-800 text-white rounded-lg border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 value={selectedUploadType}
//                 onChange={(e) => setSelectedUploadType(e.target.value)}
//               >
//                 <option value="">-- Select Upload Type --</option>
//                 {uploadTypes.map((type, index) => (
//                   <option key={index} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* File Selection & Upload Button (Only shown when Upload Type is selected) */}
//           {selectedSubject && selectedUploadType && (
//             <div className="mt-6 w-full max-w-md border border-orange-400 p-4 rounded-lg">
//               {/* File Input */}
//               <label className="block text-lg mb-2 text-gray-300">Select File:</label>
//               <input
//                 type="file"
//                 accept=".pdf, image/*"
//                 multiple
//                 onChange={(e) => {
//                   const files = e.target.files;
//                   const pdfFiles = Array.from(files).filter(file => file.type === "application/pdf");
//                   const imageFiles = Array.from(files).filter(file => file.type.startsWith("image/"));

//                   if (pdfFiles.length > 1) {
//                     alert("You can only upload one PDF file.");
//                     e.target.value = "";
//                     return;
//                   }
//                   if (imageFiles.length > 5) {
//                     alert("You can upload a maximum of 5 images.");
//                     e.target.value = "";
//                     return;
//                   }
//                 }}
//                 className="w-full p-3 bg-gray-800 text-white rounded-lg border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
//               />

//               {/* Upload Button */}
//               {/* Upload Button */}
// <button
//   className="mt-4 w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
//   onClick={() => {
//     const fileInput = document.querySelector('input[type="file"]');
//     if (!fileInput.files.length) {
//       alert("Please select a file before uploading.");
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < fileInput.files.length; i++) {
//       formData.append("files", fileInput.files[i]);
//     }
//     formData.append("semester", selectedSem);
//     formData.append("subject", selectedSubject);
//     formData.append("uploadType", selectedUploadType);

//     fetch("http://192.168.43.160:5000/pages/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then(response => response.json())
//       .then(data => {
//         alert("Upload Successful!");
//         window.location.reload(); // Refresh the page
//       })
//       .catch(error => {
//         console.error("Error uploading file:", error);
//         alert("Upload failed. Please try again.");
//       });
//   }}
// >
//   Upload
// </button>

//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default UploadPage;
