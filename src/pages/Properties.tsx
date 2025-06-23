import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Filter, SlidersHorizontal, Grid, List } from "lucide-react";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { Property, SearchFilters } from "@/types/property";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api/properties";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [areaRange, setAreaRange] = useState([0, 10000]);
  const [minBathrooms, setMinBathrooms] = useState(0);
  const [amenitiesFilter, setAmenitiesFilter] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
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
      .then((data: Property[]) => {
        setAllProperties(data);
        setProperties(data);
        // Optionally, set price range based on data
      });
  }, []);

  useEffect(() => {
    // Initialize filters from URL params
    const initialFilters: SearchFilters = {};
    if (searchParams.get("location")) initialFilters.location = searchParams.get("location") || "";
    if (searchParams.get("type")) initialFilters.type = searchParams.get("type") || "";
    if (searchParams.get("status")) initialFilters.status = searchParams.get("status") || "";
    if (searchParams.get("search")) initialFilters.location = searchParams.get("search") || "";
    setFilters(initialFilters);
    filterProperties(initialFilters, allProperties);
    // eslint-disable-next-line
  }, [searchParams, allProperties]);

  const filterProperties = (currentFilters: SearchFilters, baseProperties = allProperties) => {
    let filtered = baseProperties;
    if (currentFilters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(currentFilters.location!.toLowerCase()) ||
        p.title.toLowerCase().includes(currentFilters.location!.toLowerCase())
      );
    }
    if (currentFilters.type) {
      filtered = filtered.filter(p => p.type === currentFilters.type);
    }
    if (currentFilters.status) {
      filtered = filtered.filter(p => p.status === currentFilters.status);
    }
    if (currentFilters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= currentFilters.bedrooms!);
    }
    // Area filter
    filtered = filtered.filter(p => p.area >= areaRange[0] && p.area <= areaRange[1]);
    // Bathrooms filter
    if (minBathrooms > 0) {
      filtered = filtered.filter(p => p.bathrooms >= minBathrooms);
    }
    // Amenities filter
    if (amenitiesFilter.trim()) {
      const amens = amenitiesFilter.split(',').map(a => a.trim().toLowerCase());
      filtered = filtered.filter(p => amens.every(a => p.amenities.map(x => x.toLowerCase()).includes(a)));
    }
    // Featured filter
    if (featuredOnly) {
      filtered = filtered.filter(p => p.featured);
    }
    if (currentFilters.minPrice || currentFilters.maxPrice) {
      filtered = filtered.filter(p => {
        const price = p.price;
        const min = currentFilters.minPrice || 0;
        const max = currentFilters.maxPrice || Infinity;
        return price >= min && price <= max;
      });
    }
    setProperties(filtered);
  };

  const updateFilter = (key: keyof SearchFilters, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    filterProperties(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setProperties(allProperties);
    setSearchParams({});
  };

  const handlePriceRangeChange = (range: number[]) => {
    setPriceRange(range);
    const newFilters = { 
      ...filters, 
      minPrice: range[0], 
      maxPrice: range[1] 
    };
    setFilters(newFilters);
    filterProperties(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties</h1>
            <p className="text-gray-600">
              {properties.length} properties found
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      placeholder="Enter location"
                      value={filters.location || ""}
                      onChange={(e) => updateFilter("location", e.target.value)}
                    />
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Property Type</label>
                    <Select value={filters.type || ""} onValueChange={(value) => updateFilter("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Buy/Rent */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Buy/Rent</label>
                    <Select value={filters.status || ""} onValueChange={(value) => updateFilter("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="sale">Buy</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bedrooms</label>
                    <Select value={filters.bedrooms?.toString() || ""} onValueChange={(value) => updateFilter("bedrooms", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="1">1+ Bedrooms</SelectItem>
                        <SelectItem value="2">2+ Bedrooms</SelectItem>
                        <SelectItem value="3">3+ Bedrooms</SelectItem>
                        <SelectItem value="4">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range: ₹{(priceRange[0] / 100000).toFixed(1)}L - ₹{(priceRange[1] / 100000).toFixed(1)}L
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                      max={20000000}
                      min={0}
                      step={100000}
                      className="mt-2"
                    />
                  </div>

                  {/* Area Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Area (sq ft)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min={0}
                        value={areaRange[0]}
                        onChange={e => {
                          const val = Number(e.target.value);
                          setAreaRange([val, areaRange[1]]);
                          filterProperties(filters);
                        }}
                        placeholder="Min"
                      />
                      <Input
                        type="number"
                        min={0}
                        value={areaRange[1]}
                        onChange={e => {
                          const val = Number(e.target.value);
                          setAreaRange([areaRange[0], val]);
                          filterProperties(filters);
                        }}
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bathrooms (min)</label>
                    <Input
                      type="number"
                      min={0}
                      value={minBathrooms}
                      onChange={e => {
                        setMinBathrooms(Number(e.target.value));
                        filterProperties(filters);
                      }}
                      placeholder="Min bathrooms"
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amenities (comma separated)</label>
                    <Input
                      value={amenitiesFilter}
                      onChange={e => {
                        setAmenitiesFilter(e.target.value);
                        filterProperties(filters);
                      }}
                      placeholder="e.g. Parking, Gym"
                    />
                  </div>

                  {/* Featured Only */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={featuredOnly}
                      onChange={e => {
                        setFeaturedOnly(e.target.checked);
                        filterProperties(filters);
                      }}
                      id="featuredOnly"
                    />
                    <label htmlFor="featuredOnly">Show Featured Only</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {Object.keys(filters).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.location && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Location: {filters.location}
                    <button 
                      onClick={() => updateFilter("location", "")}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {filters.type && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Type: {filters.type}
                    <button 
                      onClick={() => updateFilter("type", "")}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {filters.status && (
                  <Badge variant="secondary" className="px-3 py-1">
                    {filters.status === "sale" ? "Buy" : "Rent"}
                    <button 
                      onClick={() => updateFilter("status", "")}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Properties List */}
            {properties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
