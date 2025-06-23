
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  type: 'apartment' | 'house' | 'villa' | 'commercial';
  status: 'sale' | 'rent';
  images: string[];
  description: string;
  amenities: string[];
  seller: {
    name: string;
    phone: string;
    email: string;
    verified: boolean;
  };
  featured: boolean;
  createdAt: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SearchFilters {
  location?: string;
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}
