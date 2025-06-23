
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"; // Adjusted path
import { Badge } from "./ui/Badge"; // Adjusted path
import { Button } from "./ui/Button"; // Adjusted path
import { Heart, ShoppingCart, Clock } from "lucide-react";

const BestsellersSection = () => {
  const bestsellers = [
    {
      name: "Spicy Shrimp Bowl",
      price: "₹349",
      originalPrice: "₹399",
      rating: "4.9",
      image: "https://picsum.photos/seed/shrimp_bowl/400/400",
      tag: "Most Popular",
      discount: "12% OFF"
    },
    {
      name: "Butter Chicken Meal Kit",
      price: "₹299",
      originalPrice: "₹349",
      rating: "4.8",
      image: "https://picsum.photos/seed/butter_chicken_kit/400/400",
      tag: "Chef's Special",
      discount: "15% OFF"
    },
    {
      name: "Crispy Marinated Wings",
      price: "₹199",
      originalPrice: "₹249",
      rating: "4.7",
      image: "https://picsum.photos/seed/marinated_wings_best/400/400",
      tag: "Trending Now",
      discount: "20% OFF"
    },
    {
      name: "Tangy Fish Curry",
      price: "₹279",
      originalPrice: "₹319",
      rating: "4.8",
      image: "https://picsum.photos/seed/fish_curry_tangy/400/400",
      tag: "Coastal Delight",
      discount: "10% OFF"
    }
  ];

  return (
    <section id="bestsellers" className="py-16 md:py-20 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="bg-red-600/10 text-red-700 border-red-700/20 mb-4 px-3 py-1 text-sm">
            Our Bestsellers
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-red-600 mb-3">
            INSTAGRAM POPULARS
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Our most loved dishes that are breaking the internet and winning hearts across Rajasthan.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden group bg-white rounded-xl border-2 border-transparent hover:border-red-500/50 hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <Badge className="absolute top-3 left-3 bg-red-600 text-neutral-100 shadow-md">{item.tag}</Badge>
                <Badge className="absolute top-3 right-3 bg-neutral-800 text-neutral-100 shadow-md">★ {item.rating}</Badge>
                <Badge className="absolute bottom-3 left-3 bg-green-500 text-white shadow-md">{item.discount}</Badge>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-red-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-lg font-semibold group-hover:text-red-600 transition-colors duration-300">
                  {item.name}
                </CardTitle>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>25-30 mins</span>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-red-600">{item.price}</span>
                    <span className="text-sm text-neutral-500 line-through">{item.originalPrice}</span>
                  </div>
                </div>
                <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-100 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 ease-out py-2.5">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Quick Add
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-neutral-100 px-10 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Menu Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestsellersSection;
