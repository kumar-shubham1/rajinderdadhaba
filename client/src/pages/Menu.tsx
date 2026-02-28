import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";

const CATEGORIES = ["Starters", "Main Course", "Breads", "Beverages"];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const { data: menuItems } = trpc.menu.getAll.useQuery();

  const filteredItems = menuItems?.filter(
    (item) => item.category === selectedCategory
  ) || [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-accent/10 to-transparent py-16 md:py-24">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore our carefully curated selection of authentic North Indian dishes
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="section-padding">
        <div className="container">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border text-foreground hover:border-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="elegant-shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card"
                >
                  {item.image && (
                    <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold flex-1">{item.name}</h3>
                      {item.isSignatureDish === "yes" && (
                        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                          <Star className="w-5 h-5 fill-accent text-accent" />
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">
                        ₹{(item.price / 100).toFixed(0)}
                      </span>
                      {item.isSignatureDish === "yes" && (
                        <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                          Signature
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No items in this category yet</p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-accent/5 to-transparent p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-bold mb-3">Ready to Order?</h3>
              <p className="text-muted-foreground mb-6">
                Call us to place your order or visit our restaurant
              </p>
              <a
                href="tel:+919990033229"
                className="button-primary inline-flex items-center gap-2"
              >
                📞 Call Now: +91 99900 33229
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
