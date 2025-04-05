"use client"

import { ProtectedRoute } from '@/components/protected-route';
import { SiteHeader } from '@/components/site-header';
import { addVehicle, getVehicles } from "@/lib/firebase-utils";
import { Vehicle, VehicleFormData } from "@/types/vehicle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Image from "next/image";

import { AddVehicleDialog } from "@/components/add-vehicle-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleList } from "@/components/vehicle-list";
import { auth } from "@/lib/firebase";

interface WatchlistItem {
  id: string;
  title: string;
  image: string;
  price: number;
  location: string;
  bidEndsIn?: string;
  isBidding: boolean;
}

interface Bid {
  id: string;
  title: string;
  image: string;
  price: number;
  bidAmount: number;
  bidStatus: 'winning' | 'outbid' | 'ended';
  bidEndsIn?: string;
}

export default function DashboardPage() {
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("vehicles");
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        if (!auth.currentUser) {
          toast.error('Please log in to view your dashboard');
          return;
        }

        // Load vehicles
        const vehiclesData = await getVehicles({ userId: auth.currentUser.uid });
        setVehicles(vehiclesData);

        // TODO: Implement these when backend is ready
        // const watchlistData = await getWatchlist(auth.currentUser.uid);
        // const bidsData = await getUserBids(auth.currentUser.uid);
        // setWatchlist(watchlistData);
        // setBids(bidsData);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleAddVehicle = async (data: VehicleFormData, imageFile: File) => {
    try {
      setIsAddingVehicle(true);
      await addVehicle(data, imageFile);
      toast.success('Vehicle added successfully');
      
      // Refresh the vehicles list
      if (auth.currentUser) {
        const updatedVehicles = await getVehicles({ userId: auth.currentUser.uid });
        setVehicles(updatedVehicles);
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast.error('Failed to add vehicle. Please try again.');
    } finally {
      setIsAddingVehicle(false);
    }
  };

  if (!auth.currentUser) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
        <p className="text-muted-foreground">You need to be logged in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <SiteHeader />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your vehicles and listings</p>
          </div>
          <AddVehicleDialog onAddVehicle={handleAddVehicle} isLoading={isAddingVehicle} />
        </div>

        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="vehicles">Your Vehicles</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="bids">Your Bids</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="space-y-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading your vehicles...</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You haven't added any vehicles yet.</p>
              </div>
            ) : (
              <VehicleList vehicles={vehicles} />
            )}
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading watchlist...</p>
              </div>
            ) : watchlist.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your watchlist is empty.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchlist.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-[3/2] relative">
                      <Image 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>${item.price.toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                      {item.bidEndsIn && (
                        <p className="text-sm font-medium mt-2">Ends in {item.bidEndsIn}</p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant={item.isBidding ? "default" : "outline"} className="w-full">
                        {item.isBidding ? "Place Bid" : "View Details"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="bids" className="space-y-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading your bids...</p>
              </div>
            ) : bids.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You haven't placed any bids yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bids.map((bid) => (
                  <Card key={bid.id} className="overflow-hidden">
                    <div className="aspect-[3/2] relative">
                      <Image 
                        src={bid.image || "/placeholder.svg"} 
                        alt={bid.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{bid.title}</CardTitle>
                      <CardDescription>
                        Current Price: ${bid.price.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm">
                          Your Bid: ${bid.bidAmount.toLocaleString()}
                        </p>
                        <p className={`text-sm font-medium ${
                          bid.bidStatus === 'winning' ? 'text-green-600' :
                          bid.bidStatus === 'outbid' ? 'text-red-600' :
                          'text-muted-foreground'
                        }`}>
                          Status: {bid.bidStatus.charAt(0).toUpperCase() + bid.bidStatus.slice(1)}
                        </p>
                        {bid.bidEndsIn && (
                          <p className="text-sm">Ends in {bid.bidEndsIn}</p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant={bid.bidStatus === 'outbid' ? "default" : "outline"} 
                        className="w-full"
                      >
                        {bid.bidStatus === 'outbid' ? "Update Bid" : "View Details"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}

