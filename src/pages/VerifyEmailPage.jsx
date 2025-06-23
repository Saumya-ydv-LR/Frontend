
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MailCheck, AlertTriangle, Loader2 } from 'lucide-react'; // Icons

const VerifyEmailPage = () => {
  const [params] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('Verifying your email, please wait...');

  useEffect(() => {
    const code = params.get("code");

    if (code) {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/verify-email`, { code })
        .then((res) => {
          setVerificationStatus('success');
          setMessage(res.data.message || "Email verified successfully! You can now login.");
        })
        .catch((err) => {
          console.error("Verification error:", err.response ? err.response.data : err.message);
          setVerificationStatus('error');
          setMessage(err.response?.data?.message || "Verification failed. The link may be invalid or expired. Please try signing up again or contact support.");
        });
    } else {
      setVerificationStatus('error');
      setMessage("No verification code provided. Please check the link or try again.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]); // params should be stable, but include if necessary based on router version

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-100 p-6 text-center">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full">
        {verificationStatus === 'verifying' && (
          <Loader2 className="w-16 h-16 text-red-500 animate-spin mx-auto mb-6" />
        )}
        {verificationStatus === 'success' && (
          <MailCheck className="w-16 h-16 text-green-500 mx-auto mb-6" />
        )}
        {verificationStatus === 'error' && (
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        )}

        <h1 className={`text-2xl md:text-3xl font-bold mb-4 
          ${verificationStatus === 'success' ? 'text-green-600' : 
            verificationStatus === 'error' ? 'text-red-600' : 'text-neutral-700'}`}
        >
          {verificationStatus === 'success' ? 'Verification Successful!' : 
           verificationStatus === 'error' ? 'Verification Failed' : 'Email Verification'}
        </h1>
        <p className="text-neutral-600 text-base md:text-lg mb-8">{message}</p>

        {verificationStatus === 'success' && (
          <Link
            to="/login"
            className="inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Proceed to Login
          </Link>
        )}
        {verificationStatus === 'error' && (
           <Link
            to="/signup-user" // Or contact page
            className="inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Try Signing Up Again
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
