"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Zap, Battery, Clock, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DronePosition {
  lat: number
  lng: number
  altitude: number
  speed: number
  battery: number
  heading: number
}

interface MapProps {
  orderId: string
  pickupLocation: { lat: number; lng: number; address: string }
  deliveryLocation: { lat: number; lng: number; address: string }
  droneId: string
}

export function RealTimeMap({ orderId, pickupLocation, deliveryLocation, droneId }: MapProps) {
  const [dronePosition, setDronePosition] = useState<DronePosition>({
    lat: 48.8566,
    lng: 2.3522,
    altitude: 120,
    speed: 45,
    battery: 85,
    heading: 45,
  })
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time drone movement
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setDronePosition((prev) => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        altitude: Math.max(80, Math.min(150, prev.altitude + (Math.random() - 0.5) * 10)),
        speed: Math.max(30, Math.min(60, prev.speed + (Math.random() - 0.5) * 5)),
        battery: Math.max(0, prev.battery - 0.1),
        heading: (prev.heading + (Math.random() - 0.5) * 20) % 360,
      }))
      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const distanceToDestination = calculateDistance(
    dronePosition.lat,
    dronePosition.lng,
    deliveryLocation.lat,
    deliveryLocation.lng,
  )

  const estimatedArrival = new Date(Date.now() + (distanceToDestination / dronePosition.speed) * 60 * 60 * 1000)

  return (
    <div className="space-y-6">
      {/* Live Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            <span className="text-sm font-medium text-gray-900">{isLive ? "Suivi en direct" : "Hors ligne"}</span>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Drone {droneId}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">Dernière mise à jour : {lastUpdate.toLocaleTimeString()}</div>
      </div>

      {/* Interactive Map */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Carte en temps réel
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              Arrivée estimée : {estimatedArrival.toLocaleTimeString()}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 h-80">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Grid pattern */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Streets */}
                <path d="M 0 100 L 400 100" stroke="#64748b" strokeWidth="2" opacity="0.3" />
                <path d="M 0 200 L 400 200" stroke="#64748b" strokeWidth="2" opacity="0.3" />
                <path d="M 100 0 L 100 300" stroke="#64748b" strokeWidth="2" opacity="0.3" />
                <path d="M 300 0 L 300 300" stroke="#64748b" strokeWidth="2" opacity="0.3" />
              </svg>
            </div>

            {/* Pickup Location */}
            <div className="absolute top-16 left-16 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                  Point de collecte
                </div>
              </div>
            </div>

            {/* Delivery Location */}
            <div className="absolute bottom-16 right-16 transform translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                  Destination
                </div>
              </div>
            </div>

            {/* Drone Position */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ease-linear"
              style={{
                left: `${40 + (dronePosition.lng - 2.3522) * 5000}%`,
                top: `${50 + (dronePosition.lat - 48.8566) * 5000}%`,
              }}
            >
              <div className="relative">
                {/* Drone Icon */}
                <div
                  className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform transition-transform duration-500"
                  style={{ rotate: `${dronePosition.heading}deg` }}
                >
                  <Navigation className="h-4 w-4 text-white" />
                </div>

                {/* Pulse Animation */}
                <div className="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full animate-ping opacity-30" />

                {/* Info Popup */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap border">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">Drone {droneId}</div>
                    <div className="text-gray-600">{Math.round(dronePosition.speed)} km/h</div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                </div>
              </div>
            </div>

            {/* Flight Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M 64 64 Q 200 150 336 240"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                strokeDasharray="10,5"
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Gauge className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Vitesse</p>
                <p className="text-lg font-semibold">{Math.round(dronePosition.speed)} km/h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Navigation className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Altitude</p>
                <p className="text-lg font-semibold">{Math.round(dronePosition.altitude)}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Battery className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Batterie</p>
                <div className="flex items-center space-x-2">
                  <Progress value={dronePosition.battery} className="h-2 flex-1" />
                  <span className="text-sm font-semibold">{Math.round(dronePosition.battery)}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Distance restante</p>
                <p className="text-lg font-semibold">{distanceToDestination.toFixed(1)} km</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Updates Feed */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Mises à jour en direct
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse" />
              <div>
                <p className="text-sm font-medium">Position mise à jour</p>
                <p className="text-xs text-gray-600">
                  Drone à {Math.round(dronePosition.altitude)}m d'altitude, vitesse {Math.round(dronePosition.speed)}{" "}
                  km/h
                </p>
                <p className="text-xs text-gray-500">{lastUpdate.toLocaleTimeString()}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Conditions météo optimales</p>
                <p className="text-xs text-gray-600">Vent faible, visibilité excellente</p>
                <p className="text-xs text-gray-500">Il y a 3 minutes</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
              <div>
                <p className="text-sm font-medium">Ajustement de trajectoire</p>
                <p className="text-xs text-gray-600">Évitement d'obstacle détecté</p>
                <p className="text-xs text-gray-500">Il y a 5 minutes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
