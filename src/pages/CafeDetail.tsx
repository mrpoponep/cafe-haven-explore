import { useParams, useNavigate, Link } from "react-router-dom";
import { getAllCafes, reviews } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, MapPin, Phone, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Comment {
  id: string;
  cafeId: number;
  username: string;
  rating: number;
  text: string;
  date: string;
}

const CafeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const cafes = getAllCafes();
  const cafe = cafes.find((c) => c.id === Number(id));
  const cafeReviews = reviews.filter((r) => r.cafeId === Number(id));

  const [isFavorite, setIsFavorite] = useState(false);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ rating: 5, text: "" });

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(Number(id)));
    
    const savedComments = JSON.parse(localStorage.getItem("cafe_comments") || "[]");
    setUserComments(savedComments.filter((c: Comment) => c.cafeId === Number(id)));
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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add a comment");
      navigate("/auth");
      return;
    }
    if (!newComment.text.trim()) {
      toast.error("Please write a comment");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      cafeId: cafe.id,
      username: user!.username,
      rating: newComment.rating,
      text: newComment.text,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    const allComments = JSON.parse(localStorage.getItem("cafe_comments") || "[]");
    const updatedComments = [...allComments, comment];
    localStorage.setItem("cafe_comments", JSON.stringify(updatedComments));
    setUserComments([...userComments, comment]);
    setNewComment({ rating: 5, text: "" });
    toast.success("Comment added successfully!");
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

  const allReviews = [...cafeReviews, ...userComments];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

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
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Reviews & Comments</h2>
                  
                  {/* Add Comment Form */}
                  {isAuthenticated ? (
                    <form onSubmit={handleSubmitComment} className="space-y-4 p-4 bg-secondary/20 rounded-xl mb-6">
                      <div className="space-y-2">
                        <Label>Your Rating</Label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewComment({ ...newComment, rating: star })}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= newComment.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comment-text">Your Comment</Label>
                        <Textarea
                          id="comment-text"
                          placeholder="Share your experience at this café..."
                          value={newComment.text}
                          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <Button type="submit" className="w-full">Post Comment</Button>
                    </form>
                  ) : (
                    <div className="p-4 bg-secondary/20 rounded-xl mb-6 text-center">
                      <p className="text-muted-foreground mb-3">Login to share your experience</p>
                      <Button onClick={() => navigate("/auth")} variant="outline">Login</Button>
                    </div>
                  )}
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

                {/* Individual Reviews & Comments */}
                <div className="space-y-4 pt-4 border-t border-border">
                  {allReviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-start gap-3">
                        {"userAvatar" in review ? (
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {review.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {"userName" in review ? review.userName : review.username}
                            </span>
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
