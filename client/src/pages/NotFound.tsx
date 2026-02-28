import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/10 to-transparent">
      <div className="container text-center py-20">
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sorry, we couldn't find the page you're looking for. Let's get you back to enjoying our delicious cuisine!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <a className="button-primary inline-flex items-center justify-center gap-2">
              Back to Home
              <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
          <Link href="/menu">
            <a className="button-secondary inline-flex items-center justify-center gap-2">
              View Menu
              <ArrowRight className="w-5 h-5" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
