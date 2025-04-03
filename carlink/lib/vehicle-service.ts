import { Vehicle } from '@/types/vehicle';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'vehicles';

export const vehicleService = {
  // Add a new vehicle
  async addVehicle(vehicleData: Omit<Vehicle, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...vehicleData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding vehicle:', error);
      throw error;
    }
  },

  // Get all vehicles
  async getVehicles() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Vehicle[];
    } catch (error) {
      console.error('Error getting vehicles:', error);
      throw error;
    }
  },

  // Get vehicles by filter
  async getVehiclesByFilter(filters: {
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
    isBidding?: boolean;
  }) {
    try {
      let q = query(collection(db, COLLECTION_NAME));

      if (filters.minPrice) {
        q = query(q, where('price', '>=', filters.minPrice));
      }
      if (filters.maxPrice) {
        q = query(q, where('price', '<=', filters.maxPrice));
      }
      if (filters.condition) {
        q = query(q, where('condition', '==', filters.condition));
      }
      if (filters.isBidding !== undefined) {
        q = query(q, where('isBidding', '==', filters.isBidding));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Vehicle[];
    } catch (error) {
      console.error('Error getting filtered vehicles:', error);
      throw error;
    }
  },

  // Update a vehicle
  async updateVehicle(id: string, vehicleData: Partial<Vehicle>) {
    try {
      const vehicleRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(vehicleRef, {
        ...vehicleData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  },

  // Delete a vehicle
  async deleteVehicle(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  }
}; 