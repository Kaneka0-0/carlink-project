import { adminAuth, getAuthenticatedAppForUser } from '@/lib/firebase/serverApp';

export default async function handler(req: { headers: { authorization: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { uid?: any; error?: string; }): void; new(): any; }; }; }) {
  const adminApp = await getAuthenticatedAppForUser();

  // Example: Verify an ID token
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (idToken) {
    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      res.status(200).json({ uid: decodedToken.uid });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(400).json({ error: 'No token provided' });
  }
}
