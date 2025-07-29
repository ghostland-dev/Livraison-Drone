"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Package, CreditCard, Shield, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    zip: "",
  })

  const orderSummary = {
    subtotal: 8.0,
    deliveryFee: 2.0,
    tax: 0.8,
    total: 10.8,
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const orderId = urlParams.get("order")

    if (orderId) {
      const pendingOrder = localStorage.getItem("pendingOrder")
      if (pendingOrder) {
        const orderData = JSON.parse(pendingOrder)
        // You can use this order data to populate order summary
      }
    }
  }, [])

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)
    const orderId = urlParams.get("order")

    if (orderId) {
      // Move order from pending to current
      const pendingOrder = localStorage.getItem("pendingOrder")
      if (pendingOrder) {
        const orderData = JSON.parse(pendingOrder)
        orderData.status = "preparing"
        localStorage.setItem("currentOrder", JSON.stringify(orderData))
        localStorage.removeItem("pendingOrder")

        // Add to recent orders
        const recentOrders = JSON.parse(localStorage.getItem("recentOrders") || "[]")
        recentOrders.unshift(orderId)
        localStorage.setItem("recentOrders", JSON.stringify(recentOrders.slice(0, 5)))
      }
    }

    alert("Payment processed successfully! Your drone is being dispatched.")
    window.location.href = `/tracking/${orderId || "ORD-" + Math.random().toString(36).substr(2, 6)}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SkyDeliver</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h1>
          <p className="text-gray-600">Complete your drone delivery order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Information</span>
                </CardTitle>
                <CardDescription>Your payment is secured with 256-bit SSL encryption</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        type="button"
                        variant={paymentMethod === "card" ? "default" : "outline"}
                        className="h-12"
                        onClick={() => setPaymentMethod("card")}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Card
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === "paypal" ? "default" : "outline"}
                        className="h-12"
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        PayPal
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === "apple" ? "default" : "outline"}
                        className="h-12"
                        onClick={() => setPaymentMethod("apple")}
                      >
                        Apple Pay
                      </Button>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <>
                      <Separator />

                      {/* Card Details */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardForm.number}
                            onChange={(e) => setCardForm((prev) => ({ ...prev, number: e.target.value }))}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={cardForm.expiry}
                              onChange={(e) => setCardForm((prev) => ({ ...prev, expiry: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cardForm.cvv}
                              onChange={(e) => setCardForm((prev) => ({ ...prev, cvv: e.target.value }))}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardForm.name}
                            onChange={(e) => setCardForm((prev) => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zip">Billing ZIP Code</Label>
                          <Input
                            id="zip"
                            placeholder="12345"
                            value={cardForm.zip}
                            onChange={(e) => setCardForm((prev) => ({ ...prev, zip: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment</p>
                      <Button type="submit" className="w-full">
                        Continue with PayPal
                      </Button>
                    </div>
                  )}

                  {paymentMethod === "apple" && (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Use Touch ID or Face ID to pay with Apple Pay</p>
                      <Button type="submit" className="w-full">
                        Pay with Apple Pay
                      </Button>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <Button type="submit" className="w-full" size="lg">
                      <Lock className="h-4 w-4 mr-2" />
                      Complete Payment
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Your payment is secure</h3>
                    <p className="text-sm text-gray-600">
                      We use industry-standard encryption to protect your payment information. Your card details are
                      never stored on our servers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Delivery Service</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${orderSummary.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${orderSummary.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Express Delivery</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Estimated delivery time: 15-20 minutes</p>
                  <p className="text-sm text-gray-600">Package weight: 1.2kg</p>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input placeholder="Enter promo code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
