export interface Vehicle {
  id?: string;
  title: string;
  image: string;
  price: number;
  location: string;
  seller: string;
  year: number;
  mileage: number;
  condition: string;
  fuelType: string;
  bidCount?: number;
  endsIn?: string;
  isBidding?: boolean;
  createdAt: string;
  updatedAt: string;
} 