"use client"

import { ProtectedRoute } from '@/components/protected-route';

import {
  BarChart3,
  Bell,
  Calendar,
  Car,
  Clock,
  DollarSign,
  FileText,
  Fuel,
  LogOut,
  Plus,
  Settings,
  User,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



// Mock data for user dashboard
const userData = {
  name: "John Smith",
  email: "john.smith@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  vehicles: [
    {
      id: 1,
      title: "2019 Toyota Camry",
      image: "/placeholder.svg?height=200&width=300",
      lastService: "2023-02-15",
      fuelEfficiency: "32 mpg",
      nextServiceDue: "2023-08-15",
      expenses: [
        { id: 1, type: "Fuel", amount: 45.67, date: "2023-05-10" },
        { id: 2, type: "Maintenance", amount: 120.0, date: "2023-02-15" },
        { id: 3, type: "Insurance", amount: 95.5, date: "2023-04-01" },
      ],
      maintenanceRecords: [
        { id: 1, service: "Oil Change", date: "2023-02-15", mileage: 25000, cost: 65.0 },
        { id: 2, service: "Tire Rotation", date: "2023-02-15", mileage: 25000, cost: 55.0 },
        { id: 3, service: "Air Filter Replacement", date: "2022-11-10", mileage: 22500, cost: 25.0 },
      ],
      fuelRecords: [
        { id: 1, gallons: 12.5, cost: 45.67, mileage: 26500, date: "2023-05-10" },
        { id: 2, gallons: 11.8, cost: 42.33, mileage: 26100, date: "2023-04-25" },
        { id: 3, gallons: 12.2, cost: 43.91, mileage: 25700, date: "2023-04-10" },
      ],
    },
  ],
  watchlist: [
    {
      id: 1,
      title: "2021 Tesla Model 3",
      image: "/placeholder.svg?height=200&width=300",
      price: 42999,
      location: "San Francisco, CA",
      bidEndsIn: "2 days",
      isBidding: true,
    },
    {
      id: 2,
      title: "2020 BMW X5",
      image: "/placeholder.svg?height=200&width=300",
      price: 55000,
      location: "Los Angeles, CA",
      bidEndsIn: "",
      isBidding: false,
    },
  ],
  bids: [
    {
      id: 1,
      title: "2019 Audi Q7",
      image: "/placeholder.svg?height=200&width=300",
      price: 48500,
      bidAmount: 47000,
      bidStatus: "outbid",
      bidEndsIn: "1 day",
    },
    {
      id: 2,
      title: "2022 Ford Mustang GT",
      image: "/placeholder.svg?height=200&width=300",
      price: 52000,
      bidAmount: 51500,
      bidStatus: "winning",
      bidEndsIn: "3 days",
    },
  ],
  notifications: [
    { id: 1, message: "You've been outbid on 2019 Audi Q7", time: "2 hours ago", read: false },
    { id: 2, message: "Maintenance reminder: Oil change due for your Toyota Camry", time: "1 day ago", read: true },
    { id: 3, message: "New vehicles matching your search criteria are available", time: "2 days ago", read: true },
  ],
}

