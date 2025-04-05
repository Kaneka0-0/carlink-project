"use client"

import { useAuth } from '@/lib/auth-context';
import { Car, ChevronRight, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FeaturedVehicles } from "@/components/featured-vehicles";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Image
                src="/image/logo1.png"
                alt="CARLINK Logo"
                width={100}
                height={30}
                priority
              />
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/vehicles" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse
              </Link>
              <Link href="/auction" className="text-muted-foreground hover:text-foreground transition-colors">
                Auctions
              </Link>
              <Link href="/ai" className="text-muted-foreground hover:text-foreground transition-colors">
                AI
              </Link>
              <Link href="/logbook" className="text-muted-foreground hover:text-foreground transition-colors">
                Logbook
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/image/banner.jpg?height=800&width=1600"
              alt="Luxury car"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
          </div>
          <div className="container relative z-10 py-24 md:py-32">
            <div className="max-w-2xl space-y-6 text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Find Your Perfect Ride</h1>
              <p className="text-lg md:text-xl">
                Browse thousands of quality vehicles, connect with trusted sellers, and drive away with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Vehicles
                </Button>
                <Link href="/sell">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-background/20 hover:bg-background/30"
                  >
                    Sell Your Car
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="rounded-xl border bg-background/60 p-6 shadow-lg backdrop-blur-md backdrop-filter bg-gradient-to-b from-gray-900/60 to-gray-900/20 hover:bg-background/80 transition-all duration- 300">
          {/* change latter */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Find Your Next Vehicle</h2>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label htmlFor="make" className="text-sm font-medium">
                    Make
                  </label>
                  <select
                    id="make"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Any Make</option>
                    <option value="audi">Audi</option>
                    <option value="bmw">BMW</option>
                    <option value="ford">Ford</option>
                    <option value="honda">Honda</option>
                    <option value="toyota">Toyota</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="model" className="text-sm font-medium">
                    Model
                  </label>
                  <select
                    id="model"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Any Model</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Max Price
                  </label>
                  <select
                    id="price"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">No Limit</option>
                    <option value="10000">$10,000</option>
                    <option value="25000">$25,000</option>
                    <option value="50000">$50,000</option>
                    <option value="100000">$100,000</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    min="1800"
                    max="2025"
                    placeholder="Enter year (1800-2025)"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Vehicles</h2>
              <p className="text-muted-foreground">Discover our handpicked selection of premium vehicles</p>
            </div>
            <Link href="/vehicles" className="flex items-center text-primary">
              View all vehicles
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <FeaturedVehicles />
        </section>

        <section className="container py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">AI-Powered Recommendations</h2>
              <p className="text-muted-foreground mb-6">
                Our intelligent system learns your preferences to suggest vehicles that match your needs and budget.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Suggestions</h3>
                    <p className="text-muted-foreground">Based on your browsing history and preferences</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Cost Predictions</h3>
                    <p className="text-muted-foreground">Estimated maintenance, fuel, and insurance costs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Market Value Analysis</h3>
                    <p className="text-muted-foreground">Real-time data on vehicle depreciation and market trends</p>
                  </div>
                </li>
              </ul>
              <Link href="/recommendations">
                <Button className="mt-6">Get Recommendations</Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="AI recommendations dashboard"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Browse</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/vehicles" className="text-muted-foreground hover:text-foreground transition-colors">
                    All Vehicles
                  </Link>
                </li>
                <li>
                  <Link href="/auction" className="text-muted-foreground hover:text-foreground transition-colors">
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recommendations"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    AI Recommendations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/sign-up" className="text-muted-foreground hover:text-foreground transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/logbook" className="text-muted-foreground hover:text-foreground transition-colors">
                    Vehicle Logbook
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              <span className="font-bold">CARLINK</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CARLINK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

