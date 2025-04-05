export interface Car {
  id: string;
  imageUrl: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  type: string;
  color: string;
  createdAt: string;
}

export type CarFormData = Omit<Car, 'id' | 'imageUrl' | 'createdAt'>; 