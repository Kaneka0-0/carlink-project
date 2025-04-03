"use client"

import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { placeBid } from '@/lib/firebase-utils';

export default function AuctionPage({ params }: { params: { id: string } }) {
  const [auction, setAuction] = useState<VehicleData | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'auctions', params.id),
      (doc) => {
        setAuction({ id: doc.id, ...doc.data() } as VehicleData);
      }
    );

    return () => unsubscribe();
  }, [params.id]);

  const handleBid = async () => {
    if (auction && bidAmount > auction.currentBid) {
      await placeBid(auction.id, user.uid, bidAmount);
      // Update local state or refetch auction data as needed
    } else {
      alert("Bid must be higher than current bid.");
    }
  };

  // Your auction page JSX
  return (
    <div>
      {/* Auction details */}
      <h1>{auction?.title}</h1>
      <p>Current Bid: ${auction?.currentBid}</p>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(Number(e.target.value))}
        placeholder="Enter your bid"
      />
      <button onClick={handleBid}>Place Bid</button>
    </div>
  );
}