import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cafes } from "@/lib/mock-data";
import { CafeCard } from "@/components/CafeCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, PenSquare, Coffee } from "lucide-react";

const Profile = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoggedIn] = useState(true); // Mock login state

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const favoriteCafes = cafes.filter((cafe) => favorites.includes(cafe.id));

  // Mock user reviews
  const myReviews = [
    {
      cafeId: 1,
      cafeName: "Highlands Coffee",
      rating: 5,
      date: "2024-10-15",
      text: "Love the vibe here! Great for working remotely with stable wifi and plenty of power outlets.",
    },
    {
      cafeId: 2,
      cafeName: "The Coffee House",
      rating: 5,
      date: "2024-10-20",
      text: "Cat café with velvet sofas and killer matcha lattes. The cats are adorable!",
    },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center space-y-4">
            <Coffee className="h-16 w-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Login Required</h2>
            <p className="text-muted-foreground">
              Please log in to view your favorites and reviews
            </p>
            <Button className="w-full">Log In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" className="hover:bg-secondary/70">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        </div>
      </header>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary/50">
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <PenSquare className="h-4 w-4" />
              My Reviews
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-8">
            {favoriteCafes.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {favoriteCafes.length} Saved Café{favoriteCafes.length !== 1 ? "s" : ""}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your favorite spots in Hanoi
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteCafes.map((cafe) => (
                    <CafeCard key={cafe.id} cafe={cafe} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  No favorites yet
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start exploring and save your favorite cafés!
                </p>
                <Link to="/search">
                  <Button>
                    <Coffee className="h-4 w-4 mr-2" />
                    Discover Cafés
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-8">
            {myReviews.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {myReviews.length} Review{myReviews.length !== 1 ? "s" : ""}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your café experiences shared
                  </p>
                </div>
                <div className="space-y-4 max-w-3xl">
                  {myReviews.map((review, idx) => (
                    <Card key={idx} className="shadow-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <Link
                            to={`/cafe/${review.cafeId}`}
                            className="font-semibold text-lg hover:text-primary transition-colors"
                          >
                            {review.cafeName}
                          </Link>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {"⭐".repeat(review.rating)}
                          <span className="text-sm text-muted-foreground ml-2">
                            {review.rating}/5
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <PenSquare className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  No reviews yet
                </h2>
                <p className="text-muted-foreground mb-6">
                  Share your café experiences with the community!
                </p>
                <Link to="/search">
                  <Button>
                    <Coffee className="h-4 w-4 mr-2" />
                    Find Cafés to Review
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
