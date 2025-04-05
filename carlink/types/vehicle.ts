export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  description: string;
  imageUrl: string;
  features: string[];
  condition: string;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  createdAt: string;
  status: 'available' | 'sold' | 'pending';
}

export type VehicleFormData = Omit<Vehicle, 'id' | 'createdAt' | 'seller' | 'status'>; 