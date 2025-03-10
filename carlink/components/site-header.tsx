"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

interface SiteHeaderProps {
  showBackButton?: boolean
  backButtonLabel?: string
  backButtonHref?: string
}

export function SiteHeader({ showBackButton = false, backButtonLabel = "Back", backButtonHref }: SiteHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backButtonHref) {
      // Do nothing, the Link component will handle navigation
    } else {
      router.back()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          {showBackButton &&
            (backButtonHref ? (
              <Link
                href={backButtonHref}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {/* {backButtonLabel} */}
              </Link>
            ) : (
              <button
                onClick={handleBack}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {/* {backButtonLabel} */}
              </button>
            ))}
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
            <Link href="/auctions" className="text-muted-foreground hover:text-foreground transition-colors">
              Auctions
            </Link>
            <Link href="/recommendations" className="text-muted-foreground hover:text-foreground transition-colors">
              AI 
            </Link>
            <Link href="/logbook" className="text-muted-foreground hover:text-foreground transition-colors">
              Logbook
            </Link>
          </nav>
        </div>
        {/* <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/auth/sign-in">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div> */}
      </div>
    </header>
  )
}