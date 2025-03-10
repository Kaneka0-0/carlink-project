"use client"

import { Camera, Check, DollarSign, Info } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function SellPage() {
  const [listingType, setListingType] = useState("fixed-price")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleImageUpload = () => {
    // In a real app, this would handle actual file uploads
    // For this demo, we'll just add placeholder images
    setUploadedImages([
      ...uploadedImages,
      `/placeholder.svg?height=400&width=600&text=Image ${uploadedImages.length + 1}`,
    ])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showBackButton backButtonHref="/" backButtonLabel="Home" />

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Sell Your Vehicle</h1>
              <p className="text-muted-foreground">List your vehicle for sale or auction on AutoMarket</p>
            </div>
            <Button type="submit" size="lg">
              Submit Listing
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Vehicle Basics */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <input
                        type="number"
                        id="year"
                        min="1800"
                        max="2025"
                        placeholder="Enter vehicle year"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="make">Brand</Label>
                      {/* <Select defaultValue="toyota">
                        <SelectTrigger id="make">
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="tesla">Tesla</SelectItem>
                        </SelectContent> 
                      </Select> */}
                      <input 
                      type="text" 
                      placeholder="Enter vehicle brand"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      autoCorrect="on"
                      autoCapitalize="words"
                      spellCheck="true"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <input 
                      type="text" 
                      placeholder="Enter vehicle model"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      autoCorrect="on"
                      autoCapitalize="words"
                      spellCheck="true"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exterior-color">Exterior Color</Label>
                      <Select defaultValue="white">
                        <SelectTrigger id="exterior-color">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="black">Black</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="blue">Blue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="trim">Trim</Label>
                      <Select defaultValue="se">
                        <SelectTrigger id="trim">
                          <SelectValue placeholder="Select trim" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="le">LE</SelectItem>
                          <SelectItem value="se">SE</SelectItem>
                          <SelectItem value="xle">XLE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> 
                  </div>*/}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="mileage">Mileage</Label>
                      <Input id="mileage" type="number" placeholder="e.g., 25000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Select defaultValue="excellent">
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="very-good">Very Good</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                    <div className="space-y-2">
                      <Label htmlFor="transmission">Transmission</Label>
                      <RadioGroup defaultValue="automatic" className="flex gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="automatic" id="automatic" />
                          <Label htmlFor="automatic">Automatic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="manual" id="manual" />
                          <Label htmlFor="manual">Manual</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Photos & Description */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Photos & Description</h2>

                  <div className="space-y-2 mb-6">
                    <Label>Vehicle Photos</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative aspect-[4/3] rounded-md overflow-hidden border">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Vehicle photo ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                            onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                      <div
                        className="aspect-[4/3] rounded-md border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={handleImageUpload}
                      >
                        <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Add Photo</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload photos of your vehicle. Include exterior, interior, and any damage.
                    </p>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="title">Listing Title</Label>
                    <Input id="title" placeholder="e.g., 2020 Toyota Camry SE - Low Miles, One Owner" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Vehicle Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your vehicle's condition, features, and history..."
                      className="min-h-[150px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing & Contact */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Pricing & Contact</h2>

                  <div className="space-y-4 mb-6">
                    <Label>Listing Type</Label>
                    <RadioGroup
                      defaultValue={listingType}
                      onValueChange={setListingType}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="fixed-price" id="fixed-price" className="mt-1" />
                        <div>
                          <Label htmlFor="fixed-price" className="font-medium">
                            Fixed Price
                          </Label>
                          <p className="text-sm text-muted-foreground">Set a specific price for your vehicle</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="auction" id="auction" className="mt-1" />
                        <div>
                          <Label htmlFor="auction" className="font-medium">
                            Auction
                          </Label>
                          <p className="text-sm text-muted-foreground">Let buyers bid on your vehicle</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {listingType === "fixed-price" ? (
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="asking-price">Asking Price ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="asking-price" className="pl-8" placeholder="e.g., 25000" />
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="negotiable" />
                        <Label htmlFor="negotiable" className="text-sm">
                          Price is negotiable
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="starting-bid">Starting Bid ($)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="starting-bid" className="pl-8" placeholder="e.g., 15000" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="auction-duration">Auction Duration</Label>
                        <Select defaultValue="7">
                          <SelectTrigger id="auction-duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="location">Vehicle Location</Label>
                    <Input id="location" placeholder="e.g., San Francisco, CA" />
                  </div>

                  <div className="space-y-2">
                    <Label>Contact Preferences</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="contact-email" defaultChecked />
                        <Label htmlFor="contact-email">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="contact-phone" defaultChecked />
                        <Label htmlFor="contact-phone">Phone</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Listing Fee</AlertTitle>
                <AlertDescription>
                  {listingType === "fixed-price"
                    ? "Standard listing fee: $49.99. Your listing will be active for 30 days."
                    : "Auction listing fee: $79.99. Includes premium placement and featured status."}
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-2 mb-6">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary underline">
                    terms and conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary underline">
                    privacy policy
                  </a>
                  .
                </Label>
              </div>

              <Button size="lg" className="w-full">
                Submit Listing
              </Button>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Listing Tips</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Be honest about condition</h4>
                        <p className="text-sm text-muted-foreground">
                          Accurately describe any issues or damage to build trust.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Take quality photos</h4>
                        <p className="text-sm text-muted-foreground">
                          Include clear photos of exterior, interior, and engine.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Price competitively</h4>
                        <p className="text-sm text-muted-foreground">
                          Research similar vehicles to ensure your price is competitive.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Market Insights</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm">Average Price</h4>
                      <p className="text-2xl font-bold">$26,500</p>
                      <p className="text-sm text-muted-foreground">For similar 2020 Toyota Camry SE models</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Popular Features</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">Backup Camera</Badge>
                        <Badge variant="outline">Bluetooth</Badge>
                        <Badge variant="outline">Apple CarPlay</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Average Time to Sell</h4>
                      <p className="text-sm">18 days for this model</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our team is available to assist you with creating your listing.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

