import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { MapPin, Coffee, Heart } from "lucide-react";
import heroImage from "@/assets/hero-cafe.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Cozy café atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
              あなたにぴったりの
              <span className="block text-primary">カフェを発見</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              ハノイで素敵なコーヒー、Wi-Fi、雰囲気のあるカフェを見つけよう
            </p>
          </div>

          <div className="flex justify-center">
            <SearchBar variant="hero" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>15+ cafés in Hanoi</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-primary" />
              <span>Real reviews & ratings</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>Save your favorites</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            What Makes Us Special
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3 p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                <Coffee className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Curated Selection</h3>
              <p className="text-muted-foreground">
                Handpicked cafés with authentic reviews and detailed information
              </p>
            </div>
            
            <div className="text-center space-y-3 p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Smart Filters</h3>
              <p className="text-muted-foreground">
                Find exactly what you need: wifi, pet-friendly, quiet, or lively
              </p>
            </div>
            
            <div className="text-center space-y-3 p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Save Favorites</h3>
              <p className="text-muted-foreground">
                Build your personal collection of go-to cafés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Café Haven. Made with ☕ for café lovers in Hanoi.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
