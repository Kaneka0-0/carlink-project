import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

export const testFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, 'test'), {
      message: 'Test successful',
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}; 