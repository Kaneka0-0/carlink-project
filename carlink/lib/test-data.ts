import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

export const addTestVehicle = async () => {
  try {
    const vehicleData = {
      title: "2021 Tesla Model 3",
      image: "/placeholder.svg", // Use a placeholder image
      price: 42999,
      location: "San Francisco, CA",
      seller: "Premium Motors",
      year: 2021,
      mileage: 15000,
      condition: "Excellent",
      fuelType: "Electric",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'vehicles'), vehicleData);
    console.log("Test vehicle added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding test vehicle: ", error);
  }
}; 