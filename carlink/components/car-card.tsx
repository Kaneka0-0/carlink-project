'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { addCar } from '@/lib/services/car-service';
import { Car, CarFormData } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

interface CarCardProps {
  car?: Car;
  isEditing?: boolean;
  onSave?: () => void;
}

export function CarCard({ car, isEditing = false, onSave }: CarCardProps) {
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(car?.imageUrl || null);
  const [formData, setFormData] = useState<CarFormData>({
    brand: car?.brand || '',
    model: car?.model || '',
    year: car?.year || new Date().getFullYear(),
    price: car?.price || 0,
    type: car?.type || '',
    color: car?.color || '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    try {
      await addCar(formData, imageFile);
      toast({
        title: "Success",
        description: "Car added successfully",
      });
      onSave?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add car",
        variant: "destructive",
      });
    }
  };

  if (isEditing) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Add New Car</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Car Image</Label>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <p className="text-sm text-muted-foreground">No image selected</p>
                  </div>
                )}
              </div>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
            </div>

            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input
                  id={key}
                  name={key}
                  type={key === 'year' || key === 'price' ? 'number' : 'text'}
                  value={value}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Add Car</Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <Image
          src={car?.imageUrl || '/placeholder.jpg'}
          alt={`${car?.brand} ${car?.model}`}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{car?.brand} {car?.model}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Year</p>
            <p className="font-medium">{car?.year}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-medium">${car?.price?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-medium">{car?.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Color</p>
            <p className="font-medium">{car?.color}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 