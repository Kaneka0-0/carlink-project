import { AuthProvider } from '@/lib/auth-context';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarLink - Your Vehicle Management Platform",
  description: "Manage your vehicles, track maintenance, and participate in auctions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="min-h-screen bg-background font-sans antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
