import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Auth/Login';
import Forgotpass from './components/Auth/Forgotpass';
import Dashboard from './components/Home/Users/Dashboard';
// import Assignments from './components/Home/Users/Assignments';
import Notes from './components/Home/Users/Notes';
import Profile from './components/Home/Users/Profile';
import Questionbank from './components/Home/Users/Questionbank';
import Questionpaper from './components/Home/Users/Questionpaper';
// import Uploadmaterials from './components/Home/Users/Uploadmaterials';
import Adminviewer from './components/Home/Users/Admin/Adminviewer';
import Adminalluserlist from './components/Home/Users/Admin/Adminalluserlist';
import Adminuploder from './components/Home/Users/Admin/Adminuploder';
import Admin from './components/Home/Users/Admin/Adminview'; // Importing the admin component
import Materials from './components/Home/Users/Materials'; // Importing the materials component
import Modelquestion from './components/Home/Users/Modelquestion'; // Importing the model question component
import PageNotFound from './components/Pagenotfound'; // Importing the PageNotFound component
import Protected from './components/Protected';
import CheckLogin from './components/CheckLogin'; // Importing the CheckLogin component
const rootElement = document.getElementById('root');

// Ensure `rootElement` exists before rendering
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckLogin><App/></CheckLogin>} />
          <Route path="/participate" element={<Login/>} />
          <Route path="/forgotpass" element={<Forgotpass />} />
          <Route path="/Dashboard" element={<Protected><Dashboard /></Protected>} />
          {/* <Route path='/assignments' element={<Assignments />} /> */}
          <Route path='/notes' element={<Protected><Notes /></Protected>} />
          <Route path='/profile' element={<Protected><Profile /></Protected>} />
          <Route path='/question-banks' element={<Protected><Questionbank /></Protected>} />
          <Route path='/question-papers' element={<Protected><Questionpaper /></Protected>} />
          {/* <Route path='/uplode-materials' element={<Uploadmaterials />} /> */}
          {/* <Route path='/uplode-assignments' element={<Uploadassignments/>}/> */}
          <Route path='/admin' element={<Protected><Admin /></Protected>} /> {/* Route for the admin component */}
          {/* Admin routes */}
          <Route path='/admin-viewer-page' element={<Protected><Adminviewer/></Protected>} />
          <Route path='/admin-user-list-page' element={<Protected><Adminalluserlist/></Protected>} />
          <Route path='/admin-uploader' element={<Protected><Adminuploder/></Protected>} />
          <Route path='/materials' element={<Protected><Materials /></Protected>} />
          <Route path='/model-question-paper' element={<Protected><Modelquestion /></Protected>} />
          {/* Add more routes as needed */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found. Ensure the HTML file has a <div id="root"></div>.');
}
