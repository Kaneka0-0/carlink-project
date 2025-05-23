// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // Allows all hostnames
//       },
//       {
//         protocol: "https",
//         hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
//       },
//       {
//         protocol: "https",
//         hostname: "firebasestorage.googleapis.com", // Add Firebase storage
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all hostnames
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Add Firebase storage
      },
    ],
  },
};

export default nextConfig;

// Import Firebase and Firebase Storage
import { storage } from '@/lib/firebase'; // This should be your Firebase setup file
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Example: Upload a file to Firebase Storage
async function uploadFile(file: File) {
  if (!file) return;

  // Create a storage reference
  const storageRef = ref(storage, `uploads/${file.name}`);

  // Upload the file
  await uploadBytes(storageRef, file);

  // Get the download URL
  const downloadURL = await getDownloadURL(storageRef);
  console.log('File uploaded successfully!', downloadURL);

  return downloadURL;
}