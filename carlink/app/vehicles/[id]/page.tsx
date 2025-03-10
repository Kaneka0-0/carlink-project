"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  Share2,
  Clock,
  User,
  MapPin,
  Calendar,
  Fuel,
  Gauge,
  Car,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for a single vehicle
const vehicleData = {
  id: 1,
  title: "2021 Tesla Model 3 Long Range AWD",
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  price: 42999,
  location: "San Francisco, CA",
  seller: {
    name: "Premium Motors",
    rating: 4.8,
    reviews: 124,
    verified: true,
    phone: "(555) 123-4567",
    email: "contact@premiummotors.com",
  },
  bidEndsIn: "2 days 4 hours",
  isBidding: true,
  isWishlisted: false,
  year: 2021,
  mileage: 15000,
  fuelType: "Electric",
  transmission: "Automatic",
  color: "Pearl White",
  bodyType: "Sedan",
  doors: 4,
  vin: "5YJ3E1EA1MF123456",
  description:
    "This 2021 Tesla Model 3 Long Range AWD is in excellent condition with only 15,000 miles. It features Autopilot, premium interior, and a glass roof. The vehicle has a clean history with no accidents and is still under manufacturer warranty until 2025. The Pearl White exterior is paired with a black vegan leather interior. This Model 3 includes the premium connectivity package, 19-inch sport wheels, and the latest software updates.",
  features: [
    "Autopilot",
    "Premium Interior",
    "Glass Roof",
    "Heated Seats",
    "19-inch Sport Wheels",
    "Premium Sound System",
    "Navigation",
    "Bluetooth",
    "Backup Camera",
    "Keyless Entry",
    "Remote Start",
    "Parking Sensors",
  ],
  bids: [
    { id: 1, user: "user123", amount: 42500, time: "1 day ago" },
    { id: 2, user: "bidder456", amount: 42000, time: "2 days ago" },
    { id: 3, user: "carfan789", amount: 41500, time: "3 days ago" },
  ],
  history: {
    accidents: 0,
    owners: 1,
    title: "Clean",
    serviceRecords: [
      { date: "2022-10-15", mileage: 12000, service: "Regular maintenance" },
      { date: "2022-04-20", mileage: 7500, service: "Tire rotation" },
      { date: "2021-11-05", mileage: 3000, service: "Software update" },
    ],
  },
}

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(vehicleData.isWishlisted)
  const [bidAmount, setBidAmount] = useState(vehicleData.price + 500)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === vehicleData.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? vehicleData.images.length - 1 : prev - 1))
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="container py-8">
      <Link href="/vehicles" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to listings
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={vehicleData.images[currentImageIndex] || "/placeholder.svg"}
                alt={vehicleData.title}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
            <div className="flex overflow-x-auto gap-2 pb-2">
              {vehicleData.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden ${
                    currentImageIndex === index ? "ring-2 ring-primary" : "opacity-70"
                  }`}
                  onClick={() => selectImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${vehicleData.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{vehicleData.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {vehicleData.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <User className="mr-1 h-4 w-4" />
                {vehicleData.seller.name}
              </div>
              {vehicleData.isBidding && (
                <Badge variant="secondary">
                  <Clock className="mr-1 h-3 w-3" />
                  Ends in {vehicleData.bidEndsIn}
                </Badge>
              )}
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="bids">Bids</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-muted-foreground text-sm">Year</div>
                  <div className="font-medium flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    {vehicleData.year}
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-muted-foreground text-sm">Mileage</div>
                  <div className="font-medium flex items-center">
                    <Gauge className="mr-1 h-4 w-4 text-muted-foreground" />
                    {vehicleData.mileage.toLocaleString()} mi
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-muted-foreground text-sm">Fuel Type</div>
                  <div className="font-medium flex items-center">
                    <Fuel className="mr-1 h-4 w-4 text-muted-foreground" />
                    {vehicleData.fuelType}
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-muted-foreground text-sm">Transmission</div>
                  <div className="font-medium flex items-center">
                    <Car className="mr-1 h-4 w-4 text-muted-foreground" />
                    {vehicleData.transmission}
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="specs">
                  <AccordionTrigger>Additional Specifications</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Color</span>
                        <span>{vehicleData.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Body Type</span>
                        <span>{vehicleData.bodyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Doors</span>
                        <span>{vehicleData.doors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VIN</span>
                        <span>{vehicleData.vin}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{vehicleData.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="features" className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2">
                {vehicleData.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-muted-foreground text-sm">Accidents</div>
                  <div className="font-medium text-xl">{vehicleData.history.accidents}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-muted-foreground text-sm">Owners</div>
                  <div className="font-medium text-xl">{vehicleData.history.owners}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-muted-foreground text-sm">Title</div>
                  <div className="font-medium text-xl">{vehicleData.history.title}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Service Records</h3>
                <div className="space-y-3">
                  {vehicleData.history.serviceRecords.map((record, index) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <div>
                        <div>{record.service}</div>
                        <div className="text-sm text-muted-foreground">{record.date}</div>
                      </div>
                      <div className="text-right">
                        <div>{record.mileage.toLocaleString()} miles</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bids" className="space-y-4 pt-4">
              {vehicleData.isBidding ? (
                <>
                  <div className="space-y-3">
                    {vehicleData.bids.map((bid) => (
                      <div key={bid.id} className="flex justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">{bid.user}</div>
                          <div className="text-sm text-muted-foreground">{bid.time}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${bid.amount.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Place Your Bid</h3>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <Input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(Number.parseInt(e.target.value))}
                          className="pl-7"
                        />
                      </div>
                      <Button>Place Bid</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Minimum bid: ${(vehicleData.price + 500).toLocaleString()}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p>This vehicle is not available for bidding.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <div className="text-3xl font-bold mb-4">${vehicleData.price.toLocaleString()}</div>

            <div className="space-y-4">
              <Button className="w-full">{vehicleData.isBidding ? "Place Bid" : "Contact Seller"}</Button>
              <Button variant="outline" className="w-full" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Seller Information</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium">{vehicleData.seller.name}</div>
                <div className="text-sm text-muted-foreground">
                  {vehicleData.seller.rating} ★ ({vehicleData.seller.reviews} reviews)
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{vehicleData.seller.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="text-primary">{vehicleData.seller.email}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Seller Profile
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">Similar Vehicles</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="relative w-20 h-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Similar vehicle"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm line-clamp-1">2020 Tesla Model 3 Standard</div>
                    <div className="text-sm text-muted-foreground">15,000 mi</div>
                    <div className="font-bold text-sm">$39,999</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

