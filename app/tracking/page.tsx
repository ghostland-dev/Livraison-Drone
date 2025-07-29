"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Package, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TrackingSearchPage() {
  const [trackingId, setTrackingId] = useState("")
  const [recentOrders, setRecentOrders] = useState<string[]>([])

  useEffect(() => {
    // Load recent orders from localStorage
    const recent = JSON.parse(localStorage.getItem("recentOrders") || "[]")
    setRecentOrders(recent.slice(0, 3))
  }, [])

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingId.trim()) {
      window.location.href = `/tracking/${trackingId}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SkyDeliver</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/tracking" className="text-blue-600 font-medium">
                Track Order
              </Link>
              <Link href="/history" className="text-gray-600 hover:text-gray-900">
                Order History
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
            </nav>
            <Button asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Delivery</h1>
          <p className="text-xl text-gray-600">Enter your order ID to see real-time delivery status</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Track Order</span>
            </CardTitle>
            <CardDescription>Enter your order ID or tracking number</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tracking">Order ID / Tracking Number</Label>
                <Input
                  id="tracking"
                  placeholder="e.g., ORD-ABC123 or SKY-XYZ789"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Track Order
              </Button>
            </form>
          </CardContent>
        </Card>

        {recentOrders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Quick access to your recent deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentOrders.map((orderId) => (
                  <Button key={orderId} variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href={`/tracking/${orderId}`}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Order {orderId}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
