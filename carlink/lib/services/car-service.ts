import { auth, db, storage } from '@/lib/firebase';
import { Car, CarFormData } from '@/lib/types';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const carCollection = collection(db, 'cars');

export async function uploadCarImage(file: File): Promise<string> {
  const storageRef = ref(storage, `cars/${file.name}-${Date.now()}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function addCar(carData: CarFormData, imageFile: File): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('You must be logged in to add a car');
  }

  try {
    const imageUrl = await uploadCarImage(imageFile);
    const docRef = await addDoc(carCollection, {
      ...carData,
      imageUrl,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding car:', error);
    throw error;
  }
}

export async function getCars(): Promise<Car[]> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('You must be logged in to view cars');
  }

  const q = query(
    carCollection,
    where('userId', '==', user.uid),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
  })) as Car[];
} 