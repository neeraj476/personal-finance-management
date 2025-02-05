import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';  // Your styles
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import { TransactionProvider } from './context/TransactionContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <TransactionProvider>
    <AuthProvider>
        <App />
        <ToastContainer/>
      </AuthProvider>
    </TransactionProvider>
    </Router>
  </StrictMode>
);
