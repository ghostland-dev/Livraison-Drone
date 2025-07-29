"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Package, MapPin, Clock, RotateCcw, Download, Search, Calendar, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  date: string
  pickupAddress: string
  deliveryAddress: string
  packageType: string
  weight: string
  status: "delivered" | "cancelled" | "in-progress"
  cost: string
  urgency: string
  estimatedTime: string
  actualTime?: string
  rating?: number
  droneId?: string
}

export default function OrderHistoryPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date-desc")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading order history
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: "ORD-001",
          date: "2024-01-15T14:30:00Z",
          pickupAddress: "123 Rue de la Paix, 75001 Paris",
          deliveryAddress: "456 Avenue des Champs-Élysées, 75008 Paris",
          packageType: "Documents",
          weight: "0.5",
          status: "delivered",
          cost: "12.50",
          urgency: "express",
          estimatedTime: "15 min",
          actualTime: "13 min",
          rating: 5,
          droneId: "SKY-D001",
        },
        {
          id: "ORD-002",
          date: "2024-01-12T10:15:00Z",
          pickupAddress: "789 Boulevard Saint-Germain, 75006 Paris",
          deliveryAddress: "321 Rue de Rivoli, 75001 Paris",
          packageType: "Nourriture",
          weight: "2.1",
          status: "delivered",
          cost: "18.00",
          urgency: "priority",
          estimatedTime: "25 min",
          actualTime: "22 min",
          rating: 4,
          droneId: "SKY-D002",
        },
        {
          id: "ORD-003",
          date: "2024-01-10T16:45:00Z",
          pickupAddress: "555 Avenue Montaigne, 75008 Paris",
          deliveryAddress: "777 Rue du Faubourg Saint-Honoré, 75008 Paris",
          packageType: "Médicaments",
          weight: "0.3",
          status: "delivered",
          cost: "8.50",
          urgency: "standard",
          estimatedTime: "30 min",
          actualTime: "28 min",
          rating: 5,
          droneId: "SKY-D003",
        },
        {
          id: "ORD-004",
          date: "2024-01-08T12:20:00Z",
          pickupAddress: "999 Place Vendôme, 75001 Paris",
          deliveryAddress: "111 Champs-Élysées, 75008 Paris",
          packageType: "Électronique",
          weight: "1.8",
          status: "cancelled",
          cost: "15.00",
          urgency: "express",
          estimatedTime: "15 min",
          droneId: "SKY-D001",
        },
        {
          id: "ORD-005",
          date: "2024-01-05T09:30:00Z",
          pickupAddress: "222 Rue de la Paix, 75002 Paris",
          deliveryAddress: "333 Boulevard Haussmann, 75009 Paris",
          packageType: "Documents",
          weight: "0.8",
          status: "delivered",
          cost: "10.00",
          urgency: "standard",
          estimatedTime: "35 min",
          actualTime: "32 min",
          rating: 4,
          droneId: "SKY-D004",
        },
      ]
      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.packageType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "cost-desc":
          return Number.parseFloat(b.cost) - Number.parseFloat(a.cost)
        case "cost-asc":
          return Number.parseFloat(a.cost) - Number.parseFloat(b.cost)
        default:
          return 0
      }
    })

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, sortBy])

  const handleReorder = (order: Order) => {
    const orderData = {
      pickupAddress: order.pickupAddress,
      deliveryAddress: order.deliveryAddress,
      packageType: order.packageType,
      weight: order.weight,
      urgency: order.urgency,
      specialInstructions: "",
    }

    localStorage.setItem("reorderData", JSON.stringify(orderData))

    toast({
      title: "Données de commande sauvegardées",
      description: "Vous allez être redirigé vers le formulaire de commande.",
    })

    setTimeout(() => {
      window.location.href = "/?reorder=true"
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Livré"
      case "cancelled":
        return "Annulé"
      case "in-progress":
        return "En cours"
      default:
        return status
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "express":
        return "bg-red-100 text-red-800"
      case "priority":
        return "bg-orange-100 text-orange-800"
      case "standard":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateStats = () => {
    const delivered = orders.filter((o) => o.status === "delivered")
    const totalSpent = delivered.reduce((sum, order) => sum + Number.parseFloat(order.cost), 0)
    const totalWeight = delivered.reduce((sum, order) => sum + Number.parseFloat(order.weight), 0)
    const avgRating = delivered.reduce((sum, order) => sum + (order.rating || 0), 0) / delivered.length

    return {
      totalOrders: orders.length,
      delivered: delivered.length,
      totalSpent,
      totalWeight,
      avgRating: avgRating || 0,
    }
  }

  const stats = calculateStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Chargement de l'historique</h2>
              <p className="text-gray-600">Récupération de vos commandes...</p>
            </div>
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
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Historique des commandes</h1>
              <p className="text-gray-600">Consultez et gérez vos livraisons passées</p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par ID, adresse..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="delivered">Livré</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (récent)</SelectItem>
                  <SelectItem value="date-asc">Date (ancien)</SelectItem>
                  <SelectItem value="cost-desc">Prix (élevé)</SelectItem>
                  <SelectItem value="cost-asc">Prix (bas)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Période
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredOrders.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || statusFilter !== "all"
                      ? "Essayez d'ajuster vos filtres de recherche"
                      : "Vous n'avez pas encore passé de commande"}
                  </p>
                  <Button asChild>
                    <Link href="/">Passer votre première commande</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>Commande {order.id}</span>
                            <Badge className={getStatusColor(order.status)} variant="secondary">
                              {getStatusText(order.status)}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="flex items-center space-x-4 mt-1">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatDate(order.date)}</span>
                            </span>
                            <span className="font-medium text-blue-600">{order.cost}€</span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/tracking/${order.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReorder(order)}
                          className="bg-transparent"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Recommander
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Collecte</p>
                            <p className="text-sm text-gray-600">{order.pickupAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Livraison</p>
                            <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{order.packageType}</Badge>
                          <Badge variant="secondary">{order.weight}kg</Badge>
                          <Badge className={getUrgencyColor(order.urgency)} variant="secondary">
                            {order.urgency}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Temps estimé:</span>
                            <span className="font-medium">{order.estimatedTime}</span>
                          </div>
                          {order.actualTime && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Temps réel:</span>
                              <span className="font-medium text-green-600">{order.actualTime}</span>
                            </div>
                          )}
                          {order.droneId && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Drone:</span>
                              <span className="font-medium">{order.droneId}</span>
                            </div>
                          )}
                        </div>
                        {order.rating && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Note:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < order.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Résumé des livraisons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalOrders}</div>
                    <div className="text-sm text-blue-700">Total commandes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
                    <div className="text-sm text-green-700">Livrées</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.totalSpent.toFixed(2)}€</div>
                    <div className="text-sm text-purple-700">Total dépensé</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{stats.totalWeight.toFixed(1)}kg</div>
                    <div className="text-sm text-orange-700">Poids total</div>
                  </div>
                  {stats.avgRating > 0 && (
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{stats.avgRating.toFixed(1)}/5</div>
                      <div className="text-sm text-yellow-700">Note moyenne</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-green-800">Impact écologique</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800 mb-1">{(stats.delivered * 0.5).toFixed(1)} kg</div>
                  <p className="text-sm text-green-700">CO₂ économisé</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Équivalent arbres</span>
                    <span className="font-medium text-green-800">{(stats.delivered * 0.1).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Km évités</span>
                    <span className="font-medium text-green-800">{stats.delivered * 5} km</span>
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
