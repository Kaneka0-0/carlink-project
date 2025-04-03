"use client"

import { uploadVehicleImage } from "@/lib/firebase-utils"; // Ensure this utility is set up
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!imageFile) return;

    setLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadVehicleImage(imageFile);
      onUpload(imageUrl); // Call the onUpload function with the image URL
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Label htmlFor="image">Upload Image</Label>
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files![0])}
      />
      <Button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
} 