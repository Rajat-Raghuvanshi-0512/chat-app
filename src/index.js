import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"
import ProfileProvider from './context/ProfileContext';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProfileProvider>
      <Router>
        <App />
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        pauseOnFocusLoss
        pauseOnHover
      />
    </ProfileProvider>
  </React.StrictMode>
);