
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"; // Adjusted path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs"; // Adjusted path
import { Badge } from "./ui/Badge"; // Adjusted path
import { Button } from "./ui/Button"; // Adjusted path

const MenuHighlights = () => {
  const menuItems = {
    chicken: [
      {
        name: "Butter Chicken Kit",
        description: "Rich, creamy butter chicken with authentic spices",
        price: "₹299",
        image: "https://picsum.photos/seed/butter_chicken/400/300",
        rating: "4.8"
      },
      {
        name: "Tandoori Wings",
        description: "Smoky tandoori marinated chicken wings",
        price: "₹199",
        image: "https://picsum.photos/seed/tandoori_wings/400/300",
        rating: "4.7"
      }
    ],
    seafood: [
      {
        name: "Prawn Curry Bowl",
        description: "Fresh prawns in coconut curry sauce",
        price: "₹399",
        image: "https://picsum.photos/seed/prawn_curry/400/300",
        rating: "4.9"
      },
      {
        name: "Fish Fry Special",
        description: "Crispy fried fish with coastal spices",
        price: "₹249",
        image: "https://picsum.photos/seed/fish_fry/400/300",
        rating: "4.6"
      }
    ],
    readyToCook: [
      {
        name: "Marinated Mutton",
        description: "Premium mutton pieces, ready to cook",
        price: "₹549",
        image: "https://picsum.photos/seed/mutton_marinated/400/300",
        rating: "4.8"
      },
      {
        name: "Spiced Chicken Breast",
        description: "Pre-marinated chicken breast fillets",
        price: "₹329",
        image: "https://picsum.photos/seed/chicken_breast/400/300",
        rating: "4.7"
      }
    ]
  };

  return (
    <section id="menu" className="py-16 md:py-20 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-800 mb-4">
            CHOOSE FAVORITES
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Handpicked premium non-veg delicacies from across India
          </p>
        </div>

        <Tabs defaultValue="chicken" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-12 bg-neutral-200 rounded-lg">
            <TabsTrigger value="chicken" className="text-base md:text-lg font-semibold py-2.5 data-[state=active]:bg-red-600 data-[state=active]:text-white">Chicken</TabsTrigger>
            <TabsTrigger value="seafood" className="text-base md:text-lg font-semibold py-2.5 data-[state=active]:bg-red-600 data-[state=active]:text-white">Seafood</TabsTrigger>
            <TabsTrigger value="readyToCook" className="text-base md:text-lg font-semibold py-2.5 data-[state=active]:bg-red-600 data-[state=active]:text-white">Ready-to-Cook</TabsTrigger>
          </TabsList>

          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category} className="transition-opacity duration-500 ease-in-out"> {/* Simple opacity transition */}
              <div className="grid md:grid-cols-2 gap-8">
                {items.map((item, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-600/30">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-red-600 text-neutral-100">
                        ★ {item.rating}
                      </Badge>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
                          <CardDescription className="mt-1 text-neutral-600">{item.description}</CardDescription>
                        </div>
                        <div className="text-2xl font-bold text-red-600">{item.price}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-neutral-100">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MenuHighlights;
