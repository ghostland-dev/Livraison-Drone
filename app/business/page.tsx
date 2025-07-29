"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Package,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  Zap,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { useToast } from "@/hooks/use-toast"

export default function BusinessPage() {
  const { toast } = useToast()
  const [contactForm, setContactForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    deliveryVolume: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!contactForm.companyName || !contactForm.contactName || !contactForm.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Demande envoyée !",
      description: "Notre équipe commerciale vous contactera sous 24h.",
    })

    // Reset form
    setContactForm({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      companySize: "",
      industry: "",
      deliveryVolume: "",
      message: "",
    })
  }

  const features = [
    {
      icon: TrendingUp,
      title: "Tableau de bord analytique",
      description: "Suivez vos KPIs de livraison en temps réel avec des rapports détaillés",
      benefits: ["Métriques de performance", "Analyse des coûts", "Optimisation des routes"],
    },
    {
      icon: Users,
      title: "Gestion d'équipe",
      description: "Gérez les accès et permissions de votre équipe avec des rôles personnalisés",
      benefits: ["Comptes multiples", "Contrôle d'accès", "Facturation centralisée"],
    },
    {
      icon: Shield,
      title: "Sécurité entreprise",
      description: "Sécurité renforcée avec authentification SSO et conformité RGPD",
      benefits: ["SSO/SAML", "Audit trail", "Conformité RGPD"],
    },
    {
      icon: Zap,
      title: "API & Intégrations",
      description: "Intégrez SkyDeliver à vos systèmes existants via notre API REST",
      benefits: ["API REST complète", "Webhooks", "SDK disponibles"],
    },
    {
      icon: Clock,
      title: "Support prioritaire",
      description: "Support dédié 24/7 avec un gestionnaire de compte attitré",
      benefits: ["Support 24/7", "Account manager", "SLA garanti"],
    },
    {
      icon: BarChart3,
      title: "Tarification volume",
      description: "Tarifs dégressifs basés sur votre volume de livraisons mensuel",
      benefits: ["Tarifs négociés", "Facturation mensuelle", "Remises volume"],
    },
  ]

  const plans = [
    {
      name: "Starter",
      price: "99€",
      period: "/mois",
      description: "Parfait pour les petites entreprises",
      features: [
        "Jusqu'à 100 livraisons/mois",
        "Tableau de bord basique",
        "Support email",
        "API standard",
        "2 utilisateurs inclus",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "299€",
      period: "/mois",
      description: "Idéal pour les entreprises en croissance",
      features: [
        "Jusqu'à 500 livraisons/mois",
        "Analytics avancées",
        "Support prioritaire",
        "API complète + Webhooks",
        "10 utilisateurs inclus",
        "Intégrations tierces",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      period: "",
      description: "Solution personnalisée pour les grandes entreprises",
      features: [
        "Volume illimité",
        "Tableau de bord personnalisé",
        "Account manager dédié",
        "SLA garanti 99.9%",
        "Utilisateurs illimités",
        "Intégrations sur mesure",
        "Formation équipe",
      ],
      popular: false,
    },
  ]

  const testimonials = [
    {
      company: "TechCorp",
      logo: "TC",
      industry: "Technologie",
      testimonial:
        "SkyDeliver a révolutionné notre logistique. Nous avons réduit nos délais de livraison de 60% et nos coûts de 40%.",
      author: "Marie Dubois",
      role: "Directrice Logistique",
      stats: { deliveries: "2,500", savings: "40%" },
    },
    {
      company: "MediFast",
      logo: "MF",
      industry: "Santé",
      testimonial:
        "Pour nos livraisons de médicaments urgents, SkyDeliver est devenu indispensable. Fiabilité et rapidité au rendez-vous.",
      author: "Dr. Pierre Martin",
      role: "Directeur Médical",
      stats: { deliveries: "1,200", savings: "35%" },
    },
    {
      company: "RetailPlus",
      logo: "RP",
      industry: "Commerce",
      testimonial:
        "L'intégration avec notre e-commerce a été parfaite. Nos clients adorent la livraison en 15 minutes.",
      author: "Sophie Laurent",
      role: "Responsable E-commerce",
      stats: { deliveries: "5,000", savings: "50%" },
    },
  ]

  const useCases = [
    {
      icon: Package,
      title: "E-commerce & Retail",
      description: "Livraisons ultra-rapides pour vos commandes en ligne",
      examples: ["Last-mile delivery", "Retours express", "Click & collect"],
    },
    {
      icon: Shield,
      title: "Santé & Pharmacie",
      description: "Transport sécurisé de médicaments et échantillons",
      examples: ["Médicaments urgents", "Analyses médicales", "Équipements médicaux"],
    },
    {
      icon: Building2,
      title: "Services B2B",
      description: "Livraisons inter-entreprises et documents urgents",
      examples: ["Documents légaux", "Pièces détachées", "Échantillons"],
    },
    {
      icon: Globe,
      title: "Restauration",
      description: "Livraison de repas chauds en moins de 20 minutes",
      examples: ["Plats préparés", "Ingrédients frais", "Commandes groupées"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Solutions Entreprise</h1>
              <p className="text-gray-600">Optimisez votre logistique avec nos solutions professionnelles</p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800">
                  <Building2 className="h-4 w-4 mr-2" />
                  Solutions B2B
                </Badge>
                <h2 className="text-4xl font-bold leading-tight">
                  Révolutionnez votre
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}
                    logistique d'entreprise
                  </span>
                </h2>
                <p className="text-xl text-gray-600">
                  Intégrez la livraison par drone à vos processus métier et réduisez vos coûts logistiques jusqu'à 50%.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">15 min</div>
                  <div className="text-sm text-gray-600">Livraison moyenne</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">50%</div>
                  <div className="text-sm text-gray-600">Réduction des coûts</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Taux de réussite</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Support dédié</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Demander une démo
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent">
                  <Phone className="mr-2 h-4 w-4" />
                  Parler à un expert
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Interface Entreprise</h3>
                  <p className="text-gray-600">Tableau de bord avancé avec analytics en temps réel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fonctionnalités entreprise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils professionnels conçus pour optimiser vos opérations logistiques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cas d'usage</h2>
            <p className="text-xl text-gray-600">Découvrez comment SkyDeliver s'adapte à votre secteur</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{useCase.description}</p>
                  <div className="space-y-1">
                    {useCase.examples.map((example, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tarification entreprise</h2>
            <p className="text-xl text-gray-600">Des plans adaptés à la taille de votre entreprise</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg relative ${plan.popular ? "ring-2 ring-blue-500 shadow-xl" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">Plus populaire</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise" ? "Nous contacter" : "Commencer"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600">Découvrez les résultats obtenus par nos clients entreprise</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.company}</h3>
                      <p className="text-sm text-gray-600">{testimonial.industry}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.testimonial}"</p>
                  <div className="border-t pt-4">
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <span className="text-blue-600 font-medium">{testimonial.stats.deliveries} livraisons/mois</span>
                      <span className="text-green-600 font-medium">{testimonial.stats.savings} d'économies</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Prêt à transformer votre logistique ?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Contactez notre équipe commerciale pour une démonstration personnalisée et un devis sur mesure.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Appelez-nous</h3>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Écrivez-nous</h3>
                    <p className="text-gray-600">business@skydeliver.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Planifiez une démo</h3>
                    <p className="text-gray-600">Démonstration personnalisée en 30 minutes</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Demande d'information</CardTitle>
                <CardDescription>Remplissez ce formulaire et nous vous recontacterons sous 24h</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                      <Input
                        id="companyName"
                        placeholder="Votre entreprise"
                        value={contactForm.companyName}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, companyName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Nom du contact *</Label>
                      <Input
                        id="contactName"
                        placeholder="Votre nom"
                        value={contactForm.contactName}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, contactName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email professionnel *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@entreprise.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 1 23 45 67 89"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Taille de l'entreprise</Label>
                      <Select
                        value={contactForm.companySize}
                        onValueChange={(value) => setContactForm((prev) => ({ ...prev, companySize: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employés</SelectItem>
                          <SelectItem value="11-50">11-50 employés</SelectItem>
                          <SelectItem value="51-200">51-200 employés</SelectItem>
                          <SelectItem value="201-1000">201-1000 employés</SelectItem>
                          <SelectItem value="1000+">1000+ employés</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Secteur d'activité</Label>
                      <Select
                        value={contactForm.industry}
                        onValueChange={(value) => setContactForm((prev) => ({ ...prev, industry: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="healthcare">Santé</SelectItem>
                          <SelectItem value="retail">Commerce de détail</SelectItem>
                          <SelectItem value="food">Restauration</SelectItem>
                          <SelectItem value="logistics">Logistique</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryVolume">Volume de livraisons mensuel estimé</Label>
                    <Select
                      value={contactForm.deliveryVolume}
                      onValueChange={(value) => setContactForm((prev) => ({ ...prev, deliveryVolume: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50 livraisons</SelectItem>
                        <SelectItem value="51-200">51-200 livraisons</SelectItem>
                        <SelectItem value="201-500">201-500 livraisons</SelectItem>
                        <SelectItem value="501-1000">501-1000 livraisons</SelectItem>
                        <SelectItem value="1000+">1000+ livraisons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez vos besoins en logistique..."
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                  >
                    Envoyer la demande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
