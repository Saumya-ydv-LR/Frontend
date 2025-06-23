
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { User, AtSign, LockKeyhole } from 'lucide-react'; // Added icons

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault(); // Added form event handling
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup-admin`, { // Assuming this endpoint exists and is correct
        email,
        name,
        password,
      });
      alert('Admin signup successful! Please verify your email if required, then login.'); // Replace with toast
      navigate('/login');
    } catch (error) {
      console.error("Admin Signup error:", error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || 'Admin signup failed. Please try again.';
      alert(errorMessage); // Replace with toast
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = name && email && password;

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-neutral-100 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-105"
        style={{ backgroundImage: "url('https://picsum.photos/seed/admin_signup_bg/1920/1080')" }} // Placeholder
      ></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-md px-8 py-10 rounded-xl shadow-2xl w-full max-w-lg border border-red-300">
        <h2 className="text-3xl font-bold font-display text-red-600 mb-8 text-center">Admin Registration</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-red-700 mb-1">Admin Name</label>
            <div className="flex items-center border border-red-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-red-500 bg-white shadow-sm">
              <User className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="text"
                placeholder="Admin full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none bg-transparent placeholder-neutral-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-700 mb-1">Admin Email</label>
             <div className="flex items-center border border-red-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-red-500 bg-white shadow-sm">
              <AtSign className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent placeholder-neutral-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-700 mb-1">Password</label>
            <div className="flex items-center border border-red-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-red-500 bg-white shadow-sm">
                <LockKeyhole className="w-5 h-5 text-red-500 mr-2" />
                <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent placeholder-neutral-400"
                minLength="6"
                required
              />
            </div>
          </div>

          <button
            type="submit" // Changed to submit
            disabled={loading || !isFormValid}
            className={`w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold shadow-md 
              ${(loading || !isFormValid) ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'}`}
          >
             {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Registering Admin...
                </span>
              ) : 'Register Admin'}
          </button>
        </form>

        <p className="text-sm text-neutral-600 mt-6 text-center">
          Already registered as Admin? <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
