"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Edit,
  Plus,
  Trash2,
  Check,
  X,
  Camera,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  addresses: Array<{
    id: string
    label: string
    address: string
    city: string
    postalCode: string
    isDefault: boolean
  }>
  paymentMethods: Array<{
    id: string
    type: "visa" | "mastercard" | "amex"
    last4: string
    expiryMonth: string
    expiryYear: string
    isDefault: boolean
  }>
  preferences: {
    notifications: boolean
    smsUpdates: boolean
    emailUpdates: boolean
    marketingEmails: boolean
    autoReorder: boolean
  }
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    // Simulate loading user data
    const mockUser: UserProfile = {
      id: "user_123",
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phone: "+33 6 12 34 56 78",
      avatar: "/diverse-profile-avatars.png",
      addresses: [
        {
          id: "addr_1",
          label: "Domicile",
          address: "123 Rue de la Paix",
          city: "Paris",
          postalCode: "75001",
          isDefault: true,
        },
        {
          id: "addr_2",
          label: "Bureau",
          address: "456 Avenue des Champs-Élysées",
          city: "Paris",
          postalCode: "75008",
          isDefault: false,
        },
      ],
      paymentMethods: [
        {
          id: "card_1",
          type: "visa",
          last4: "4242",
          expiryMonth: "12",
          expiryYear: "2027",
          isDefault: true,
        },
        {
          id: "card_2",
          type: "mastercard",
          last4: "8888",
          expiryMonth: "06",
          expiryYear: "2026",
          isDefault: false,
        },
      ],
      preferences: {
        notifications: true,
        smsUpdates: true,
        emailUpdates: false,
        marketingEmails: true,
        autoReorder: false,
      },
    }

    setUser(mockUser)
    setEditForm({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      phone: mockUser.phone,
    })
  }, [])

  const handleSaveProfile = () => {
    if (!user) return

    setUser({
      ...user,
      firstName: editForm.firstName,
      lastName: editForm.lastName,
      email: editForm.email,
      phone: editForm.phone,
    })
    setIsEditing(false)

    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    })
  }

  const updatePreference = (key: keyof UserProfile["preferences"], value: boolean) => {
    if (!user) return

    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        [key]: value,
      },
    })

    toast({
      title: "Préférences mises à jour",
      description: "Vos paramètres ont été sauvegardés.",
    })
  }

  const setDefaultAddress = (addressId: string) => {
    if (!user) return

    setUser({
      ...user,
      addresses: user.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    })

    toast({
      title: "Adresse par défaut mise à jour",
      description: "Cette adresse sera utilisée par défaut pour vos livraisons.",
    })
  }

  const setDefaultPayment = (paymentId: string) => {
    if (!user) return

    setUser({
      ...user,
      paymentMethods: user.paymentMethods.map((payment) => ({
        ...payment,
        isDefault: payment.id === paymentId,
      })),
    })

    toast({
      title: "Méthode de paiement mise à jour",
      description: "Cette carte sera utilisée par défaut pour vos commandes.",
    })
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      case "amex":
        return "💳"
      default:
        return "💳"
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Chargement du profil</h2>
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
              <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
              <p className="text-gray-600">Gérez vos informations personnelles et préférences</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">
                        {user.firstName} {user.lastName}
                      </CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                    >
                      {isEditing ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Sauvegarder
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </>
                      )}
                    </Button>
                    {isEditing && (
                      <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={editForm.firstName}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={editForm.lastName}
                        onChange={(e) => setEditForm((prev) => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={editForm.email}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          className="pl-10"
                          value={editForm.phone}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Prénom</Label>
                        <p className="text-gray-900 font-medium">{user.firstName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="text-gray-900 font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Nom</Label>
                        <p className="text-gray-900 font-medium">{user.lastName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Téléphone</Label>
                        <p className="text-gray-900 font-medium">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Addresses */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Adresses de livraison
                    </CardTitle>
                    <CardDescription>Gérez vos adresses de livraison</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{address.label}</h4>
                          {address.isDefault && <Badge variant="secondary">Par défaut</Badge>}
                        </div>
                        <p className="text-gray-600 text-sm">
                          {address.address}, {address.city} {address.postalCode}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!address.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDefaultAddress(address.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Définir par défaut
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Méthodes de paiement
                    </CardTitle>
                    <CardDescription>Gérez vos cartes de paiement</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.paymentMethods.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">
                          {payment.type.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">•••• •••• •••• {payment.last4}</p>
                            {payment.isDefault && <Badge variant="secondary">Par défaut</Badge>}
                          </div>
                          <p className="text-sm text-gray-600">
                            Expire {payment.expiryMonth}/{payment.expiryYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!payment.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDefaultPayment(payment.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Définir par défaut
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription>Contrôlez vos préférences de notification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notifications push</Label>
                    <p className="text-sm text-gray-500">Recevez des alertes sur votre appareil</p>
                  </div>
                  <Switch
                    checked={user.preferences.notifications}
                    onCheckedChange={(checked) => updatePreference("notifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS</Label>
                    <p className="text-sm text-gray-500">Mises à jour par message texte</p>
                  </div>
                  <Switch
                    checked={user.preferences.smsUpdates}
                    onCheckedChange={(checked) => updatePreference("smsUpdates", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email</Label>
                    <p className="text-sm text-gray-500">Notifications par email</p>
                  </div>
                  <Switch
                    checked={user.preferences.emailUpdates}
                    onCheckedChange={(checked) => updatePreference("emailUpdates", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing</Label>
                    <p className="text-sm text-gray-500">Offres et promotions</p>
                  </div>
                  <Switch
                    checked={user.preferences.marketingEmails}
                    onCheckedChange={(checked) => updatePreference("marketingEmails", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Changer le mot de passe
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Authentification à deux facteurs
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Sessions actives
                </Button>
                <Separator />
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Télécharger mes données
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Supprimer mon compte
                </Button>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-green-800">Statut du compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Compte vérifié</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Email confirmé</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Téléphone vérifié</span>
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">Membre depuis</span>
                  <span className="text-sm font-medium text-green-800">6 mois</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
