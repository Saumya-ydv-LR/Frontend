import React from 'react';
import { Button } from "./ui/Button"; // Adjusted path
import { Star, Clock, Truck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-center bg-cover flex items-center overflow-hidden">
      {/* Blurred Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-100 z-0"
        style={{ backgroundImage: "url('https://picsum.photos/seed/hero_bg_main/1920/1080')" }} // Placeholder image
      ></div>

      {/* Dark red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-red-800 opacity-40 z-10"></div>

      {/* Floating Elements - using animations from tailwind.config.js */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gray-800/20 rounded-full animate-pulse-custom z-10"></div>
      <div
        className="absolute bottom-20 right-1/4 w-24 h-24 bg-gray-100/20 rounded-full animate-bounce-custom z-10"
        style={{ animationDuration: "4s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/3 w-16 h-16 bg-gray-100/10 rounded-full animate-pulse-custom z-10"
        style={{ animationDelay: "1s", animationDuration: "3s" }}
      ></div>

      {/* Foreground Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl">
          {/* Ratings - Added opacity transition for onload effect */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0s' }}>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center bg-gray-800/40 rounded-full px-4 py-2 backdrop-blur-sm">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-gray-100 font-semibold">4.8 Rating</span>
              </div>
              <div className="flex items-center bg-gray-800/40 rounded-full px-4 py-2 backdrop-blur-sm">
                <Truck className="w-5 h-5 text-gray-100 mr-2" />
                <span className="text-gray-100 font-semibold">30 Min Delivery</span>
              </div>
            </div>

            {/* Headings */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-gray-100 leading-tight mb-6">
              REVOLUTIONIZING
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-tight mb-8 drop-shadow-sm">
              INDIA'S ONLINE<br />
              NON‑VEG FOOD<br />
              <span className="text-gray-100">DELIVERY</span>
            </h2>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-gray-100/90 mb-8 max-w-2xl">
              From farm-fresh ingredients to your doorstep in 30 minutes. Experience the future of non-veg food delivery in Rajasthan.
            </p>
          </div>

          {/* CTA Buttons - Added opacity transition with delay */}
          <div
            className="flex flex-col sm:flex-row gap-4 mt-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              size="lg"
              className="bg-gray-800 hover:bg-gray-700 text-gray-100 text-lg px-8 py-4 md:py-6 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Clock className="w-5 h-5 mr-2" />
              Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-gray-100/20 text-gray-100 hover:text-white border-2 border-gray-100 text-lg px-8 py-4 md:py-6 rounded-full font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Explore Menu
            </Button>
          </div>

          {/* Stats - Added opacity transition with delay */}
          <div
            className="flex items-center gap-8 mt-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gray-100">10K+</div>
              <div className="text-gray-100/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gray-100">50+</div>
              <div className="text-gray-100/80">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-gray-100">5</div>
              <div className="text-gray-100/80">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
