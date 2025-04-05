'use client';

import { CarCard } from '@/components/car-card';
import { Button } from '@/components/ui/button';
import { getCars } from '@/lib/services/car-service';
import { Car } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db, storage } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadCars = async () => {
    try {
      const fetchedCars = await getCars();
      setCars(fetchedCars);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleSave = () => {
    setIsAdding(false);
    loadCars();
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cars</h1>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          Add New Car
        </Button>
      </div>

      {isAdding && (
        <div className="mb-8">
          <CarCard isEditing onSave={handleSave} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
        {cars.length === 0 && !isAdding && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No cars found. Add your first car!</p>
          </div>
        )}
      </div>
    </div>
  );
} 