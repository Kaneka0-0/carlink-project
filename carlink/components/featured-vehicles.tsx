"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Clock, User, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for featured vehicles
const featuredVehicles = [
  {
    id: 1,
    title: "2021 Tesla Model 3",
    image: "/placeholder.svg?height=400&width=600",
    price: 42999,
    location: "San Francisco, CA",
    seller: "Premium Motors",
    bidEndsIn: "2 days",
    isBidding: true,
    isWishlisted: false,
  },
  {
    id: 2,
    title: "2020 BMW X5",
    image: "/placeholder.svg?height=400&width=600",
    price: 55000,
    location: "Los Angeles, CA",
    seller: "Luxury Auto Group",
    bidEndsIn: "",
    isBidding: false,
    isWishlisted: true,
  },
  {
    id: 3,
    title: "2019 Audi Q7",
    image: "/placeholder.svg?height=400&width=600",
    price: 48500,
    location: "Chicago, IL",
    seller: "Elite Cars",
    bidEndsIn: "5 days",
    isBidding: true,
    isWishlisted: false,
  },
  {
    id: 4,
    title: "2022 Ford Mustang GT",
    image: "/placeholder.svg?height=400&width=600",
    price: 52000,
    location: "Miami, FL",
    seller: "Classic Auto",
    bidEndsIn: "",
    isBidding: false,
    isWishlisted: false,
  },
]

export function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState(featuredVehicles)

  const toggleWishlist = (id: number) => {
    setVehicles(
      vehicles.map((vehicle) => (vehicle.id === id ? { ...vehicle, isWishlisted: !vehicle.isWishlisted } : vehicle)),
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="overflow-hidden group">
          <div className="relative">
            <Link href={`/vehicles/${vehicle.id}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full"
              onClick={() => toggleWishlist(vehicle.id)}
            >
              <Heart className={`h-5 w-5 ${vehicle.isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            {vehicle.isBidding && (
              <Badge variant="secondary" className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm">
                <Clock className="mr-1 h-3 w-3" />
                Ends in {vehicle.bidEndsIn}
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <Link href={`/vehicles/${vehicle.id}`}>
              <h3 className="font-semibold text-lg mb-2 hover:underline">{vehicle.title}</h3>
            </Link>
            <p className="text-xl font-bold mb-3">${vehicle.price.toLocaleString()}</p>
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <MapPin className="mr-1 h-4 w-4" />
              {vehicle.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="mr-1 h-4 w-4" />
              {vehicle.seller}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant={vehicle.isBidding ? "default" : "outline"} className="w-full">
              {vehicle.isBidding ? "Place Bid" : "View Details"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

