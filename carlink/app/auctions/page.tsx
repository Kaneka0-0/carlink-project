"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Search, Filter, MapPin, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"

// Mock data for auctions
const auctionsData = [
  {
    id: 1,
    title: "2021 Tesla Model 3 Long Range",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 42500,
    bidCount: 12,
    endsIn: "2 days 4 hours",
    location: "San Francisco, CA",
    seller: "Premium Motors",
    year: 2021,
    condition: "Excellent",
  },
  {
    id: 2,
    title: "2019 Audi Q7 Premium Plus",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 38700,
    bidCount: 8,
    endsIn: "5 days 12 hours",
    location: "Chicago, IL",
    seller: "Elite Cars",
    year: 2019,
    condition: "Very Good",
  },
  {
    id: 3,
    title: "2020 Honda Accord Sport",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 27999,
    bidCount: 15,
    endsIn: "1 day 6 hours",
    location: "Denver, CO",
    seller: "Honda Dealership",
    year: 2020,
    condition: "Excellent",
  },
  {
    id: 4,
    title: "2022 Ford Mustang GT",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 51500,
    bidCount: 20,
    endsIn: "3 days 8 hours",
    location: "Miami, FL",
    seller: "Classic Auto",
    year: 2022,
    condition: "Like New",
  },
  {
    id: 5,
    title: "2021 Chevrolet Silverado",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 39500,
    bidCount: 7,
    endsIn: "3 days 15 hours",
    location: "Phoenix, AZ",
    seller: "Truck Depot",
    year: 2021,
    condition: "Excellent",
  },
  {
    id: 6,
    title: "2018 BMW X5 xDrive40e",
    image: "/placeholder.svg?height=400&width=600",
    currentBid: 36200,
    bidCount: 5,
    endsIn: "4 days 2 hours",
    location: "Seattle, WA",
    seller: "Luxury Imports",
    year: 2018,
    condition: "Good",
  },
]

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState(auctionsData)
  const [priceRange, setPriceRange] = useState([0, 100000])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showBackButton backButtonHref="/" backButtonLabel="Home" />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Live Auctions</h1>
              <p className="text-muted-foreground">Bid on vehicles and drive away with a great deal</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search auctions..." className="w-full md:w-[200px] pl-8" />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Auctions</SheetTitle>
                    <SheetDescription>Refine your search with specific criteria</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-6 py-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="space-y-4">
                        <Slider
                          defaultValue={[0, 100000]}
                          max={100000}
                          step={1000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex items-center justify-between">
                          <span>${priceRange[0].toLocaleString()}</span>
                          <span>${priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Ending Within</h3>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any time</SelectItem>
                          <SelectItem value="24h">24 hours</SelectItem>
                          <SelectItem value="3d">3 days</SelectItem>
                          <SelectItem value="7d">7 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Vehicle Condition</h3>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any condition</SelectItem>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline">Reset</Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Select defaultValue="ending-soon">
                <SelectTrigger className="w-[160px] h-8">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                  <SelectItem value="recently-added">Recently Added</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="most-bids">Most Bids</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Auctions</TabsTrigger>
              <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
              {/* <TabsTrigger value="no-reserve">No Reserve</TabsTrigger>
              <TabsTrigger value="new-listings">New Listings</TabsTrigger> */}
            </TabsList>
          </Tabs>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden group">
                <div className="relative">
                  <Link href={`/auctions/${auction.id}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={auction.image || "/placeholder.svg"}
                        alt={auction.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    {auction.bidCount} bids
                  </Badge>
                  <Badge variant="secondary" className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm">
                    <Clock className="mr-1 h-3 w-3" />
                    Ends in {auction.endsIn}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <Link href={`/auctions/${auction.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:underline">{auction.title}</h3>
                  </Link>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-muted-foreground">
                      {auction.year} • {auction.condition}
                    </div>
                  </div>
                  <p className="text-xl font-bold mb-3">Current Bid: ${auction.currentBid.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    {auction.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-1 h-4 w-4" />
                    {auction.seller}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Place Bid</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-muted/50 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Want to sell your vehicle at auction?</h2>
            <p className="text-muted-foreground mb-4">List your vehicle and let buyers bid for the best price</p>
            <Link href="/sell">
              <Button size="lg">Sell Your Vehicle</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

