"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Package,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  Calendar,
  CreditCard,
  Users,
  Zap,
  Gift,
  ArrowRight,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"

interface DashboardStats {
  totalOrders: number
  totalSpent: number
  averageDeliveryTime: number
  carbonSaved: number
  favoriteLocation: string
  memberSince: string
  loyaltyPoints: number
  nextLevelPoints: number
}

interface RecentOrder {
  id: string
  date: string
  status: "delivered" | "in-transit" | "preparing"
  from: string
  to: string
  cost: number
  rating?: number
  estimatedTime: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [activeDeliveries, setActiveDeliveries] = useState<RecentOrder[]>([])

  useEffect(() => {
    // Simulate loading dashboard data
    const mockStats: DashboardStats = {
      totalOrders: 47,
      totalSpent: 423.5,
      averageDeliveryTime: 18,
      carbonSaved: 12.3,
      favoriteLocation: "123 Rue de la Paix, Paris",
      memberSince: "2023-06-15",
      loyaltyPoints: 1250,
      nextLevelPoints: 1500,
    }

    const mockRecentOrders: RecentOrder[] = [
      {
        id: "ORD-001",
        date: "2024-01-15",
        status: "delivered",
        from: "Restaurant Le Gourmet",
        to: "123 Rue de la Paix",
        cost: 12.5,
        rating: 5,
        estimatedTime: "15 min",
      },
      {
        id: "ORD-002",
        date: "2024-01-14",
        status: "delivered",
        from: "Pharmacie Central",
        to: "456 Avenue des Champs",
        cost: 8.0,
        rating: 4,
        estimatedTime: "20 min",
      },
      {
        id: "ORD-003",
        date: "2024-01-13",
        status: "delivered",
        from: "Bureau de Poste",
        to: "789 Boulevard Saint-Germain",
        cost: 15.0,
        rating: 5,
        estimatedTime: "12 min",
      },
    ]

    const mockActiveDeliveries: RecentOrder[] = [
      {
        id: "ORD-004",
        date: "2024-01-15",
        status: "in-transit",
        from: "Librairie Moderne",
        to: "123 Rue de la Paix",
        cost: 10.0,
        estimatedTime: "8 min",
      },
    ]

    setStats(mockStats)
    setRecentOrders(mockRecentOrders)
    setActiveDeliveries(mockActiveDeliveries)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Livré"
      case "in-transit":
        return "En transit"
      case "preparing":
        return "En préparation"
      default:
        return status
    }
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Chargement du tableau de bord</h2>
              <p className="text-gray-600">Récupération de vos données...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const loyaltyProgress = (stats.loyaltyPoints / stats.nextLevelPoints) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour ! 👋</h1>
              <p className="text-gray-600">Bienvenue sur votre tableau de bord SkyDeliver</p>
            </div>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              asChild
            >
              <Link href="/">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle livraison
              </Link>
            </Button>
          </div>
        </div>

        {/* Active Deliveries Alert */}
        {activeDeliveries.length > 0 && (
          <div className="mb-8">
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Livraison en cours</h3>
                      <p className="text-gray-600">
                        Votre commande {activeDeliveries[0].id} arrive dans {activeDeliveries[0].estimatedTime}
                      </p>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/tracking/${activeDeliveries[0].id}`}>
                      Suivre
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total des commandes</CardTitle>
              <Package className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs opacity-90">+12% ce mois-ci</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total dépensé</CardTitle>
              <CreditCard className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSpent.toFixed(2)}€</div>
              <p className="text-xs opacity-90">Économies: 89€</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Temps moyen</CardTitle>
              <Clock className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageDeliveryTime} min</div>
              <p className="text-xs opacity-90">-3 min vs mois dernier</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">CO₂ économisé</CardTitle>
              <TrendingUp className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.carbonSaved} kg</div>
              <p className="text-xs opacity-90">Impact positif</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Commandes récentes
                    </CardTitle>
                    <CardDescription>Vos dernières livraisons effectuées</CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/history">Voir tout</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{order.id}</h4>
                          <p className="text-sm text-gray-600">{order.from}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.date).toLocaleDateString("fr-FR")} • {order.estimatedTime}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{order.cost.toFixed(2)}€</p>
                        <Badge className={getStatusColor(order.status)} variant="secondary">
                          {getStatusText(order.status)}
                        </Badge>
                        {order.rating && (
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < order.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Activité mensuelle
                </CardTitle>
                <CardDescription>Vos livraisons des 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Graphique d'activité</p>
                    <p className="text-sm text-gray-500">Tendance croissante de +25%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Loyalty Program */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <Gift className="h-5 w-5 mr-2" />
                  Programme de fidélité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-800 mb-2">{stats.loyaltyPoints}</div>
                  <p className="text-sm text-orange-700">points disponibles</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-orange-700">Niveau Gold</span>
                    <span className="text-orange-700">
                      {stats.loyaltyPoints}/{stats.nextLevelPoints}
                    </span>
                  </div>
                  <Progress value={loyaltyProgress} className="h-2" />
                  <p className="text-xs text-orange-600 mt-2">
                    {stats.nextLevelPoints - stats.loyaltyPoints} points pour Platinum
                  </p>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  asChild
                >
                  <Link href="/rewards">Voir les récompenses</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  asChild
                >
                  <Link href="/">
                    <Package className="h-4 w-4 mr-2" />
                    Nouvelle livraison
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/tracking">
                    <MapPin className="h-4 w-4 mr-2" />
                    Suivre une commande
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/schedule">
                    <Calendar className="h-4 w-4 mr-2" />
                    Programmer une livraison
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/referral">
                    <Users className="h-4 w-4 mr-2" />
                    Parrainer un ami
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Informations compte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Membre depuis</p>
                  <p className="text-sm text-gray-600">
                    {new Date(stats.memberSince).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Adresse favorite</p>
                  <p className="text-sm text-gray-600">{stats.favoriteLocation}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Statut</p>
                  <Badge className="bg-yellow-100 text-yellow-800">Membre Gold</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Eco Impact */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Impact écologique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800 mb-1">{stats.carbonSaved} kg</div>
                  <p className="text-sm text-green-700">CO₂ économisé</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Équivalent arbres</span>
                    <span className="font-medium text-green-800">2.3 arbres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Km évités</span>
                    <span className="font-medium text-green-800">156 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Énergie propre</span>
                    <span className="font-medium text-green-800">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
