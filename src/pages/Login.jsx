
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, User, LockKeyhole, Mail, Phone } from 'lucide-react'; // Added icons

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { password };
    if (isEmail(identifier)) {
      payload.email = identifier;
    } else {
      payload.mobile = identifier; // Assuming non-email is mobile
    }
    

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/Login`,
        payload,
        { withCredentials: true }
      );

      // Store token if needed, e.g., in localStorage or context, cookies are httpOnly
      // For this example, relying on httpOnly cookie set by backend.
      
      const cookieToken = document.cookie.match(/accessToken=([^;]+)/);
      if (cookieToken) {
        console.log("Access Token (DEV - from cookie):", cookieToken[1]);
        // Typically, you wouldn't log this in production
      } else {
        console.warn("No access token found in cookies after login. Ensure backend sets it correctly with HttpOnly, SameSite, Secure flags.");
      }

      const userRole = res.data?.user?.role; // Ensure 'user' object and 'role' exist
      alert('Login successful!'); // Replace with a toast notification for better UX

      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/'); // Or to user dashboard: /user-dashboard
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials or try again later.';
      alert(errorMessage); // Replace with toast
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => navigate('/signup-user');
  const handleAdminSignup = () => navigate('/signup-admin');
  const handleForgotPassword = async () => {
    if (!identifier) {
      alert('Please enter your email or mobile number first.'); // Replace with toast
      return;
    }

    const payload = {};
    if (isEmail(identifier)) {
      payload.email = identifier;
    } else {
      payload.mobile = identifier;
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forget-password`, payload);
      alert("If an account exists for this identifier, password reset instructions have been sent!"); // Replace with toast
    } catch (error) {
      console.error("Forgot password error:", error.response ? error.response.data : error.message);
      alert("Failed to send reset instructions. Please ensure the email/mobile is correct or try again later."); // Replace with toast
    } finally {
      setLoading(false);
    }
  };

  // SVG graffiti pattern (remains as is, stroke="#000" is fine for SVG elements)
  const graffitiPattern = (
    <svg
      width="100%"
      height="100%"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.12, // Adjusted opacity
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="graffiti" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
          <g opacity="0.7">
            <rect x="10" y="60" rx="8" ry="8" width="38" height="15" fill="none" stroke="#000" strokeWidth="1.5"/>
            <ellipse cx="29" cy="61" rx="19" ry="7" fill="none" stroke="#000" strokeWidth="1.5"/>
            <ellipse cx="29" cy="54" rx="19" ry="7" fill="none" stroke="#000" strokeWidth="1.5"/>
          </g>
          <g opacity="0.7">
            <ellipse cx="80" cy="32" rx="15" ry="6" fill="none" stroke="#000" strokeWidth="1.5"/>
            <ellipse cx="66" cy="31" rx="1.5" ry="1" fill="#000"/>
            <ellipse cx="94" cy="33" rx="1.5" ry="1" fill="#000"/>
          </g>
          <g opacity="0.6">
            <path d="M60 80 Q90 90 80 60 Q70 50 55 65 Q50 85 60 80" fill="none" stroke="#000" strokeWidth="1.5"/>
            <ellipse cx="70" cy="73" rx="5" ry="2" fill="none" stroke="#000" strokeWidth="1"/>
          </g>
          <g opacity="0.8">
            <ellipse cx="30" cy="20" rx="10" ry="6" fill="none" stroke="#000" strokeWidth="1.5"/>
            <rect x="35" y="15" width="18" height="7" rx="3.5" fill="none" stroke="#000" strokeWidth="1.5" transform="rotate(25 44 18.5)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#graffiti)" />
    </svg>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen min-w-screen h-screen w-screen bg-red-800 overflow-hidden p-0 m-0 relative">
      {graffitiPattern}

      <div className="flex items-center justify-center w-full lg:w-1/2 h-1/3 lg:h-full bg-transparent relative z-10 p-4">
        <img
          src="/login-delwing.png" // Placeholder logo
          alt="Delwingz Branding"
          className="w-40 h-40 lg:w-56 lg:h-56 z-20"
        />
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 px-4 py-8 h-full z-10">
        <div
          className="bg-white/95 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-red-700 relative"
          style={{
            boxShadow: "0 6px 30px 0 rgba(166,0,26,0.1), 0 2px 10px 0 rgba(166,0,26,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-red-700 font-display mb-1 drop-shadow-sm">
            User Login
          </h2>
          <h3 className="text-lg lg:text-xl text-center font-semibold mt-1 text-red-800/80">Welcome Back!</h3>
          <p className="text-sm text-center text-red-700/90 mb-6">
            Login to access your delicious journey.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm block mb-1 text-red-700 font-medium">Email or Mobile</label>
              <div className="flex items-center border-2 border-red-400 rounded-lg px-3 py-2.5 bg-white/80 focus-within:ring-2 focus-within:ring-red-600 transition shadow-inner">
                {isEmail(identifier) ? <Mail className="mr-2.5 text-red-600 h-5 w-5" /> : <Phone className="mr-2.5 text-red-600 h-5 w-5" />}
                <input
                  type="text"
                  placeholder="Enter Email or Mobile No."
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full outline-none bg-transparent text-neutral-800 placeholder-neutral-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm block mb-1 text-red-700 font-medium">Password</label>
              <div className="flex items-center border-2 border-red-400 rounded-lg px-3 py-2.5 bg-white/80 focus-within:ring-2 focus-within:ring-red-600 transition shadow-inner">
                <LockKeyhole className="mr-2.5 text-red-600 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none bg-transparent text-neutral-800 placeholder-neutral-500"
                  required
                />
                <button
                  type="button"
                  className="ml-2 text-red-600 hover:text-red-800 transition focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-red-800 transition active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ letterSpacing: '0.04em' }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-red-700 mt-2">
              <button type="button" onClick={handleCreateAccount} className="hover:underline font-medium hover:text-red-800">
                Create Account
              </button>
              <span className="hidden sm:block text-red-400">|</span>
              <button type="button" onClick={handleForgotPassword} className="hover:underline font-medium hover:text-red-800">
                Forgot Password?
              </button>
            </div>

            <p
              onClick={handleAdminSignup}
              className="text-center text-xs mt-4 cursor-pointer text-red-600 hover:underline font-medium hover:text-red-800"
            >
              Admin? Sign up here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
