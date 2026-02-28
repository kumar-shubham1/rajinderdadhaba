import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function Reviews() {
  const { data: reviews, refetch } = trpc.reviews.getApproved.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitReview = trpc.reviews.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you for your review! It will be published after approval.");
      setFormData({ name: "", rating: 5, comment: "" });
      setShowForm(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitReview.mutateAsync(formData);
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            See what our guests have to say about their experience
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-card rounded-lg elegant-shadow">
              <div className="text-5xl font-bold text-accent mb-2">4.2</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg elegant-shadow">
              <div className="text-5xl font-bold text-accent mb-2">50K+</div>
              <p className="text-muted-foreground">Total Reviews</p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg elegant-shadow">
              <div className="text-5xl font-bold text-accent mb-2">100%</div>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews?.map((review) => (
              <div
                key={review.id}
                className="elegant-shadow p-6 rounded-lg bg-card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic leading-relaxed">
                  "{review.comment}"
                </p>
                <p className="font-semibold text-foreground">— {review.name}</p>
              </div>
            ))}
          </div>

          {/* Add Review Section */}
          <div className="max-w-2xl mx-auto">
            {!showForm ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
                <p className="text-muted-foreground mb-6">
                  Have you dined with us? We'd love to hear about your experience!
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="button-primary"
                >
                  Write a Review
                </button>
              </div>
            ) : (
              <div className="bg-card rounded-lg elegant-shadow p-8">
                <h3 className="text-2xl font-bold mb-6">Write Your Review</h3>

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

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Rating *
                    </label>
                    <select
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                      <option value={4}>⭐⭐⭐⭐ Very Good</option>
                      <option value={3}>⭐⭐⭐ Good</option>
                      <option value={2}>⭐⭐ Fair</option>
                      <option value={1}>⭐ Poor</option>
                    </select>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Your Review *
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      required
                      minLength={10}
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background resize-none"
                      placeholder="Tell us about your experience, favorite dishes, service, ambiance..."
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 button-secondary"
                    >
                      Cancel
                    </button>
                  </div>

                <p className="text-xs text-muted-foreground text-center">
                  Your review will be published after approval by our team.
                </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
