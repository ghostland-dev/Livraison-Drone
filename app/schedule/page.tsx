"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Package,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Bell,
  Repeat,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"

interface ScheduledDelivery {
  id: string
  title: string
  pickupAddress: string
  deliveryAddress: string
  packageType: string
  weight: string
  scheduledDate: string
  scheduledTime: string
  urgency: string
  recurring: boolean
  recurringType?: "daily" | "weekly" | "monthly"
  status: "scheduled" | "active" | "completed" | "cancelled"
  notifications: boolean
  specialInstructions?: string
}

export default function SchedulePage() {
  const { toast } = useToast()
  const [scheduledDeliveries, setScheduledDeliveries] = useState<ScheduledDelivery[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    pickupAddress: "",
    deliveryAddress: "",
    packageType: "",
    weight: "",
    scheduledDate: "",
    scheduledTime: "",
    urgency: "standard",
    recurring: false,
    recurringType: "weekly" as "daily" | "weekly" | "monthly",
    notifications: true,
    specialInstructions: "",
  })

  useEffect(() => {
    // Simulate loading scheduled deliveries
    const mockScheduled: ScheduledDelivery[] = [
      {
        id: "SCH-001",
        title: "Livraison hebdomadaire documents",
        pickupAddress: "123 Rue de la Paix, 75001 Paris",
        deliveryAddress: "456 Avenue des Champs-Élysées, 75008 Paris",
        packageType: "Documents",
        weight: "0.5",
        scheduledDate: "2024-01-20",
        scheduledTime: "14:30",
        urgency: "standard",
        recurring: true,
        recurringType: "weekly",
        status: "scheduled",
        notifications: true,
        specialInstructions: "Laisser à la réception",
      },
      {
        id: "SCH-002",
        title: "Médicaments urgents",
        pickupAddress: "789 Boulevard Saint-Germain, 75006 Paris",
        deliveryAddress: "321 Rue de Rivoli, 75001 Paris",
        packageType: "Médicaments",
        weight: "0.3",
        scheduledDate: "2024-01-18",
        scheduledTime: "09:00",
        urgency: "express",
        recurring: false,
        status: "scheduled",
        notifications: true,
      },
      {
        id: "SCH-003",
        title: "Livraison mensuelle équipement",
        pickupAddress: "555 Avenue Montaigne, 75008 Paris",
        deliveryAddress: "777 Rue du Faubourg Saint-Honoré, 75008 Paris",
        packageType: "Électronique",
        weight: "2.0",
        scheduledDate: "2024-01-25",
        scheduledTime: "16:00",
        urgency: "priority",
        recurring: true,
        recurringType: "monthly",
        status: "scheduled",
        notifications: false,
        specialInstructions: "Fragile - Manipuler avec précaution",
      },
    ]
    setScheduledDeliveries(mockScheduled)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.pickupAddress || !formData.deliveryAddress) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newDelivery: ScheduledDelivery = {
      id: editingId || `SCH-${Date.now()}`,
      ...formData,
      status: "scheduled",
    }

    if (editingId) {
      setScheduledDeliveries((prev) => prev.map((item) => (item.id === editingId ? newDelivery : item)))
      toast({
        title: "Livraison mise à jour",
        description: "Votre livraison programmée a été modifiée avec succès.",
      })
    } else {
      setScheduledDeliveries((prev) => [...prev, newDelivery])
      toast({
        title: "Livraison programmée",
        description: "Votre livraison a été programmée avec succès.",
      })
    }

    // Reset form
    setFormData({
      title: "",
      pickupAddress: "",
      deliveryAddress: "",
      packageType: "",
      weight: "",
      scheduledDate: "",
      scheduledTime: "",
      urgency: "standard",
      recurring: false,
      recurringType: "weekly",
      notifications: true,
      specialInstructions: "",
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEdit = (delivery: ScheduledDelivery) => {
    setFormData({
      title: delivery.title,
      pickupAddress: delivery.pickupAddress,
      deliveryAddress: delivery.deliveryAddress,
      packageType: delivery.packageType,
      weight: delivery.weight,
      scheduledDate: delivery.scheduledDate,
      scheduledTime: delivery.scheduledTime,
      urgency: delivery.urgency,
      recurring: delivery.recurring,
      recurringType: delivery.recurringType || "weekly",
      notifications: delivery.notifications,
      specialInstructions: delivery.specialInstructions || "",
    })
    setEditingId(delivery.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setScheduledDeliveries((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Livraison supprimée",
      description: "La livraison programmée a été supprimée.",
    })
  }

  const handleCancel = (id: string) => {
    setScheduledDeliveries((prev) => prev.map((item) => (item.id === id ? { ...item, status: "cancelled" } : item)))
    toast({
      title: "Livraison annulée",
      description: "La livraison programmée a été annulée.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Programmée"
      case "active":
        return "Active"
      case "completed":
        return "Terminée"
      case "cancelled":
        return "Annulée"
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (time: string) => {
    return time
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
              <h1 className="text-3xl font-bold text-gray-900">Livraisons programmées</h1>
              <p className="text-gray-600">Planifiez et gérez vos livraisons récurrentes</p>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Programmer une livraison
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scheduled Deliveries List */}
          <div className="lg:col-span-2 space-y-6">
            {showForm && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {editingId ? "Modifier la livraison" : "Programmer une nouvelle livraison"}
                  </CardTitle>
                  <CardDescription>Configurez les détails de votre livraison programmée</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre de la livraison *</Label>
                      <Input
                        id="title"
                        placeholder="Ex: Livraison hebdomadaire documents"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickup">Adresse de collecte *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="pickup"
                            placeholder="123 Rue de la Paix, Paris"
                            className="pl-10"
                            value={formData.pickupAddress}
                            onChange={(e) => setFormData((prev) => ({ ...prev, pickupAddress: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="delivery">Adresse de livraison *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="delivery"
                            placeholder="456 Avenue des Champs, Paris"
                            className="pl-10"
                            value={formData.deliveryAddress}
                            onChange={(e) => setFormData((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="packageType">Type de colis</Label>
                        <Select
                          value={formData.packageType}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, packageType: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="documents">Documents</SelectItem>
                            <SelectItem value="food">Nourriture</SelectItem>
                            <SelectItem value="medicine">Médicaments</SelectItem>
                            <SelectItem value="electronics">Électronique</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Poids (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          max="5"
                          placeholder="1.5"
                          value={formData.weight}
                          onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="urgency">Urgence</Label>
                        <Select
                          value={formData.urgency}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="priority">Prioritaire</SelectItem>
                            <SelectItem value="express">Express</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="date"
                            type="date"
                            className="pl-10"
                            value={formData.scheduledDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, scheduledDate: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Heure</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="time"
                            type="time"
                            className="pl-10"
                            value={formData.scheduledTime}
                            onChange={(e) => setFormData((prev) => ({ ...prev, scheduledTime: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Livraison récurrente</Label>
                          <p className="text-sm text-gray-500">Répéter cette livraison automatiquement</p>
                        </div>
                        <Switch
                          checked={formData.recurring}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, recurring: checked }))}
                        />
                      </div>

                      {formData.recurring && (
                        <div className="space-y-2">
                          <Label htmlFor="recurringType">Fréquence</Label>
                          <Select
                            value={formData.recurringType}
                            onValueChange={(value: "daily" | "weekly" | "monthly") =>
                              setFormData((prev) => ({ ...prev, recurringType: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Quotidienne</SelectItem>
                              <SelectItem value="weekly">Hebdomadaire</SelectItem>
                              <SelectItem value="monthly">Mensuelle</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Notifications</Label>
                          <p className="text-sm text-gray-500">Recevoir des rappels avant la livraison</p>
                        </div>
                        <Switch
                          checked={formData.notifications}
                          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notifications: checked }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions spéciales</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Informations supplémentaires pour la livraison..."
                        rows={3}
                        value={formData.specialInstructions}
                        onChange={(e) => setFormData((prev) => ({ ...prev, specialInstructions: e.target.value }))}
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {editingId ? "Mettre à jour" : "Programmer"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowForm(false)
                          setEditingId(null)
                          setFormData({
                            title: "",
                            pickupAddress: "",
                            deliveryAddress: "",
                            packageType: "",
                            weight: "",
                            scheduledDate: "",
                            scheduledTime: "",
                            urgency: "standard",
                            recurring: false,
                            recurringType: "weekly",
                            notifications: true,
                            specialInstructions: "",
                          })
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {scheduledDeliveries.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune livraison programmée</h3>
                  <p className="text-gray-600 mb-4">Commencez par programmer votre première livraison récurrente</p>
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Programmer une livraison
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {scheduledDeliveries.map((delivery) => (
                  <Card key={delivery.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            {delivery.recurring ? (
                              <Repeat className="h-6 w-6 text-blue-600" />
                            ) : (
                              <Calendar className="h-6 w-6 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <span>{delivery.title}</span>
                              <Badge className={getStatusColor(delivery.status)} variant="secondary">
                                {getStatusText(delivery.status)}
                              </Badge>
                              {delivery.recurring && (
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  <Repeat className="h-3 w-3 mr-1" />
                                  {delivery.recurringType}
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-4 mt-1">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(delivery.scheduledDate)}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatTime(delivery.scheduledTime)}</span>
                              </span>
                              {delivery.notifications && (
                                <Bell className="h-4 w-4 text-blue-600" title="Notifications activées" />
                              )}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(delivery)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {delivery.status === "scheduled" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancel(delivery.id)}
                              className="text-orange-600 hover:text-orange-800"
                            >
                              Annuler
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(delivery.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
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
                              <p className="text-sm text-gray-600">{delivery.pickupAddress}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Livraison</p>
                              <p className="text-sm text-gray-600">{delivery.deliveryAddress}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{delivery.packageType}</Badge>
                            <Badge variant="secondary">{delivery.weight}kg</Badge>
                            <Badge className={getUrgencyColor(delivery.urgency)} variant="secondary">
                              {delivery.urgency}
                            </Badge>
                          </div>
                          {delivery.specialInstructions && (
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-1">Instructions</p>
                              <p className="text-sm text-gray-600">{delivery.specialInstructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {scheduledDeliveries.filter((d) => d.status === "scheduled").length}
                    </div>
                    <div className="text-sm text-blue-700">Programmées</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {scheduledDeliveries.filter((d) => d.recurring).length}
                    </div>
                    <div className="text-sm text-purple-700">Récurrentes</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {scheduledDeliveries.filter((d) => d.status === "completed").length}
                    </div>
                    <div className="text-sm text-green-700">Terminées</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deliveries */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Prochaines livraisons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledDeliveries
                    .filter((d) => d.status === "scheduled")
                    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
                    .slice(0, 3)
                    .map((delivery) => (
                      <div key={delivery.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Package className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{delivery.title}</p>
                          <p className="text-xs text-gray-600">
                            {formatDate(delivery.scheduledDate)} à {formatTime(delivery.scheduledTime)}
                          </p>
                        </div>
                      </div>
                    ))}
                  {scheduledDeliveries.filter((d) => d.status === "scheduled").length === 0 && (
                    <p className="text-sm text-gray-600 text-center py-4">Aucune livraison programmée</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">💡 Conseils</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-orange-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p>Programmez vos livraisons récurrentes pour économiser du temps</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p>Activez les notifications pour ne jamais manquer une livraison</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p>Utilisez des instructions spéciales pour des livraisons complexes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
