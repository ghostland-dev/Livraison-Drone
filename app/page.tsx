"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, MapPin, Clock, Zap, Shield, Leaf, ArrowRight, Star, CheckCircle, Users, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const { toast } = useToast()
  const [orderForm, setOrderForm] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    packageType: "",
    weight: "",
    urgency: "standard",
    specialInstructions: "",
  })

  const [estimatedCost, setEstimatedCost] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)

  useEffect(() => {
    // Simulate cost calculation
    if (orderForm.pickupAddress && orderForm.deliveryAddress) {
      const baseCost = 8
      const weightMultiplier = Number.parseFloat(orderForm.weight) || 1
      const urgencyMultiplier = orderForm.urgency === "express" ? 1.5 : orderForm.urgency === "priority" ? 1.2 : 1

      setEstimatedCost(baseCost * weightMultiplier * urgencyMultiplier)
      setEstimatedTime(orderForm.urgency === "express" ? 15 : orderForm.urgency === "priority" ? 25 : 35)
    }
  }, [orderForm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!orderForm.pickupAddress || !orderForm.deliveryAddress) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les adresses de collecte et de livraison",
        variant: "destructive",
      })
      return
    }

    const orderId = `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    // Store order data
    localStorage.setItem(
      "pendingOrder",
      JSON.stringify({
        ...orderForm,
        orderId,
        cost: estimatedCost,
        estimatedTime,
        status: "pending",
      }),
    )

    toast({
      title: "Commande créée !",
      description: `Votre commande ${orderId} a été créée. Procédez au paiement.`,
    })

    // Redirect to payment
    window.location.href = `/payment?order=${orderId}`
  }

  const features = [
    {
      icon: Zap,
      title: "Livraison Ultra-Rapide",
      description: "15-30 minutes en moyenne",
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      icon: Shield,
      title: "100% Sécurisé",
      description: "Assurance complète incluse",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: Leaf,
      title: "Écologique",
      description: "Zéro émission carbone",
      color: "text-emerald-600 bg-emerald-100",
    },
  ]

  const stats = [
    { label: "Livraisons réalisées", value: "500K+", icon: Package },
    { label: "Villes desservies", value: "50+", icon: MapPin },
    { label: "Clients satisfaits", value: "98%", icon: Users },
    { label: "Note moyenne", value: "4.9/5", icon: Star },
  ]

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Directrice Marketing",
      content: "Service exceptionnel ! Le drone est arrivé exactement à l'heure prévue.",
      rating: 5,
      avatar: "MD",
    },
    {
      name: "Pierre Martin",
      role: "Entrepreneur",
      content: "Révolutionnaire pour mes livraisons urgentes. Je recommande vivement !",
      rating: 5,
      avatar: "PM",
    },
    {
      name: "Sophie Laurent",
      role: "Pharmacienne",
      content: "Parfait pour les livraisons de médicaments. Rapide et fiable.",
      rating: 5,
      avatar: "SL",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  🚁 Nouveau : Livraison en 15 minutes
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Livraison par
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    drone{" "}
                  </span>
                  ultra-rapide
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Révolutionnez vos livraisons avec notre technologie de drones autonomes. Rapide, écologique et
                  disponible 24h/24.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                    <div className={`p-1 rounded-full ${feature.color}`}>
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{feature.title}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Commander maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="group bg-transparent">
                  <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Voir la démo
                </Button>
              </div>
            </div>

            {/* Order Form */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Commandez votre livraison</CardTitle>
                <CardDescription>Remplissez le formulaire pour obtenir un devis instantané</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Adresse de collecte</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="pickup"
                        placeholder="123 Rue de la Paix, Paris"
                        className="pl-10"
                        value={orderForm.pickupAddress}
                        onChange={(e) => setOrderForm((prev) => ({ ...prev, pickupAddress: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery">Adresse de livraison</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="delivery"
                        placeholder="456 Avenue des Champs, Paris"
                        className="pl-10"
                        value={orderForm.deliveryAddress}
                        onChange={(e) => setOrderForm((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="package">Type de colis</Label>
                      <Select onValueChange={(value) => setOrderForm((prev) => ({ ...prev, packageType: value }))}>
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
                        value={orderForm.weight}
                        onChange={(e) => setOrderForm((prev) => ({ ...prev, weight: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgence</Label>
                    <Select
                      value={orderForm.urgency}
                      onValueChange={(value) => setOrderForm((prev) => ({ ...prev, urgency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (30-45 min)</SelectItem>
                        <SelectItem value="priority">Prioritaire (20-30 min)</SelectItem>
                        <SelectItem value="express">Express (10-20 min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions spéciales (optionnel)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Informations supplémentaires..."
                      rows={3}
                      value={orderForm.specialInstructions}
                      onChange={(e) => setOrderForm((prev) => ({ ...prev, specialInstructions: e.target.value }))}
                    />
                  </div>

                  {estimatedCost > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Coût estimé :</span>
                        <span className="text-2xl font-bold text-blue-600">{estimatedCost.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Temps de livraison :</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />~{estimatedTime} minutes
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Commander maintenant
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir SkyDeliver ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre technologie de pointe garantit des livraisons rapides, sûres et écologiques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Vitesse Inégalée",
                description:
                  "Nos drones autonomes livrent vos colis en 15-30 minutes, évitant les embouteillages urbains.",
                features: ["Livraison en 15 min", "Évite le trafic", "Disponible 24h/24"],
              },
              {
                icon: Shield,
                title: "Sécurité Maximale",
                description: "Technologie de pointe avec capteurs avancés et assurance complète pour tous vos envois.",
                features: ["Capteurs LiDAR", "Assurance incluse", "Suivi temps réel"],
              },
              {
                icon: Leaf,
                title: "Impact Écologique",
                description: "Réduisez votre empreinte carbone avec nos drones électriques zéro émission.",
                features: ["Zéro émission", "Énergie renouvelable", "Transport durable"],
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <p className="text-xl text-gray-600">Plus de 50 000 clients nous font confiance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à révolutionner vos livraisons ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'utilisateurs qui ont déjà adopté la livraison par drone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Package className="mr-2 h-4 w-4" />
              Commencer maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Users className="mr-2 h-4 w-4" />
              Solution Entreprise
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">SkyDeliver</span>
              </div>
              <p className="text-gray-400">La révolution de la livraison urbaine par drone autonome.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tracking" className="hover:text-white">
                    Suivi de commande
                  </Link>
                </li>
                <li>
                  <Link href="/schedule" className="hover:text-white">
                    Programmer une livraison
                  </Link>
                </li>
                <li>
                  <Link href="/business" className="hover:text-white">
                    Solutions Entreprise
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-white">
                    API Développeurs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/support" className="hover:text-white">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-white">
                    Sécurité
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Confidentialité
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-white">
                    Presse
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkyDeliver. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
