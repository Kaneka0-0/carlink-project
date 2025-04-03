import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

export async function seedVehicle() {
  try {
    await addDoc(collection(db, 'vehicles'), {
      title: "2021 Tesla Model 3 Long Range AWD",
      images: ["/placeholder.svg?height=600&width=800"],
      price: 42999,
      // ... rest of your vehicle data
    });
  } catch (error) {
    console.error("Error seeding vehicle data:", error);
  }
} 