import { Link } from "wouter";
import { Star, MapPin, Phone, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { data: signatureDishes } = trpc.menu.getSignatureDishes.useQuery();
  const { data: reviews } = trpc.reviews.getApproved.useQuery();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent/10 to-transparent py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Delhi's Iconic Dhaba Experience
                </h1>
                <p className="text-xl text-muted-foreground">
                  Legendary Kebabs. Rich Gravies. Modern Vibe.
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience authentic North Indian cuisine at its finest. Since decades, Rajinder Da Dhaba has been serving the most beloved dishes to families, professionals, and food lovers across Delhi.
              </p>

              {/* CTA Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="button-primary inline-flex items-center justify-center gap-2">
              Back to Home
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/menu" className="button-secondary inline-flex items-center justify-center gap-2">
              View Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-foreground">4.2 Rating</p>
                  <p className="text-xs text-muted-foreground">50,000+ Reviews</p>
                </div>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="hidden md:block">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-accent/30 rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Signature Dishes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Flavors",
                description: "Traditional North Indian recipes passed down through generations",
                icon: "🍛",
              },
              {
                title: "Massive Reputation",
                description: "Trusted by thousands of families and food enthusiasts",
                icon: "⭐",
              },
              {
                title: "Modern Dining",
                description: "Elegant ambiance with dine-in, drive-through, and delivery options",
                icon: "🏪",
              },
            ].map((item, idx) => (
              <div key={idx} className="elegant-shadow p-8 rounded-lg bg-background hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Signature Dishes</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover the dishes that have made us legendary
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes?.slice(0, 6).map((dish) => (
              <div
                key={dish.id}
                className="elegant-shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card"
              >
                {dish.image && (
                  <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent">
                      ₹{(dish.price / 100).toFixed(0)}
                    </span>
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                      {dish.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu" className="button-primary inline-flex items-center gap-2">
              View Full Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Catering Section */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Planning a Party?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let Rajinder Da Dhaba cater your next event. From intimate house parties to grand office celebrations, we bring authentic flavors to your special moments.
            </p>
            <Link href="/catering" className="button-primary inline-flex items-center gap-2">
              Book Catering
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Customer Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews?.slice(0, 3).map((review) => (
              <div key={review.id} className="elegant-shadow p-6 rounded-lg bg-background">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{review.comment}"</p>
                <p className="font-semibold text-foreground">— {review.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews" className="button-secondary inline-flex items-center gap-2">
              See All Reviews
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Visit Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    AB-14B, Nauroji Nagar Marg, Opposite Safdarjung Enclave, New Delhi – 110029
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Phone</h3>
                  <a href="tel:+919990033229" className="text-accent hover:underline">
                    +91 99900 33229
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 text-accent flex-shrink-0 mt-1">🕐</div>
                <div>
                  <h3 className="font-bold mb-2">Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Sunday<br />
                    11:00 AM - 11:30 PM
                  </p>
                </div>
              </div>

              <Link href="/contact" className="button-primary inline-flex items-center gap-2 mt-4">
                Get Directions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center">
              <p className="text-muted-foreground">Map Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="bg-accent text-accent-foreground py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to Experience Authentic Cuisine?</h3>
            <p className="opacity-90">Call us now or visit our restaurant</p>
          </div>
          <div className="flex gap-4">
            <a href="tel:+919990033229" className="button-primary bg-accent-foreground text-accent hover:opacity-90">
              Call: +91 99900 33229
            </a>
            <Link href="/menu" className="button-secondary border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10">
              View Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
