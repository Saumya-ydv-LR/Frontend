
import React, { useEffect, useState } from 'react';
import { Button } from "./ui/Button"; // Adjusted path
import { Menu, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = document.cookie.match(/accessToken=([^;]+)/);
    setIsLoggedIn(!!token);
  }, []);

  const navLinks = [
    { href: "/#", text: "Home" },
    { href: "/#menu", text: "Menu" },
    { href: "/#features", text: "Why Us" },
    { href: "/#bestsellers", text: "Bestsellers" },
    { href: "/#contact", text: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-100/95 backdrop-blur-sm border-b border-neutral-300 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <img
          src="/Delwingz-logo.png" // Placeholder logo
          alt="Delwingz Logo"
          className="h-8 md:h-10 cursor-pointer object-contain" // Adjusted height for aesthetics
          onClick={() => navigate("/")}
        />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map(link => (
            <a key={link.text} href={link.href} className="text-neutral-800 hover:text-red-600 transition-colors font-medium text-sm lg:text-base">
              {link.text}
            </a>
          ))}
          <div className="flex items-center text-neutral-800 text-sm">
            <MapPin className="w-4 h-4 mr-1 text-red-600" />
            Rajasthan
          </div>
        </div>

        {/* Right-side Buttons & Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden lg:flex items-center text-neutral-800 text-sm font-medium">
            <Phone className="w-4 h-4 mr-2 text-red-600" />
            997995795 {/* Example phone */}
          </div>

          {isLoggedIn ? (
            <Link to="/user-dashboard">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-neutral-100 rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-neutral-100 rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2">
                Login
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden text-neutral-800 hover:bg-neutral-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-100 border-t border-neutral-300 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map(link => (
              <a 
                key={link.text} 
                href={link.href} 
                className="text-neutral-800 hover:text-red-600 transition-colors font-medium py-2 block"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.text}
              </a>
            ))}
            <div className="flex items-center text-neutral-800 text-sm py-2 border-t border-neutral-200 mt-2">
              <MapPin className="w-4 h-4 mr-1 text-red-600" />
              Rajasthan
            </div>
             <div className="flex items-center text-neutral-800 text-sm font-medium py-2 border-t border-neutral-200">
              <Phone className="w-4 h-4 mr-2 text-red-600" />
              997995795 {/* Example phone */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
