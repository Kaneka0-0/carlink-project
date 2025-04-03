import { addVehicle, getVehicles } from '@/lib/firebase-utils'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateYearRange(startYear: number, endYear: number) {
  const years = []
  for (let year = startYear; year >= endYear; year--) {
    years.push(year)
  }
  return years
}

export const YEAR_RANGE = generateYearRange(2025, 1800)

// // Get vehicles
// const vehicles = await getVehicles()

// // Add a vehicle
// await addVehicle(vehicleData)

const vehicleData = {
  title: 'Test Car',
  price: 25000,
  seller: 'John Doe',
  location: 'Phnom Penh',
  image: '',
  year: 2023,
  mileage: 40000,
  isBidding: false
};

export async function saveNewVehicle(vehicleData) {
  await addVehicle(vehicleData);
}

// await addVehicle(vehicleData);

