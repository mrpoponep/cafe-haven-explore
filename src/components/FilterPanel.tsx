import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

interface FilterPanelProps {
  sortBy: string;
  filters: {
    dogFriendly: boolean;
    catFriendly: boolean;
    wifi: boolean;
    powerOutlets: boolean;
    outdoor: boolean;
    cheap: boolean;
    moderate: boolean;
    expensive: boolean;
  };
  onSortChange: (value: string) => void;
  onFilterChange: (key: string, value: boolean) => void;
  resultCount: number;
}

export const FilterPanel = ({
  sortBy,
  filters,
  onSortChange,
  onFilterChange,
  resultCount,
}: FilterPanelProps) => {
  return (
    <Card className="p-6 space-y-6 bg-card border-border/50 shadow-card sticky top-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-lg">Filters & Sort</h2>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Sort By</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="distance">Closest</SelectItem>
            <SelectItem value="price-low">Cheapest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Café Type</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dog"
              checked={filters.dogFriendly}
              onCheckedChange={(checked) => onFilterChange("dogFriendly", checked as boolean)}
            />
            <Label htmlFor="dog" className="text-sm cursor-pointer">
              🐕 Dog Café
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cat"
              checked={filters.catFriendly}
              onCheckedChange={(checked) => onFilterChange("catFriendly", checked as boolean)}
            />
            <Label htmlFor="cat" className="text-sm cursor-pointer">
              🐱 Cat Café
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Amenities</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wifi"
              checked={filters.wifi}
              onCheckedChange={(checked) => onFilterChange("wifi", checked as boolean)}
            />
            <Label htmlFor="wifi" className="text-sm cursor-pointer">
              Wi-Fi
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="power"
              checked={filters.powerOutlets}
              onCheckedChange={(checked) => onFilterChange("powerOutlets", checked as boolean)}
            />
            <Label htmlFor="power" className="text-sm cursor-pointer">
              Power Outlets
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="outdoor"
              checked={filters.outdoor}
              onCheckedChange={(checked) => onFilterChange("outdoor", checked as boolean)}
            />
            <Label htmlFor="outdoor" className="text-sm cursor-pointer">
              Outdoor Seating
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cheap"
              checked={filters.cheap}
              onCheckedChange={(checked) => onFilterChange("cheap", checked as boolean)}
            />
            <Label htmlFor="cheap" className="text-sm cursor-pointer">
              ₫ • {"<"}100k
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="moderate"
              checked={filters.moderate}
              onCheckedChange={(checked) => onFilterChange("moderate", checked as boolean)}
            />
            <Label htmlFor="moderate" className="text-sm cursor-pointer">
              ₫₫ • 100-200k
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="expensive"
              checked={filters.expensive}
              onCheckedChange={(checked) => onFilterChange("expensive", checked as boolean)}
            />
            <Label htmlFor="expensive" className="text-sm cursor-pointer">
              ₫₫₫ • {">"}200k
            </Label>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{resultCount}</span> café{resultCount !== 1 ? "s" : ""} match your criteria
        </p>
      </div>
    </Card>
  );
};