export default function DashboardPage() {
  const [activeVehicle, setActiveVehicle] = useState(userData.vehicles[0])
  const [activeLogTab, setActiveLogTab] = useState("maintenance")
  const [notifications, setNotifications] = useState(userData.notifications)

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <ProtectedRoute>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your vehicles, bids, and watchlist</p>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.some((n) => !n.read) && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex flex-col items-start p-3 ${!notification.read ? "bg-muted/50" : ""}`}
                    >
                      <div className="font-medium">{notification.message}</div>
                      <div className="text-xs text-muted-foreground">{notification.time}</div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No notifications</div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar>
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="vehicles">
          <TabsList className="grid grid-cols-4 w-full max-w-md mb-8">
            <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="bids">My Bids</TabsTrigger>
            <TabsTrigger value="logbook">Logbook</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{vehicle.title}</CardTitle>
                    <CardDescription>Last serviced: {vehicle.lastService}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
                        <span className="font-medium">{vehicle.fuelEfficiency}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Next Service</span>
                        <span className="font-medium">{vehicle.nextServiceDue}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Update Logbook</Button>
                  </CardFooter>
                </Card>
              ))}

              <Card className="overflow-hidden flex flex-col items-center justify-center h-full min-h-[300px]">
                <div className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-2">Add a Vehicle</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track maintenance, expenses, and more for your vehicles
                  </p>
                  <Button>Add Vehicle</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.watchlist.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.title} fill className="object-cover" />
                    {vehicle.isBidding && (
                      <Badge variant="secondary" className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm">
                        <Clock className="mr-1 h-3 w-3" />
                        Ends in {vehicle.bidEndsIn}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{vehicle.title}</CardTitle>
                    <CardDescription>{vehicle.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${vehicle.price.toLocaleString()}</div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                    <Button size="sm">{vehicle.isBidding ? "Place Bid" : "View Details"}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bids" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.bids.map((bid) => (
                <Card key={bid.id} className="overflow-hidden">
                  <div className="aspect-[3/2] relative">
                    <Image src={bid.image || "/placeholder.svg"} alt={bid.title} fill className="object-cover" />
                    <Badge
                      variant={bid.bidStatus === "winning" ? "default" : "destructive"}
                      className="absolute top-2 right-2"
                    >
                      {bid.bidStatus === "winning" ? "Winning" : "Outbid"}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{bid.title}</CardTitle>
                    <CardDescription>Ends in {bid.bidEndsIn}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Price</span>
                        <span className="font-bold">${bid.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Your Bid</span>
                        <span>${bid.bidAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{bid.bidStatus === "winning" ? "Increase Bid" : "Place New Bid"}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logbook" className="space-y-6">
            {userData.vehicles.length > 0 ? (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vehicle</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.vehicles.map((vehicle) => (
                          <div
                            key={vehicle.id}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                              activeVehicle.id === vehicle.id ? "bg-muted" : "hover:bg-muted/50"
                            }`}
                            onClick={() => setActiveVehicle(vehicle)}
                          >
                            <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={vehicle.image || "/placeholder.svg"}
                                alt={vehicle.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{vehicle.title}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Next Service</div>
                            <div className="font-medium">{activeVehicle.nextServiceDue}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Fuel className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Fuel Efficiency</div>
                            <div className="font-medium">{activeVehicle.fuelEfficiency}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Wrench className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Last Service</div>
                            <div className="font-medium">{activeVehicle.lastService}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <DollarSign className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Total Expenses</div>
                            <div className="font-medium">
                              ${activeVehicle.expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Export Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Export your vehicle logbook data in various formats
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Export as PDF
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Export as CSV
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Vehicle Logbook</CardTitle>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Entry
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={activeLogTab} onValueChange={setActiveLogTab}>
                        <TabsList className="grid grid-cols-3 mb-4">
                          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                          <TabsTrigger value="fuel">Fuel</TabsTrigger>
                          <TabsTrigger value="expenses">Expenses</TabsTrigger>
                        </TabsList>

                        <TabsContent value="maintenance" className="space-y-4">
                          <div className="rounded-md border">
                            <div className="grid grid-cols-5 p-3 font-medium bg-muted/50">
                              <div>Service</div>
                              <div>Date</div>
                              <div>Mileage</div>
                              <div>Cost</div>
                              <div></div>
                            </div>
                            <Separator />
                            {activeVehicle.maintenanceRecords.map((record) => (
                              <div key={record.id} className="grid grid-cols-5 p-3 items-center">
                                <div>{record.service}</div>
                                <div>{record.date}</div>
                                <div>{record.mileage.toLocaleString()} mi</div>
                                <div>${record.cost.toFixed(2)}</div>
                                <div className="flex justify-end">
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="fuel" className="space-y-4">
                          <div className="rounded-md border">
                            <div className="grid grid-cols-5 p-3 font-medium bg-muted/50">
                              <div>Date</div>
                              <div>Gallons</div>
                              <div>Cost</div>
                              <div>Mileage</div>
                              <div></div>
                            </div>
                            <Separator />
                            {activeVehicle.fuelRecords.map((record) => (
                              <div key={record.id} className="grid grid-cols-5 p-3 items-center">
                                <div>{record.date}</div>
                                <div>{record.gallons.toFixed(1)}</div>
                                <div>${record.cost.toFixed(2)}</div>
                                <div>{record.mileage.toLocaleString()} mi</div>
                                <div className="flex justify-end">
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="expenses" className="space-y-4">
                          <div className="rounded-md border">
                            <div className="grid grid-cols-4 p-3 font-medium bg-muted/50">
                              <div>Type</div>
                              <div>Date</div>
                              <div>Amount</div>
                              <div></div>
                            </div>
                            <Separator />
                            {activeVehicle.expenses.map((expense) => (
                              <div key={expense.id} className="grid grid-cols-4 p-3 items-center">
                                <div>{expense.type}</div>
                                <div>{expense.date}</div>
                                <div>${expense.amount.toFixed(2)}</div>
                                <div className="flex justify-end">
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Expense Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
                        <BarChart3 className="h-16 w-16 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Expense chart visualization</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Vehicles Added</h3>
                <p className="text-muted-foreground mb-6">
                  Add a vehicle to start tracking maintenance, fuel, and expenses
                </p>
                <Button>Add Your First Vehicle</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}

