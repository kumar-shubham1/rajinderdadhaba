import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Catering() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "House Party",
    guestCount: 50,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBooking = trpc.catering.submitBooking.useMutation({
    onSuccess: () => {
      toast.success("Booking request submitted! We'll contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        eventType: "House Party",
        guestCount: 50,
        message: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit booking");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guestCount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitBooking.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: new Date(formData.eventDate),
        eventType: formData.eventType,
        guestCount: formData.guestCount,
        message: formData.message,
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-accent/10 to-transparent py-16 md:py-24">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Catering & Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Let Rajinder Da Dhaba cater your next special event
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Planning a Party?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">🎉 Event Types We Cater</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✓ House Parties & Family Gatherings</li>
                    <li>✓ Office Events & Corporate Functions</li>
                    <li>✓ Birthday Celebrations</li>
                    <li>✓ Wedding Receptions & Engagements</li>
                    <li>✓ Anniversary Parties</li>
                    <li>✓ Custom Events</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">💼 Why Choose Us</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✓ Authentic North Indian cuisine</li>
                    <li>✓ Professional catering team</li>
                    <li>✓ Flexible menu customization</li>
                    <li>✓ Competitive pricing</li>
                    <li>✓ Quick response & confirmation</li>
                  </ul>
                </div>

                <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Quick Response Promise:</strong> We'll contact you within 2 hours of your booking request to confirm details and discuss menu options.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-card rounded-lg elegant-shadow p-8">
              <h3 className="text-2xl font-bold mb-6">Request a Booking</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Event Date */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                  >
                    <option>House Party</option>
                    <option>Office Event</option>
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Anniversary</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background resize-none"
                    placeholder="Tell us about your event, menu preferences, or any special requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We'll contact you shortly to confirm your booking and discuss menu options.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
