
import { Property } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, BedDouble, Bath, Square, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: number, status: string) => {
    if (status === "rent") {
      return `₹${price.toLocaleString()}/month`;
    }
    return `₹${(price / 100000).toFixed(1)} Lakh`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={property.status === "sale" ? "default" : "secondary"}>
            {property.status === "sale" ? "For Sale" : "For Rent"}
          </Badge>
          {property.featured && (
            <Badge className="bg-orange-500 hover:bg-orange-600">Featured</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white ${
            isFavorited ? "text-red-500" : "text-gray-600"
          }`}
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price, property.status)}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area} sq ft
          </div>
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <BedDouble className="w-4 h-4 mr-1" />
              {property.bedrooms} BHK
            </div>
          )}
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms}
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link to={`/property/${property.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
