import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MapView } from "@/components/Map";
import { useRef } from "react";

export default function Contact() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;

    // Restaurant coordinates
    const restaurantLocation = {
      lat: 28.5621,
      lng: 77.1855,
    };

    // Center map on restaurant
    map.setCenter(restaurantLocation);
    map.setZoom(15);

    // Add marker for restaurant
    new google.maps.Marker({
      position: restaurantLocation,
      map: map,
      title: "Rajinder Da Dhaba",
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-accent/10 to-transparent py-16 md:py-24">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact & Location</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Visit us at our iconic location in New Delhi
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>

                {/* Address */}
                <div className="flex gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <MapPin className="w-8 h-8 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      AB-14B, Nauroji Nagar Marg,<br />
                      Opposite Safdarjung Enclave,<br />
                      New Delhi – 110029, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <Phone className="w-8 h-8 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Phone</h3>
                    <a
                      href="tel:+919990033229"
                      className="text-accent hover:underline text-lg font-semibold"
                    >
                      +91 99900 33229
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <Mail className="w-8 h-8 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Email</h3>
                    <a
                      href="mailto:info@rajinderdadhaba.in"
                      className="text-accent hover:underline"
                    >
                      info@rajinderdadhaba.in
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Clock className="w-8 h-8 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Operating Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Sunday</p>
                      <p className="font-semibold text-foreground">11:00 AM - 11:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+919990033229"
                    className="block w-full button-primary text-center"
                  >
                    📞 Call Now
                  </a>
                  <a
                    href="https://maps.google.com/?q=28.5621,77.1855"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full button-secondary text-center"
                  >
                    🗺️ Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className="rounded-lg overflow-hidden elegant-shadow h-96 lg:h-full min-h-96">
              <MapView onMapReady={handleMapReady} />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Landmarks Section */}
      <section className="section-padding bg-card border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Easy to Find</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Safdarjung Enclave",
                description: "Directly opposite our location",
              },
              {
                title: "Nauroji Nagar",
                description: "In the heart of South Delhi",
              },
              {
                title: "Easy Parking",
                description: "Ample parking available",
              },
              {
                title: "Metro Accessible",
                description: "Near Safdarjung Metro Station",
              },
              {
                title: "Well Connected",
                description: "Easy access from all parts of Delhi",
              },
              {
                title: "Landmark Building",
                description: "Iconic red signage, easy to spot",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-background rounded-lg border border-border">
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parking & Access Info */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Parking & Access</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-card rounded-lg elegant-shadow">
                <h3 className="text-xl font-bold mb-4">🅿️ Parking</h3>
                <p className="text-muted-foreground">
                  Ample parking space available right at our location. We offer convenient parking for all our guests, whether you're dining in or picking up your order.
                </p>
              </div>

              <div className="p-8 bg-card rounded-lg elegant-shadow">
                <h3 className="text-xl font-bold mb-4">♿ Accessibility</h3>
                <p className="text-muted-foreground">
                  Our restaurant is easily accessible with proper entry and seating arrangements. We welcome guests of all abilities and ensure a comfortable dining experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
