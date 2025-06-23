import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import MenuHighlights from "../components/MenuHighlights";
import FeaturesSection from "../components/FeaturesSection";
import BestsellersSection from "../components/BestsellersSection";
import StickyFooterCTA from "../components/StickyFooterCTA";
 
const CategoriesSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  useEffect(() => {
    setLoading(true);
    fetch('/api/category/get-category')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then(responseData => {
        if (responseData && responseData.data) {
          setCategories(responseData.data);
        } else {
          setError("Invalid data format from server.");
        }
        setLoading(false);
      })
      .catch(err => {
        setError("Could not load categories.");
        setLoading(false);
        console.error(err);
      });
  }, []);
 
  return (
<section className="py-10 md:py-14 bg-white" id="categories">
<div className="container mx-auto px-4">
<h2
          className="text-2xl md:text-3xl font-bold text-center mb-8"
          style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}
>
          Shop by Categories
</h2>
        {loading ? (
<div className="text-center text-lg">Loading categories...</div>
        ) : error ? (
<div className="text-center text-red-600">{error}</div>
        ) : (
<div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {categories.map((cat) => (
<button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
                className="flex flex-col items-center w-32 md:w-44 group focus:outline-none"
                style={{ background: "none", border: "none", cursor: "pointer" }}
>
<div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg mb-2 bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
<img
                    src={cat.image}
                    alt={cat.name}
                    className="object-cover w-full h-full"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                  />
</div>
<span className="text-base md:text-lg font-medium text-neutral-900 text-center group-hover:text-red-600 transition-colors">
                  {cat.name}
</span>
</button>
            ))}
</div>
        )}
</div>
</section>
  );
};
 
const Index = () => {
  return (
<div className="min-h-screen bg-neutral-50">
<HeroSection />
<CategoriesSection />
<div id="menu">
<MenuHighlights />
</div>
<div id="features">
<FeaturesSection />
</div>
<div id="bestsellers">
<BestsellersSection />
</div>
<section id="contact" className="py-16 md:py-20 bg-neutral-800 text-neutral-100">
<div className="container mx-auto px-4 text-center">
<h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Get In Touch</h2>
<p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-xl mx-auto">
                Have questions or want to partner with us? We'd love to hear from you.
</p>
<button className="bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg px-8 py-3 text-lg transition-transform transform hover:scale-105 shadow-lg">
                Contact Us
</button>
</div>
</section>
<StickyFooterCTA />
</div>
  );
};
 
export default Index;