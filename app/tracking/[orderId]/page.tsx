"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  User,
  Phone,
  MessageCircle,
  Share2,
  Download,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import { RealTimeMap } from "@/components/real-time-map"

interface OrderStatus {
  id: string
  status: "preparing" | "dispatched" | "in-transit" | "delivered" | "cancelled"
  pickupAddress: string
  deliveryAddress: string
  packageType: string
  weight: string
  cost: string
  estimatedTime: string
  actualTime?: string
  droneId?: string
  driverName?: string
  driverPhone?: string
  timeline: Array<{
    status: string
    time: string
    description: string
    completed: boolean
  }>
  currentLocation?: {
    lat: number
    lng: number
  }
}

export default function TrackingPage() {
  const params = useParams()
  const orderId = params.orderId as string
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading order data
    setTimeout(() => {
      const mockOrder: OrderStatus = {
        id: orderId,
        status: "in-transit",
        pickupAddress: "123 Rue de la Paix, 75001 Paris",
        deliveryAddress: "456 Avenue des Champs-Élysées, 75008 Paris",
        packageType: "Documents",
        weight: "0.5kg",
        cost: "12.50€",
        estimatedTime: "15 minutes",
        droneId: "SKY-D001",
        driverName: "Drone Autonome",
        driverPhone: "+33 1 23 45 67 89",
        timeline: [
          {
            status: "Commande confirmée",
            time: "14:30",
            description: "Votre commande a été confirmée et le paiement traité",
            completed: true,
          },
          {
            status: "Préparation",
            time: "14:32",
            description: "Votre colis est en cours de préparation",
            completed: true,
          },
          {
            status: "Drone dispatché",
            time: "14:35",
            description: "Le drone SKY-D001 a été dispatché pour la collecte",
            completed: true,
          },
          {
            status: "En transit",
            time: "14:38",
            description: "Votre colis est en cours de livraison",
            completed: true,
          },
          {
            status: "Livraison",
            time: "14:45",
            description: "Livraison prévue à votre adresse",
            completed: false,
          },
        ],
        currentLocation: {
          lat: 48.8566,
          lng: 2.3522,
        },
      }
      setOrder(mockOrder)
      setLoading(false)
    }, 1000)
  }, [orderId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "dispatched":
        return "bg-blue-100 text-blue-800"
      case "in-transit":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "En préparation"
      case "dispatched":
        return "Drone dispatché"
      case "in-transit":
        return "En transit"
      case "delivered":
        return "Livré"
      case "cancelled":
        return "Annulé"
      default:
        return status
    }
  }

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "preparing":
        return 25
      case "dispatched":
        return 50
      case "in-transit":
        return 75
      case "delivered":
        return 100
      default:
        return 0
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Chargement du suivi</h2>
              <p className="text-gray-600">Récupération des informations de votre commande...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md text-center">
              <CardContent className="pt-6">
                <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Commande introuvable</h3>
                <p className="text-gray-600 mb-4">Nous n'avons pas trouvé de commande avec l'ID {orderId}</p>
                <Button asChild>
                  <Link href="/tracking">Rechercher une autre commande</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/tracking">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Suivi de commande</h1>
              <p className="text-gray-600">Commande #{order.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Statut de la livraison</CardTitle>
                      <CardDescription>Dernière mise à jour il y a 2 minutes</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)} variant="secondary">
                    {getStatusText(order.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progression</span>
                    <span>{getProgressPercentage(order.status)}%</span>
                  </div>
                  <Progress value={getProgressPercentage(order.status)} className="h-3" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Collecte</p>
                        <p className="text-sm text-gray-600">{order.pickupAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Livraison</p>
                        <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type de colis</span>
                      <span className="text-sm font-medium">{order.packageType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Poids</span>
                      <span className="text-sm font-medium">{order.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Coût</span>
                      <span className="text-sm font-medium">{order.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Temps estimé</span>
                      <span className="text-sm font-medium">{order.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Map */}
            <RealTimeMap
              orderId={order.id}
              pickupLocation={{
                lat: 48.8566,
                lng: 2.3522,
                address: order.pickupAddress,
              }}
              deliveryLocation={{
                lat: 48.8738,
                lng: 2.295,
                address: order.deliveryAddress,
              }}
              droneId={order.droneId || "SKY-D001"}
            />

            {/* Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Historique de la commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          event.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {event.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${event.completed ? "text-gray-900" : "text-gray-500"}`}>
                            {event.status}
                          </h4>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Drone Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Informations du drone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.droneId}</p>
                    <p className="text-sm text-gray-600">Drone autonome</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Vitesse</span>
                    <span className="text-sm font-medium">45 km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Altitude</span>
                    <span className="text-sm font-medium">120m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Batterie</span>
                    <span className="text-sm font-medium text-green-600">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Support client
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Une question sur votre livraison ? Notre équipe est là pour vous aider.
                </p>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    {order.driverPhone}
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat en direct
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/">
                    <Package className="h-4 w-4 mr-2" />
                    Nouvelle commande
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/history">
                    <Clock className="h-4 w-4 mr-2" />
                    Historique
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/support">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
