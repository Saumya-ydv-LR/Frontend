
import React from 'react';
import { Clock, Home, Phone, ShoppingCart, Award, ShieldCheck } from "lucide-react"; // Added more icons for variety

const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Lightning-fast delivery within 30 minutes to your doorstep."
    },
    {
      icon: Award, // Changed icon
      title: "Farm-to-Fork Freshness",
      description: "Direct sourcing from trusted farms ensuring maximum freshness."
    },
    {
      icon: Phone, // Kept icon, title relevant
      title: "AI-Powered Tracking",
      description: "Real-time order tracking with smart delivery predictions."
    },
    {
      icon: ShieldCheck, // Changed icon
      title: "Premium Quality",
      description: "Hand-selected premium ingredients with quality guarantee."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-20 bg-neutral-800 text-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-100 mb-2">
            WHAT MAKES US
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-red-500">
            DIFFERENT
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              // Removed animate-fade-up, relying on hover transition or simple load
              className="text-center p-6 rounded-2xl bg-neutral-700/50 backdrop-blur-sm hover:bg-neutral-700/80 transition-all duration-300 transform hover:-translate-y-1"
              // style={{animationDelay: `${index * 0.1}s`}} // animationDelay without animation has no effect
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-red-600 rounded-full shadow-lg">
                  <feature.icon className="w-8 h-8 text-neutral-100" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-neutral-100 mb-3">
                {feature.title}
              </h4>
              <p className="text-neutral-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
