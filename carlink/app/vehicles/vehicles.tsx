"use client"

import { getVehicles } from "@/lib/firebase-utils"
import { Vehicle } from "@/types/vehicle"
import { Car, ChevronDown, Clock, Filter, Grid, Heart, List, MapPin, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState("grid")
  const [priceRange, setPriceRange] = useState([0, 100000])

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Fetch vehicles from Firestore
        const data = await getVehicles();
        setVehicles(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading vehicles:', err);
        setError('Failed to load vehicles');
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const toggleWishlist = (id: number) => {
    setVehicles(
      vehicles.map((vehicle) => (vehicle.id === id ? { ...vehicle, isWishlisted: !vehicle.isWishlisted } : vehicle)),
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showBackButton backButtonHref="/" backButtonLabel="Home" />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Browse Vehicles</h1>
            <p className="text-muted-foreground">Find your perfect ride from our extensive collection</p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Vehicles</SheetTitle>
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
                    <h3 className="font-medium">Make</h3>
                    <div className="space-y-2">
                      {["Toyota", "Honda", "Ford", "BMW", "Audi", "Tesla"].map((make) => (
                        <div key={make} className="flex items-center space-x-2">
                          <Checkbox id={`make-${make.toLowerCase()}`} />
                          <label
                            htmlFor={`make-${make.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {make}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Year</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year-from">From</Label>
                        <input
                          type="number"
                          id="year-from"
                          min="1800"
                          max="2025"
                          placeholder="From year"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year-to">To</Label>
                        <input
                          type="number"
                          id="year-to"
                          min="1800"
                          max="2025"
                          placeholder="To year"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Fuel Type</h3>
                    <div className="space-y-2">
                      {["Gasoline", "Diesel", "Electric", "Hybrid"].map((fuel) => (
                        <div key={fuel} className="flex items-center space-x-2">
                          <Checkbox id={`fuel-${fuel.toLowerCase()}`} />
                          <label
                            htmlFor={`fuel-${fuel.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {fuel}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Vehicle Type</h3>
                    <div className="space-y-2">
                      {["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Van"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={`type-${type.toLowerCase()}`} />
                          <label
                            htmlFor={`type-${type.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Mileage</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mileage-under-30k" />
                        <label
                          htmlFor="mileage-under-30k"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Under 30,000 miles
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mileage-30k-60k" />
                        <label
                          htmlFor="mileage-30k-60k"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          30,000 - 60,000 miles
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mileage-over-60k" />
                        <label
                          htmlFor="mileage-over-60k"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Over 60,000 miles
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[160px] h-8">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2 rounded-none rounded-l-md"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2 rounded-none rounded-r-md"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        ) : (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex flex-col md:flex-row border rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="relative md:w-1/3">
                  <Link href={`/vehicles/${vehicle.id}`}>
                    <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
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
                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex-1">
                    <Link href={`/vehicles/${vehicle.id}`}>
                      <h3 className="font-semibold text-xl mb-2 hover:underline">{vehicle.title}</h3>
                    </Link>
                    <p className="text-2xl font-bold mb-3">${vehicle.price.toLocaleString()}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Year: {vehicle.year}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{vehicle.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{vehicle.seller}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="mr-2">🛣️</span>
                        <span>{vehicle.mileage.toLocaleString()} miles</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant={vehicle.isBidding ? "default" : "outline"} className="w-full md:w-auto">
                      {vehicle.isBidding ? "Place Bid" : "View Details"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled>
              <ChevronDown className="h-4 w-4 rotate-90" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8">
              3
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8">
              4
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8">
              5
            </Button>
            <Button variant="outline" size="icon">
              <ChevronDown className="h-4 w-4 -rotate-90" />
              <span className="sr-only">Next</span>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  )
}

