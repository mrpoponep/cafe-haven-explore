import { useParams, Link, useNavigate } from "react-router-dom";
import { cafes, reviews } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, MapPin, Phone, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const CafeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cafe = cafes.find((c) => c.id === Number(id));
  const cafeReviews = reviews.filter((r) => r.cafeId === Number(id));

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(Number(id)));
  }, [id]);

  if (!cafe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Café not found</h1>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = isFavorite
      ? favorites.filter((fid: number) => fid !== cafe.id)
      : [...favorites, cafe.id];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const ratingDistribution = [78, 32, 10, 2, 1];
  const avgCategories = cafeReviews.length > 0 
    ? {
        drinks: cafeReviews.reduce((sum, r) => sum + r.categories.drinks, 0) / cafeReviews.length,
        food: cafeReviews.reduce((sum, r) => sum + r.categories.food, 0) / cafeReviews.length,
        service: cafeReviews.reduce((sum, r) => sum + r.categories.service, 0) / cafeReviews.length,
        atmosphere: cafeReviews.reduce((sum, r) => sum + r.categories.atmosphere, 0) / cafeReviews.length,
      }
    : { drinks: 4.8, food: 4.5, service: 4.6, atmosphere: 4.9 };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-secondary/70"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-3 flex-1">
            <h1 className="text-4xl font-bold text-foreground">{cafe.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold text-lg">{cafe.rating}</span>
                <span className="text-muted-foreground">({cafe.reviews} reviews)</span>
              </div>
              {cafe.distance && (
                <span className="text-muted-foreground">{cafe.distance} km away</span>
              )}
            </div>
          </div>
          <Button
            onClick={toggleFavorite}
            variant={isFavorite ? "default" : "outline"}
            className="shrink-0"
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Saved" : "Save"}
          </Button>
        </div>

        {/* Photo Tabs */}
        <Tabs defaultValue="interior" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary/50">
            <TabsTrigger value="interior">Interior</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="food">Food & Drinks</TabsTrigger>
          </TabsList>
          <TabsContent value="interior" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {cafe.photos.interior.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${cafe.name} interior ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-card"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="menu" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {cafe.photos.menu.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${cafe.name} menu ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-card"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="food" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {cafe.photos.food.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${cafe.name} food ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-card"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Info & Reviews */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Info Card */}
            <Card className="shadow-card border-border/50">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">About</h2>
                <p className="text-muted-foreground leading-relaxed">{cafe.description}</p>
                
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{cafe.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm">{cafe.hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm">{cafe.phone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cafe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="shadow-card border-border/50">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">Reviews</h2>
                  <Button variant="outline" size="sm">Write Review</Button>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars, idx) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-sm w-12">{stars} stars</span>
                      <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: `${(ratingDistribution[idx] / 123) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {ratingDistribution[idx]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Category Ratings */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {Object.entries(avgCategories).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize text-muted-foreground">{key}</span>
                        <span className="font-semibold">{value.toFixed(1)}</span>
                      </div>
                      <div className="bg-secondary rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full"
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4 pt-4 border-t border-border">
                  {cafeReviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{review.userName}</span>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Actions */}
          <aside className="space-y-4">
            <Card className="shadow-card border-border/50 sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Range</span>
                    <span className="font-medium capitalize">{cafe.price_range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium">⭐ {cafe.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="font-medium">{cafe.distance} km</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Get Directions
                </Button>
                <Button className="w-full">Call Now</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default CafeDetail;
