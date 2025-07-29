"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Package, Users, Gift, Copy, Share2, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Referral {
  id: string
  name: string
  email: string
  status: "pending" | "registered" | "first_order"
  dateInvited: string
  dateRegistered?: string
  reward: number
}

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState("SKYDELIVER2024")
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [totalEarned, setTotalEarned] = useState(0)
  const [pendingRewards, setPendingRewards] = useState(0)
  const [emailInput, setEmailInput] = useState("")

  useEffect(() => {
    // Simuler le chargement des données de parrainage
    const mockReferrals: Referral[] = [
      {
        id: "1",
        name: "Marie Dubois",
        email: "marie.dubois@email.com",
        status: "first_order",
        dateInvited: "2024-01-10",
        dateRegistered: "2024-01-12",
        reward: 200,
      },
      {
        id: "2",
        name: "Pierre Martin",
        email: "pierre.martin@email.com",
        status: "registered",
        dateInvited: "2024-01-08",
        dateRegistered: "2024-01-09",
        reward: 100,
      },
      {
        id: "3",
        name: "Sophie Laurent",
        email: "sophie.laurent@email.com",
        status: "pending",
        dateInvited: "2024-01-15",
        reward: 0,
      },
    ]

    setReferrals(mockReferrals)
    setTotalEarned(300)
    setPendingRewards(100)
  }, [])

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    alert("Code de parrainage copié !")
  }

  const shareReferralLink = () => {
    const referralLink = `https://skydeliver.com/register?ref=${referralCode}`
    if (navigator.share) {
      navigator.share({
        title: "Rejoignez SkyDeliver",
        text: "Découvrez la livraison par drone avec SkyDeliver !",
        url: referralLink,
      })
    } else {
      navigator.clipboard.writeText(referralLink)
      alert("Lien de parrainage copié !")
    }
  }

  const sendEmailInvitation = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput) {
      // Simuler l'envoi d'invitation
      const newReferral: Referral = {
        id: Date.now().toString(),
        name: emailInput.split("@")[0],
        email: emailInput,
        status: "pending",
        dateInvited: new Date().toISOString().split("T")[0],
        reward: 0,
      }
      setReferrals((prev) => [newReferral, ...prev])
      setEmailInput("")
      alert("Invitation envoyée !")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "first_order":
        return "bg-green-100 text-green-800"
      case "registered":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "first_order":
        return "Première commande"
      case "registered":
        return "Inscrit"
      case "pending":
        return "En attente"
      default:
        return status
    }
  }

  const completedReferrals = referrals.filter((r) => r.status === "first_order").length
  const progressToNextReward = ((completedReferrals % 5) / 5) * 100

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Programme de parrainage</h1>
          <p className="text-xl text-gray-600">Invitez vos amis et gagnez des récompenses ensemble</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points gagnés</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEarned}</div>
              <p className="text-xs text-muted-foreground">+100 ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRewards}</div>
              <p className="text-xs text-muted-foreground">Récompenses à venir</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Amis invités</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referrals.length}</div>
              <p className="text-xs text-muted-foreground">{completedReferrals} ont commandé</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Niveau</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Bronze</div>
              <p className="text-xs text-muted-foreground">{5 - (completedReferrals % 5)} pour Silver</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Referral Tools */}
          <div className="lg:col-span-2 space-y-6">
            {/* Share Your Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Partagez votre code</span>
                </CardTitle>
                <CardDescription>
                  Vos amis reçoivent 200 points à l'inscription, vous aussi quand ils passent leur première commande
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input value={referralCode} readOnly className="font-mono" />
                  <Button onClick={copyReferralCode} variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={shareReferralLink} className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager le lien
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Invitation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Inviter par email</span>
                </CardTitle>
                <CardDescription>Envoyez une invitation personnalisée à vos amis</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={sendEmailInvitation} className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="email@exemple.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                  />
                  <Button type="submit">Inviter</Button>
                </form>
              </CardContent>
            </Card>

            {/* Referral History */}
            <Card>
              <CardHeader>
                <CardTitle>Historique des parrainages</CardTitle>
                <CardDescription>Suivez le statut de vos invitations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrals.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun parrainage</h3>
                      <p className="text-gray-600">Commencez par inviter vos premiers amis</p>
                    </div>
                  ) : (
                    referrals.map((referral) => (
                      <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{referral.name}</h4>
                            <p className="text-sm text-gray-600">{referral.email}</p>
                            <p className="text-xs text-gray-500">
                              Invité le {new Date(referral.dateInvited).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(referral.status)}>{getStatusText(referral.status)}</Badge>
                          {referral.reward > 0 && (
                            <p className="text-sm font-medium text-green-600 mt-1">+{referral.reward} points</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress to Next Reward */}
            <Card>
              <CardHeader>
                <CardTitle>Progression</CardTitle>
                <CardDescription>Prochaine récompense</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Niveau Silver</span>
                      <span>{completedReferrals % 5}/5</span>
                    </div>
                    <Progress value={progressToNextReward} className="h-3" />
                    <p className="text-xs text-gray-600 mt-2">
                      {5 - (completedReferrals % 5)} parrainages pour débloquer le niveau Silver
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Récompense Silver</h4>
                    <p className="text-sm text-purple-700">
                      Bonus de 500 points + 25% de bonus sur tous les parrainages
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle>Comment ça marche ?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Partagez</h4>
                    <p className="text-sm text-gray-600">Envoyez votre code à vos amis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Ils s'inscrivent</h4>
                    <p className="text-sm text-gray-600">Vos amis créent un compte avec votre code</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Vous gagnez</h4>
                    <p className="text-sm text-gray-600">200 points quand ils passent leur première commande</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rewards Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Niveaux de récompenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50">
                  <span className="font-medium text-orange-800">Bronze</span>
                  <span className="text-sm text-orange-600">200 pts/parrainage</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <span className="font-medium text-gray-800">Silver</span>
                  <span className="text-sm text-gray-600">250 pts/parrainage</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-50">
                  <span className="font-medium text-yellow-800">Gold</span>
                  <span className="text-sm text-yellow-600">300 pts/parrainage</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50">
                  <span className="font-medium text-purple-800">Platinum</span>
                  <span className="text-sm text-purple-600">400 pts/parrainage</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
