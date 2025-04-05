import { Vehicle, VehicleFormData } from '@/types/vehicle';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from './firebase';

const vehiclesCollection = collection(db, 'vehicles');

export async function uploadVehicleImage(file: File): Promise<string> {
  if (!auth.currentUser) throw new Error('Must be logged in to upload images');
  
  const storageRef = ref(storage, `vehicles/${auth.currentUser.uid}/${file.name}-${Date.now()}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function addVehicle(data: VehicleFormData, imageFile: File) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('You must be logged in to add a vehicle');
  }

  // Create a unique filename using timestamp
  const timestamp = Date.now();
  const fileName = `${imageFile.name}-${timestamp}`;
  
  // Upload to user-specific folder
  const storageRef = ref(storage, `vehicles/${user.uid}/${fileName}`);
  
  // Upload the image
  await uploadBytes(storageRef, imageFile);
  
  // Get the download URL
  const imageUrl = await getDownloadURL(storageRef);
  
  // Add the vehicle data to Firestore
  const vehicleData = {
    ...data,
    imageUrl,
    userId: user.uid,
    createdAt: new Date().toISOString(),
    status: 'active'
  };

  return addDoc(collection(db, 'vehicles'), vehicleData);
}

export async function getVehicles(filters?: {
  status?: Vehicle['status'];
  userId?: string;
}): Promise<Vehicle[]> {
  try {
    let q = query(vehiclesCollection, orderBy('createdAt', 'desc'));

    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters?.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Vehicle));
  } catch (error) {
    console.error('Error getting vehicles:', error);
    throw error;
  }
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  try {
    const docRef = doc(vehiclesCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
    } as Vehicle;
  } catch (error) {
    console.error('Error getting vehicle:', error);
    throw error;
  }
}

export async function updateVehicle(
  id: string,
  data: Partial<VehicleFormData>,
  newImageFile?: File
): Promise<void> {
  if (!auth.currentUser) throw new Error('Must be logged in to update vehicles');

  try {
    const vehicleRef = doc(vehiclesCollection, id);
    const vehicle = await getVehicle(id);
    
    if (!vehicle) throw new Error('Vehicle not found');
    if (vehicle.seller.id !== auth.currentUser.uid) throw new Error('Not authorized to update this vehicle');

    let updateData = { ...data };

    if (newImageFile) {
      // Delete old image if it exists
      if (vehicle.imageUrl) {
        const oldImageRef = ref(storage, vehicle.imageUrl);
        try {
          await deleteObject(oldImageRef);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }

      // Upload new image
      const imageUrl = await uploadVehicleImage(newImageFile);
      updateData.imageUrl = imageUrl;
    }

    await updateDoc(vehicleRef, updateData);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
}

export async function deleteVehicle(id: string): Promise<void> {
  if (!auth.currentUser) throw new Error('Must be logged in to delete vehicles');

  try {
    const vehicle = await getVehicle(id);
    if (!vehicle) throw new Error('Vehicle not found');
    if (vehicle.seller.id !== auth.currentUser.uid) throw new Error('Not authorized to delete this vehicle');

    // Delete image from storage if it exists
    if (vehicle.imageUrl) {
      const imageRef = ref(storage, vehicle.imageUrl);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    // Delete document from Firestore
    await deleteDoc(doc(vehiclesCollection, id));
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
} 