'use client';

import { Card } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Vehicle } from "@/types/vehicle";
import Image from "next/image";
import Link from "next/link";

interface VehicleListProps {
  vehicles: Vehicle[];
}

export function VehicleList({ vehicles }: VehicleListProps) {
  if (!vehicles.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No vehicles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
              <Image
                src={vehicle.imageUrl}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <div className="mt-2 space-y-1">
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(vehicle.price)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatNumber(vehicle.mileage)} miles • {vehicle.location}
                </p>
                <p className="text-sm">
                  {vehicle.transmission} • {vehicle.fuelType}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
} 