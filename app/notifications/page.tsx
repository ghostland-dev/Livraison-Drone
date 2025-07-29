"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Package, Bell, Check, X, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Notification {
  id: string
  type: "delivery" | "payment" | "system" | "promotion"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
  })

  useEffect(() => {
    // Simuler le chargement des notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "delivery",
        title: "Livraison en cours",
        message: "Votre commande ORD-ABC123 est en route et arrivera dans 8 minutes",
        timestamp: "2024-01-15T14:30:00Z",
        read: false,
        actionUrl: "/tracking/ORD-ABC123",
      },
      {
        id: "2",
        type: "payment",
        title: "Paiement confirmé",
        message: "Votre paiement de 12,50€ a été traité avec succès",
        timestamp: "2024-01-15T14:25:00Z",
        read: false,
      },
      {
        id: "3",
        type: "system",
        title: "Mise à jour de sécurité",
        message: "Nous avons mis à jour nos protocoles de sécurité pour une meilleure protection",
        timestamp: "2024-01-15T10:00:00Z",
        read: true,
      },
      {
        id: "4",
        type: "promotion",
        title: "Offre spéciale",
        message: "Profitez de 20% de réduction sur votre prochaine livraison express",
        timestamp: "2024-01-14T16:00:00Z",
        read: true,
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "delivery":
        return <Package className="h-5 w-5 text-blue-600" />
      case "payment":
        return <Check className="h-5 w-5 text-green-600" />
      case "system":
        return <AlertCircle className="h-5 w-5 text-orange-600" />
      case "promotion":
        return <Bell className="h-5 w-5 text-purple-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `Il y a ${diffInMinutes} min`
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`
    } else {
      return date.toLocaleDateString("fr-FR")
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0
                ? `${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
                : "Toutes les notifications sont lues"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              Tout marquer comme lu
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
                  <p className="text-gray-600">Vous n'avez aucune notification pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card key={notification.id} className={`${!notification.read ? "border-blue-200 bg-blue-50/30" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3
                              className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                            >
                              {notification.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                              {!notification.read && (
                                <Badge variant="secondary" className="text-xs">
                                  Nouveau
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {notification.actionUrl && (
                          <div className="mt-3">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={notification.actionUrl}>Voir les détails</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Notification Settings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Paramètres de notification</span>
                </CardTitle>
                <CardDescription>Gérez vos préférences de notification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push" className="font-medium">
                      Notifications push
                    </Label>
                    <p className="text-sm text-gray-600">Recevez des alertes en temps réel</p>
                  </div>
                  <Switch
                    id="push"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email" className="font-medium">
                      Notifications email
                    </Label>
                    <p className="text-sm text-gray-600">Recevez des mises à jour par email</p>
                  </div>
                  <Switch
                    id="email"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms" className="font-medium">
                      Notifications SMS
                    </Label>
                    <p className="text-sm text-gray-600">Recevez des alertes par SMS</p>
                  </div>
                  <Switch
                    id="sms"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promo" className="font-medium">
                      Emails promotionnels
                    </Label>
                    <p className="text-sm text-gray-600">Recevez nos offres spéciales</p>
                  </div>
                  <Switch
                    id="promo"
                    checked={settings.promotionalEmails}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, promotionalEmails: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/tracking">
                    <Package className="h-4 w-4 mr-2" />
                    Suivre une commande
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/history">
                    <Clock className="h-4 w-4 mr-2" />
                    Historique des commandes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/support">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Contacter le support
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
