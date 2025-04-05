"use client"

import { getVehicles } from "@/lib/firebase-utils"
import { Vehicle } from "@/types/vehicle"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { VehicleList } from "@/components/vehicle-list"

export default function VehiclePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true)
        const data = await getVehicles()
        console.log('Fetched vehicles:', data) // Debug log
        setVehicles(data)
      } catch (error) {
        console.error('Error loading vehicles:', error)
        toast.error('Failed to load vehicles')
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicles()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Vehicles</h1>
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading vehicles...</p>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No vehicles found. Add your first vehicle!</p>
        </div>
      ) : (
        <VehicleList vehicles={vehicles} />
      )}
    </div>
  )
}

