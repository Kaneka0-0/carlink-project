import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';

// Add these collection references
export const collections = {
  users: collection(db, 'users'),
  vehicles: collection(db, 'vehicles'),
  auctions: collection(db, 'auctions'),
  bids: collection(db, 'bids'),
};

// Vehicle type
interface VehicleData {
  title: string;
  image: string;
  price: number;
  location: string;
  seller: string;
  bidCount?: number;
  endsIn?: string;
  year: number;
  condition: string;
  startingBid?: number;
  currentBid?: number;
  highestBidder?: string;
  auctionEnd?: string;
  status?: "active" | "ended";
}

// Vehicle related functions
export const addVehicle = async (vehicle: Omit<VehicleData, "id">) => {
  const docRef = await addDoc(collection(db, "vehicles"), {
    ...vehicle,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...vehicle };
};

export const getVehicles = async () => {
  const q = query(collection(db, 'vehicles'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Auction related functions
export const placeBid = async (auctionId: string, userId: string, amount: number) => {
  try {
    const bidRef = await addDoc(collection(db, 'bids'), {
      auctionId,
      userId,
      amount,
      timestamp: new Date()
    });
    return bidRef.id;
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
};

// Get active auctions
export const getActiveAuctions = async (): Promise<VehicleData[]> => {
  const q = query(collection(db, "vehicles"), where("status", "==", "active"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as VehicleData));
};

// End auction
export const endAuction = async (vehicleId: string) => {
  const vehicleRef = doc(db, "vehicles", vehicleId);
  await updateDoc(vehicleRef, { status: "ended" });
};

// User related functions
export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Image upload function
export const uploadVehicleImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `vehicles/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};