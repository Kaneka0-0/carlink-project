"use client"
import { BarChart3, Calendar, Car, Clock, DollarSign, Fuel, Plus, Wrench } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for user vehicles
const vehiclesData = [
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
  {
    id: 2,
    title: "2021 Honda CR-V",
    image: "/placeholder.svg?height=200&width=300",
    lastService: "2023-03-20",
    fuelEfficiency: "28 mpg",
    nextServiceDue: "2023-09-20",
    expenses: [
      { id: 1, type: "Fuel", amount: 52.3, date: "2023-05-15" },
      { id: 2, type: "Maintenance", amount: 95.0, date: "2023-03-20" },
      { id: 3, type: "Insurance", amount: 110.75, date: "2023-04-01" },
    ],
    maintenanceRecords: [
      { id: 1, service: "Oil Change", date: "2023-03-20", mileage: 12000, cost: 55.0 },
      { id: 2, service: "Tire Rotation", date: "2023-03-20", mileage: 12000, cost: 40.0 },
    ],
    fuelRecords: [
      { id: 1, gallons: 14.2, cost: 52.3, mileage: 13500, date: "2023-05-15" },
      { id: 2, gallons: 13.8, cost: 49.68, mileage: 13100, date: "2023-04-30" },
    ],
  },
]

export default function LogbookPage() {
  const [vehicles, setVehicles] = useState(vehiclesData)
  const [activeVehicle, setActiveVehicle] = useState(vehiclesData[0])
  const [activeLogTab, setActiveLogTab] = useState("maintenance")
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false)
  const [entryType, setEntryType] = useState("maintenance")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showBackButton backButtonHref="/" backButtonLabel="Home" />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Vehicle Logbook</h1>
              <p className="text-muted-foreground">Track maintenance, expenses, and more for your vehicles</p>
            </div>
            <Dialog open={isAddEntryOpen} onOpenChange={setIsAddEntryOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Entry</DialogTitle>
                  <DialogDescription>
                    Record a new maintenance, fuel, or expense entry for your vehicle.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="entry-type">Entry Type</Label>
                    <Select value={entryType} onValueChange={setEntryType}>
                      <SelectTrigger id="entry-type">
                        <SelectValue placeholder="Select entry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="fuel">Fuel</SelectItem>
                        <SelectItem value="expense">Other Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="vehicle">Vehicle</Label>
                    <Select defaultValue={activeVehicle.id.toString()}>
                      <SelectTrigger id="vehicle">
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                            {vehicle.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {entryType === "maintenance" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="service">Service Type</Label>
                        <Input id="service" placeholder="e.g., Oil Change, Tire Rotation" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cost">Cost ($)</Label>
                          <Input id="cost" type="number" placeholder="0.00" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="mileage">Mileage</Label>
                        <Input id="mileage" type="number" placeholder="Current mileage" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Input id="notes" placeholder="Any additional details" />
                      </div>
                    </>
                  )}

                  {entryType === "fuel" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="gallons">Gallons</Label>
                          <Input id="gallons" type="number" step="0.01" placeholder="0.00" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="cost">Total Cost ($)</Label>
                          <Input id="cost" type="number" step="0.01" placeholder="0.00" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="mileage">Mileage</Label>
                          <Input id="mileage" type="number" placeholder="Current mileage" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="station">Gas Station (Optional)</Label>
                        <Input id="station" placeholder="e.g., Shell, Chevron" />
                      </div>
                    </>
                  )}

                  {entryType === "expense" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="expense-type">Expense Type</Label>
                        <Select defaultValue="insurance">
                          <SelectTrigger id="expense-type">
                            <SelectValue placeholder="Select expense type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="registration">Registration</SelectItem>
                            <SelectItem value="parking">Parking</SelectItem>
                            <SelectItem value="tolls">Tolls</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="amount">Amount ($)</Label>
                          <Input id="amount" type="number" step="0.01" placeholder="0.00" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="Brief description of the expense" />
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddEntryOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddEntryOpen(false)}>Save Entry</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {vehicles.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Vehicles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vehicles.map((vehicle) => (
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
                            <div className="text-sm text-muted-foreground">Next service: {vehicle.nextServiceDue}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Vehicle
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Summary</CardTitle>
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
                    <CardTitle>Upcoming Reminders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <div className="font-medium">Oil Change Due</div>
                          <div className="text-sm text-muted-foreground">Due in 2 weeks for {activeVehicle.title}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">Registration Renewal</div>
                          <div className="text-sm text-muted-foreground">Due in 45 days for {activeVehicle.title}</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Reminder
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Logbook Entries</CardTitle>
                      <Button onClick={() => setIsAddEntryOpen(true)}>
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
                    <CardDescription>Track your vehicle expenses over time</CardDescription>
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
        </div>
      </main>
    </div>
  )
}

