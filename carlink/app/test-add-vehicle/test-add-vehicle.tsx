"use client"

import { addTestVehicle } from '@/lib/test-data';
import { useEffect } from 'react';

export default function TestAddVehiclePage() {
  useEffect(() => {
    const runTest = async () => {
      await addTestVehicle();
    };

    runTest();
  }, []);

  return (
    <div>
      <h1>Adding Test Vehicle...</h1>
      <p>Check your Firestore database for the new vehicle entry.</p>
    </div>
  );
} 