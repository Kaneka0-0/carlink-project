"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sliders, ChevronRight, Sparkles, BarChart3, TrendingUp, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

// Mock data for recommended vehicles
const recommendedVehicles = [
  {
    id: 1,
    title: "2021 Tesla Model 3",
    image: "/placeholder.svg?height=400&width=600",
    price: 42999,
    matchScore: 98,
    features: ["Electric", "Autopilot", "Long Range"],
    predictedValue: { oneYear: 39500, threeYears: 35000 },
    monthlyCost: 620,
  },
  {
    id: 2,
    title: "2020 BMW X5",
    image: "/placeholder.svg?height=400&width=600",
    price: 55000,
    matchScore: 92,
    features: ["Luxury", "AWD", "Panoramic Roof"],
    predictedValue: { oneYear: 48000, threeYears: 40000 },
    monthlyCost: 850,
  },
  {
    id: 3,
    title: "2022 Toyota RAV4 Hybrid",
    image: "/placeholder.svg?height=400&width=600",
    price: 36500,
    matchScore: 90,
    features: ["Hybrid", "AWD", "Safety Sense"],
    predictedValue: { oneYear: 34000, threeYears: 30000 },
    monthlyCost: 520,
  },
  {
    id: 4,
    title: "2019 Honda Accord",
    image: "/placeholder.svg?height=400&width=600",
    price: 27500,
    matchScore: 87,
    features: ["Reliable", "Fuel Efficient", "Spacious"],
    predictedValue: { oneYear: 25000, threeYears: 22000 },
    monthlyCost: 410,
  },
  {
    id: 5,
    title: "2021 Ford Mustang GT",
    image: "/placeholder.svg?height=400&width=600",
    price: 48000,
    matchScore: 85,
    features: ["Performance", "V8", "Premium Sound"],
    predictedValue: { oneYear: 43000, threeYears: 37000 },
    monthlyCost: 720,
  },
  {
    id: 6,
    title: "2020 Subaru Outback",
    image: "/placeholder.svg?height=400&width=600",
    price: 32000,
    matchScore: 84,
    features: ["AWD", "Off-Road", "Reliable"],
    predictedValue: { oneYear: 29500, threeYears: 26000 },
    monthlyCost: 480,
  },
]

