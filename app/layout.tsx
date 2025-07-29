import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkyDeliver - Livraison par Drone",
  description: "Service de livraison ultra-rapide par drone. Recevez vos colis en 15-30 minutes.",
  keywords: ["livraison", "drone", "rapide", "colis", "transport"],
  authors: [{ name: "SkyDeliver Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <ErrorBoundary>
          <AuthProvider>
            <div className="min-h-full">{children}</div>
            <Toaster />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
