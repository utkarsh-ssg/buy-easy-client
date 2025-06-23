import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Heart, 
  Search, 
  Settings, 
  MapPin, 
  Phone, 
  Mail,
  ArrowLeft,
  Bell,
  CreditCard
} from "lucide-react";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/properties";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem("userName") || "Demo User",
    email: "demo@buyeasy.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra"
  });
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  
  // Sample recent searches
  const recentSearches = [
    { id: 1, query: "3BHK in Mumbai", date: "2024-01-20" },
    { id: 2, query: "Villa in Gurgaon", date: "2024-01-18" },
    { id: 3, query: "2BHK for rent in Bangalore", date: "2024-01-15" }
  ];

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) navigate('/login-consumer');
    if (role === 'builder') navigate('/builder-dashboard');
  }, [navigate]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data) => {
        setSavedProperties(data.slice(0, 2));
      });
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("userName", userInfo.name);
    // In a real app, this would save to backend
    console.log("Profile saved:", userInfo);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="outline" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {userInfo.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {userInfo.email}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  {userInfo.location}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="saved" className="flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="searches" className="flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Searches
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Saved Properties */}
          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Properties</CardTitle>
                <p className="text-gray-600">Properties you've marked as favorites</p>
              </CardHeader>
              <CardContent>
                {savedProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties yet</h3>
                    <p className="text-gray-600 mb-4">Start exploring and save properties you like</p>
                    <Button asChild>
                      <Link to="/properties">Browse Properties</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Searches */}
          <TabsContent value="searches">
            <Card>
              <CardHeader>
                <CardTitle>Recent Searches</CardTitle>
                <p className="text-gray-600">Your recent property searches</p>
              </CardHeader>
              <CardContent>
                {recentSearches.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No recent searches</h3>
                    <p className="text-gray-600 mb-4">Your search history will appear here</p>
                    <Button asChild>
                      <Link to="/properties">Start Searching</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentSearches.map((search) => (
                      <div key={search.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center">
                          <Search className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium">{search.query}</div>
                            <div className="text-sm text-gray-600">{search.date}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/properties?search=${encodeURIComponent(search.query)}`}>
                            Search Again
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Information */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <p className="text-gray-600">Update your personal information</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userInfo.location}
                      onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-gray-600">Get notified about new properties</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Price Alerts</div>
                      <div className="text-sm text-gray-600">Get alerts when prices change</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Account Type</div>
                      <div className="text-sm text-gray-600">Free account with basic features</div>
                    </div>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Member Since</div>
                      <div className="text-sm text-gray-600">January 2024</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Upgrade to Premium
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