export default function RecommendationsPage() {
  const [priceRange, setPriceRange] = useState([20000, 60000])
  const [monthlyBudget, setMonthlyBudget] = useState([300, 800])
  const [preferences, setPreferences] = useState({
    fuelEfficiency: true,
    performance: false,
    luxury: false,
    technology: true,
    safety: true,
    reliability: true,
  })

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showBackButton backButtonHref="/" backButtonLabel="Home" />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">AI Recommendations</h1>
              <p className="text-muted-foreground">Personalized vehicle suggestions based on your preferences</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sliders className="mr-2 h-5 w-5" />
                    Your Preferences
                  </CardTitle>
                  <CardDescription>Adjust your preferences to get better recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Price Range</h3>
                      <Slider
                        defaultValue={[20000, 60000]}
                        max={100000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <span>${priceRange[0].toLocaleString()}</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Monthly Budget</h3>
                      <Slider
                        defaultValue={[300, 800]}
                        max={1500}
                        step={50}
                        value={monthlyBudget}
                        onValueChange={setMonthlyBudget}
                      />
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <span>${monthlyBudget[0]}/mo</span>
                        <span>${monthlyBudget[1]}/mo</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Vehicle Type</h3>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Type</SelectItem>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                          <SelectItem value="coupe">Coupe</SelectItem>
                          <SelectItem value="convertible">Convertible</SelectItem>
                          <SelectItem value="wagon">Wagon</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Fuel Type</h3>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Fuel Type</SelectItem>
                          <SelectItem value="gasoline">Gasoline</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                          <SelectItem value="plugin-hybrid">Plug-in Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium">Important Features</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fuel-efficiency" className="cursor-pointer">
                          Fuel Efficiency
                        </Label>
                        <Switch
                          id="fuel-efficiency"
                          checked={preferences.fuelEfficiency}
                          onCheckedChange={() => togglePreference("fuelEfficiency")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="performance" className="cursor-pointer">
                          Performance
                        </Label>
                        <Switch
                          id="performance"
                          checked={preferences.performance}
                          onCheckedChange={() => togglePreference("performance")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="luxury" className="cursor-pointer">
                          Luxury
                        </Label>
                        <Switch
                          id="luxury"
                          checked={preferences.luxury}
                          onCheckedChange={() => togglePreference("luxury")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="technology" className="cursor-pointer">
                          Technology
                        </Label>
                        <Switch
                          id="technology"
                          checked={preferences.technology}
                          onCheckedChange={() => togglePreference("technology")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="safety" className="cursor-pointer">
                          Safety
                        </Label>
                        <Switch
                          id="safety"
                          checked={preferences.safety}
                          onCheckedChange={() => togglePreference("safety")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reliability" className="cursor-pointer">
                          Reliability
                        </Label>
                        <Switch
                          id="reliability"
                          checked={preferences.reliability}
                          onCheckedChange={() => togglePreference("reliability")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Update Recommendations</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center text-primary mb-2">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      <span className="font-medium">Market Trend</span>
                    </div>
                    <p className="text-sm">
                      Electric vehicle prices are expected to decrease by 5-10% in the next 6 months due to increased
                      competition and new models entering the market.
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center text-primary mb-2">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span className="font-medium">Value Retention</span>
                    </div>
                    <p className="text-sm">
                      Toyota and Honda models in your price range typically retain 15% more value over 3 years compared
                      to other brands you're considering.
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center text-primary mb-2">
                      <DollarSign className="mr-2 h-4 w-4" />
                      <span className="font-medium">Cost Analysis</span>
                    </div>
                    <p className="text-sm">
                      Based on your driving habits, a hybrid vehicle could save you approximately $1,200 per year in
                      fuel costs compared to a traditional gasoline vehicle.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="best-match">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="best-match">Best Match</TabsTrigger>
                    <TabsTrigger value="value">Best Value</TabsTrigger>
                    <TabsTrigger value="budget">Budget Friendly</TabsTrigger>
                  </TabsList>
                  <Link href="/vehicles" className="text-sm text-primary flex items-center">
                    View all vehicles
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <TabsContent value="best-match" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {recommendedVehicles.map((vehicle) => (
                      <Card key={vehicle.id} className="overflow-hidden">
                        <div className="relative">
                          <div className="aspect-[4/3] overflow-hidden">
                            <Image
                              src={vehicle.image || "/placeholder.svg"}
                              alt={vehicle.title}
                              width={600}
                              height={400}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                            {vehicle.matchScore}% Match
                          </Badge>
                        </div>
                        <CardHeader className="p-4 pb-0">
                          <CardTitle className="text-lg">{vehicle.title}</CardTitle>
                          <CardDescription>${vehicle.price.toLocaleString()}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {vehicle.features.map((feature, index) => (
                              <Badge key={index} variant="outline">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Est. monthly:</span>
                              <span className="font-medium ml-1">${vehicle.monthlyCost}/mo</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Value in 1yr:</span>
                              <span className="font-medium ml-1">
                                ${vehicle.predictedValue.oneYear.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="value" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[...recommendedVehicles]
                      .sort((a, b) => {
                        const aValueRetention = a.predictedValue.threeYears / a.price
                        const bValueRetention = b.predictedValue.threeYears / b.price
                        return bValueRetention - aValueRetention
                      })
                      .slice(0, 4)
                      .map((vehicle) => (
                        <Card key={vehicle.id} className="overflow-hidden">
                          <div className="relative">
                            <div className="aspect-[4/3] overflow-hidden">
                              <Image
                                src={vehicle.image || "/placeholder.svg"}
                                alt={vehicle.title}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                              {Math.round((vehicle.predictedValue.threeYears / vehicle.price) * 100)}% Retention
                            </Badge>
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <CardTitle className="text-lg">{vehicle.title}</CardTitle>
                            <CardDescription>${vehicle.price.toLocaleString()}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {vehicle.features.map((feature, index) => (
                                <Badge key={index} variant="outline">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Value in 1yr:</span>
                                <span className="font-medium ml-1">
                                  ${vehicle.predictedValue.oneYear.toLocaleString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Value in 3yrs:</span>
                                <span className="font-medium ml-1">
                                  ${vehicle.predictedValue.threeYears.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button className="w-full">View Details</Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="budget" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[...recommendedVehicles]
                      .sort((a, b) => a.monthlyCost - b.monthlyCost)
                      .slice(0, 4)
                      .map((vehicle) => (
                        <Card key={vehicle.id} className="overflow-hidden">
                          <div className="relative">
                            <div className="aspect-[4/3] overflow-hidden">
                              <Image
                                src={vehicle.image || "/placeholder.svg"}
                                alt={vehicle.title}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                              ${vehicle.monthlyCost}/mo
                            </Badge>
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <CardTitle className="text-lg">{vehicle.title}</CardTitle>
                            <CardDescription>${vehicle.price.toLocaleString()}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {vehicle.features.map((feature, index) => (
                                <Badge key={index} variant="outline">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Down payment:</span>
                                <span className="font-medium ml-1">
                                  ${Math.round(vehicle.price * 0.1).toLocaleString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Monthly cost:</span>
                                <span className="font-medium ml-1">${vehicle.monthlyCost}/mo</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button className="w-full">View Details</Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

