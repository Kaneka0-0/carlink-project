"use client"

import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

export default function AddVehiclePage() {
  const [status, setStatus] = useState('');

  const addTestVehicle = async () => {
    try {
      const docRef = await addDoc(collection(db, 'vehicles'), {
        title: "Test Vehicle",
        price: 25000,
        year: 2023,
        condition: "New",
        createdAt: new Date().toISOString()
      });
      setStatus(`Vehicle added with ID: ${docRef.id}`);
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={addTestVehicle}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Test Vehicle
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
} 