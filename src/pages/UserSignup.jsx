
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { User, AtSign, Phone, LockKeyhole } from 'lucide-react'; // Added icons

const UserSignup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Added form event handling
    setLoading(true);

    const payload = {
      name,
      email,
      mobile: phone,
      password,
      role: 'user', // Default role for user signup
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/Register`, payload);
      alert('Signup successful! Please check your email to verify your account if required, then login.'); // Replace with toast
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please check your details or try again later.';
      alert(errorMessage); // Replace with toast
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = name && email && phone && password;

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-neutral-100 py-10">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-105"
        style={{ backgroundImage: "url('https://picsum.photos/seed/user_signup_bg/1920/1080')" }} // Placeholder
      ></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-md px-8 py-10 rounded-xl shadow-2xl w-full max-w-lg border border-red-300">
        <h2 className="text-3xl font-bold font-display text-red-600 mb-8 text-center">Create Your Account</h2>
        
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-red-700 mb-1">Full Name</label>
            <div className="flex items-center border border-red-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-red-500 bg-white shadow-sm">
              <User className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none bg-transparent placeholder-neutral-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-700 mb-1">Mobile Number</label>
            <div className="flex items-center border border-red-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-red-500 bg-white shadow-sm">
              <Phone className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="tel" // Changed to tel
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full outline-none bg-transparent placeholder-neutral-400"
                pattern="[0-9]{10}" // Basic pattern for 10 digits
                title="Please enter a valid 10-digit mobile number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-red-700 mb-1">Email Address</label>
            <div className="flex items-center border border-red-300 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-red-500 bg-white shadow-sm">
              <AtSign className="w-5 h-5 text-red-500 mr-2" />
              <input
                type="email"
                placeholder="you@example.com"
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent placeholder-neutral-400"
                minLength="6" // Basic password strength
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
                  Signing up...
                </span>
              ) : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-neutral-600 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
