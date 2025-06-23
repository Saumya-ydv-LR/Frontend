import React from 'react';
import { Toaster } from './components/ui/Toaster';
import { Toaster as Sonner } from './components/ui/Sonner'; // Sonner will be a minimal placeholder
import { TooltipProvider } from './components/ui/Tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import VerifyEmailPage from './pages/VerifyEmailPage';
import Login from './pages/Login';
import UserSignup from './pages/UserSignup';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import SearchResults from './pages/SearchResults'; // ✅ NEW

// Components
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner /> {/* Minimal placeholder Sonner */}
      <HashRouter>
        <Navbar />
        {/* Page content below the fixed navbar */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup-user" element={<UserSignup />} />
            <Route path="/signup-admin" element={<AdminSignup />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/search" element={<SearchResults />} /> {/* ✅ ADDED */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
