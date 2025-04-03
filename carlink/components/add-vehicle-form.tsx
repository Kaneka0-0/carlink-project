"use client"

import { addVehicle } from "@/lib/firebase-utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AddVehicleForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const vehicleData = {
        title: formData.get('title') as string,
        price: Number(formData.get('price')),
        location: formData.get('location') as string,
        seller: formData.get('seller') as string,
        year: Number(formData.get('year')),
        condition: formData.get('condition') as string,
        image: imageUrl,
      };

      // Add vehicle to Firestore
      await addVehicle(vehicleData);
      router.push('/vehicles');
    } catch (err) {
      console.error('Error adding vehicle:', err);
      setError('Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Vehicle Title</Label>
        <Input id="title" name="title" required />
      </div>

      <ImageUpload onUpload={setImageUrl} />

      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type="number" required />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" required />
      </div>

      <div>
        <Label htmlFor="seller">Seller</Label>
        <Input id="seller" name="seller" required />
      </div>

      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" type="number" required />
      </div>

      <div>
        <Label htmlFor="condition">Condition</Label>
        <Input id="condition" name="condition" required />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Vehicle'}
      </Button>
    </form>
  );
}