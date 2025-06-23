
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle } from 'lucide-react'; // Icon for visual cue

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // It's good practice to log this, but avoid overly verbose client-side logs in production.
    // Consider sending this to an error tracking service if high volume.
    console.warn( // Changed to warn for less alarming console output
      "404 Warning: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white p-6 text-center">
      <AlertTriangle className="w-24 h-24 text-yellow-300 mb-8 animate-bounce" />
      <h1 className="text-6xl md:text-8xl font-black font-display mb-4 drop-shadow-lg">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-neutral-100 mb-6 drop-shadow-md">
        Oops! Page Not Found.
      </p>
      <p className="text-lg text-neutral-200 mb-10 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-neutral-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
