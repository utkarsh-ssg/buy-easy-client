
import { Property } from "@/types/property";

export const sampleProperties: Property[] = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment in Prime Location",
    price: 8500000,
    location: "Bandra West, Mumbai",
    area: 1200,
    bedrooms: 3,
    bathrooms: 2,
    type: "apartment",
    status: "sale",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop"
    ],
    description: "Beautiful 3BHK apartment with modern amenities, prime location with easy access to transportation, shopping centers, and schools. Fully furnished with premium fittings.",
    amenities: ["Swimming Pool", "Gym", "Security", "Parking", "Garden", "Elevator"],
    seller: {
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      email: "rajesh@example.com",
      verified: true
    },
    featured: true,
    createdAt: "2024-01-15",
    coordinates: { lat: 19.0596, lng: 72.8295 }
  },
  {
    id: "2",
    title: "Spacious 2BHK for Rent in IT Hub",
    price: 35000,
    location: "Whitefield, Bangalore",
    area: 950,
    bedrooms: 2,
    bathrooms: 2,
    type: "apartment",
    status: "rent",
    images: [
      "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
    ],
    description: "Well-maintained 2BHK apartment in the heart of IT hub, close to tech parks, restaurants, and entertainment centers. Perfect for working professionals.",
    amenities: ["Parking", "Security", "Power Backup", "Internet Ready"],
    seller: {
      name: "Priya Sharma",
      phone: "+91 9876543211",
      email: "priya@example.com",
      verified: true
    },
    featured: false,
    createdAt: "2024-01-20"
  },
  {
    id: "3",
    title: "Independent Villa with Garden",
    price: 15000000,
    location: "Gurgaon Sector 42",
    area: 2500,
    bedrooms: 4,
    bathrooms: 3,
    type: "villa",
    status: "sale",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop"
    ],
    description: "Luxurious independent villa with beautiful garden, spacious rooms, and modern architecture. Perfect for families looking for premium living.",
    amenities: ["Garden", "Parking", "Security", "Swimming Pool", "Servant Room"],
    seller: {
      name: "Amit Singh",
      phone: "+91 9876543212",
      email: "amit@example.com",
      verified: false
    },
    featured: true,
    createdAt: "2024-01-18"
  },
  {
    id: "4",
    title: "Modern 1BHK Studio Apartment",
    price: 25000,
    location: "Koramangala, Bangalore",
    area: 600,
    bedrooms: 1,
    bathrooms: 1,
    type: "apartment",
    status: "rent",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
    ],
    description: "Compact and modern 1BHK studio apartment perfect for young professionals. Located in vibrant Koramangala with easy access to cafes, pubs, and offices.",
    amenities: ["Parking", "Security", "Elevator", "Internet Ready"],
    seller: {
      name: "Sneha Patel",
      phone: "+91 9876543213",
      email: "sneha@example.com",
      verified: true
    },
    featured: false,
    createdAt: "2024-01-22"
  },
  {
    id: "5",
    title: "Commercial Office Space",
    price: 5000000,
    location: "Connaught Place, Delhi",
    area: 800,
    bedrooms: 0,
    bathrooms: 2,
    type: "commercial",
    status: "sale",
    images: [
      "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=600&fit=crop"
    ],
    description: "Prime commercial office space in the heart of Delhi. Perfect for businesses looking for a prestigious address with excellent connectivity.",
    amenities: ["Parking", "Security", "Elevator", "Power Backup", "Conference Room"],
    seller: {
      name: "Rohit Agarwal",
      phone: "+91 9876543214",
      email: "rohit@example.com",
      verified: true
    },
    featured: false,
    createdAt: "2024-01-25"
  }
];
