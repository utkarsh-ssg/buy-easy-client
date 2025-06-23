import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  BedDouble, 
  Bath, 
  Square, 
  Phone, 
  Mail, 
  Heart, 
  Share2, 
  ArrowLeft,
  CheckCircle,
  Camera,
  Calendar
} from "lucide-react";
import Header from "@/components/Header";
import { Property } from "@/types/property";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) navigate('/login-consumer');
    if (role === 'builder') navigate('/builder-dashboard');
  }, [navigate]);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then((data: Property) => setProperty(data))
      .catch(() => setProperty(null));
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, status: string) => {
    if (status === "rent") {
      return `₹${price.toLocaleString()}/month`;
    }
    return `₹${(price / 100000).toFixed(1)} Lakh`;
  };

  const handleContactSeller = () => {
    setShowContactForm(true);
    toast.success("Contact form opened! You can now reach out to the seller.");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Property link copied to clipboard!");
  };

  const handleScheduleVisit = () => {
    toast.success("Visit request sent! The seller will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-blue-600">Properties</Link>
          <span>/</span>
          <span className="text-gray-900">{property.title}</span>
        </div>

        {/* Back Button */}
        <Button variant="outline" asChild className="mb-6">
          <Link to="/properties">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={property.status === "sale" ? "default" : "secondary"}>
                    {property.status === "sale" ? "For Sale" : "For Rent"}
                  </Badge>
                  {property.featured && (
                    <Badge className="bg-orange-500 hover:bg-orange-600">Featured</Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-2 rounded-full bg-white/80 hover:bg-white ${
                      isFavorited ? "text-red-500" : "text-gray-600"
                    }`}
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-600"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Camera className="w-4 h-4 mr-1" />
                  {currentImageIndex + 1}/{property.images.length}
                </div>
              </div>

              {/* Image Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className={`w-24 h-16 object-cover rounded cursor-pointer border-2 ${
                        index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      {property.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {formatPrice(property.price, property.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      ₹{Math.round(property.price / property.area)}/sq ft
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold">{property.area}</div>
                    <div className="text-sm text-gray-600">sq ft</div>
                  </div>
                  {property.bedrooms > 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <BedDouble className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-sm text-gray-600">Bedrooms</div>
                    </div>
                  )}
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                <Separator className="my-6" />

                {/* Amenities */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Seller Card */}
            <Card className="mb-6 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Seller</h3>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold text-lg">
                      {property.seller.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold flex items-center">
                      {property.seller.name}
                      {property.seller.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {property.seller.verified ? "Verified Seller" : "Individual"}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleContactSeller} className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    {showContactForm ? property.seller.phone : "Show Contact"}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  
                  <Button variant="outline" onClick={handleScheduleVisit} className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>
                </div>

                {showContactForm && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm space-y-2">
                      <div>
                        <strong>Phone:</strong> {property.seller.phone}
                      </div>
                      <div>
                        <strong>Email:</strong> {property.seller.email}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 text-xs text-gray-500">
                  Property ID: {property.id}
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed On</span>
                    <span className="font-medium">{property.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium capitalize">
                      {property.status === "sale" ? "For Sale" : "For Rent"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per sq ft</span>
                    <span className="font-medium">₹{Math.round(property.price / property.area)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
