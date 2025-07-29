"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Package, Star, ThumbsUp, MessageSquare, Filter } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Review {
  id: string
  orderId: string
  rating: number
  comment: string
  date: string
  response?: string
  helpful: number
  verified: boolean
}

interface PendingReview {
  orderId: string
  date: string
  from: string
  to: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([])
  const [filterRating, setFilterRating] = useState<string>("all")
  const [newReview, setNewReview] = useState({
    orderId: "",
    rating: 0,
    comment: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Simuler le chargement des avis
    const mockReviews: Review[] = [
      {
        id: "1",
        orderId: "ORD-001",
        rating: 5,
        comment:
          "Service exceptionnel ! Le drone est arrivé exactement à l'heure prévue et le colis était en parfait état. L'application de suivi en temps réel est très pratique.",
        date: "2024-01-15",
        helpful: 12,
        verified: true,
      },
      {
        id: "2",
        orderId: "ORD-002",
        rating: 4,
        comment:
          "Très satisfait de la rapidité de livraison. Seul petit bémol : le drone a fait un peu de bruit, mais rien de dérangeant.",
        date: "2024-01-14",
        response: "Merci pour votre retour ! Nous travaillons constamment sur la réduction du bruit de nos drones.",
        helpful: 8,
        verified: true,
      },
      {
        id: "3",
        orderId: "ORD-003",
        rating: 5,
        comment:
          "Innovation remarquable ! C'est impressionnant de voir le drone naviguer avec précision. Service client également très réactif.",
        date: "2024-01-13",
        helpful: 15,
        verified: true,
      },
      {
        id: "4",
        orderId: "ORD-004",
        rating: 3,
        comment: "Le service fonctionne bien mais le prix est un peu élevé comparé aux autres options de livraison.",
        date: "2024-01-12",
        helpful: 5,
        verified: true,
      },
    ]

    const mockPendingReviews: PendingReview[] = [
      {
        orderId: "ORD-005",
        date: "2024-01-16",
        from: "Restaurant Le Gourmet",
        to: "123 Rue de la Paix",
      },
      {
        orderId: "ORD-006",
        date: "2024-01-15",
        from: "Pharmacie Central",
        to: "456 Avenue des Champs",
      },
    ]

    setReviews(mockReviews)
    setPendingReviews(mockPendingReviews)
  }, [])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    const review: Review = {
      id: Date.now().toString(),
      orderId: newReview.orderId,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
      verified: true,
    }

    setReviews((prev) => [review, ...prev])
    setPendingReviews((prev) => prev.filter((p) => p.orderId !== newReview.orderId))

    setNewReview({
      orderId: "",
      rating: 0,
      comment: "",
    })
    setIsDialogOpen(false)
  }

  const handleStartReview = (orderId: string) => {
    setNewReview((prev) => ({ ...prev, orderId }))
    setIsDialogOpen(true)
  }

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
    )
  }

  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "all") return true
    return review.rating === Number.parseInt(filterRating)
  })

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 : 0,
  }))

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Avis et évaluations</h1>
          <p className="text-gray-600">Partagez votre expérience et consultez les avis d'autres utilisateurs</p>
        </div>

        {/* Pending Reviews */}
        {pendingReviews.length > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-orange-600" />
                <span>Avis en attente</span>
              </CardTitle>
              <CardDescription>Vous avez des livraisons récentes à évaluer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingReviews.map((pending) => (
                  <div
                    key={pending.orderId}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{pending.orderId}</h4>
                      <p className="text-sm text-gray-600">
                        {pending.from} → {pending.to}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(pending.date).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <Button size="sm" onClick={() => handleStartReview(pending.orderId)}>
                      Laisser un avis
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-3">
            {/* Filter */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Tous les avis ({filteredReviews.length})</h2>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filtrer par note" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les notes</SelectItem>
                    <SelectItem value="5">5 étoiles</SelectItem>
                    <SelectItem value="4">4 étoiles</SelectItem>
                    <SelectItem value="3">3 étoiles</SelectItem>
                    <SelectItem value="2">2 étoiles</SelectItem>
                    <SelectItem value="1">1 étoile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{review.orderId}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Vérifié
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString("fr-FR")}</span>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    {review.response && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <h5 className="font-medium text-blue-900 mb-2">Réponse de SkyDeliver</h5>
                        <p className="text-blue-800 text-sm">{review.response}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markHelpful(review.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Utile ({review.helpful})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Note moyenne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Basé sur {reviews.length} avis</p>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Write Review */}
            <Card>
              <CardHeader>
                <CardTitle>Laisser un avis</CardTitle>
                <CardDescription>Partagez votre expérience avec SkyDeliver</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Star className="h-4 w-4 mr-2" />
                      Écrire un avis
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Évaluer votre livraison</DialogTitle>
                      <DialogDescription>Votre avis nous aide à améliorer notre service</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Commande</label>
                        <Select
                          value={newReview.orderId}
                          onValueChange={(value) => setNewReview((prev) => ({ ...prev, orderId: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une commande" />
                          </SelectTrigger>
                          <SelectContent>
                            {pendingReviews.map((pending) => (
                              <SelectItem key={pending.orderId} value={pending.orderId}>
                                {pending.orderId}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Note</label>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setNewReview((prev) => ({ ...prev, rating }))}
                              className="p-1"
                            >
                              <Star
                                className={`h-6 w-6 ${rating <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Commentaire</label>
                        <Textarea
                          placeholder="Décrivez votre expérience..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                          rows={4}
                          required
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button type="submit" disabled={!newReview.orderId || !newReview.rating}>
                          Publier l'avis
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Review Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Conseils pour un bon avis</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Soyez honnête et constructif</p>
                <p>• Décrivez votre expérience en détail</p>
                <p>• Mentionnez les points positifs et négatifs</p>
                <p>• Respectez les autres utilisateurs</p>
                <p>• Évitez les informations personnelles</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
