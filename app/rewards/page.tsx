"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Package, Gift, Star, Trophy, Zap, Crown, Target } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Reward {
  id: string
  title: string
  description: string
  points: number
  type: "discount" | "free_delivery" | "upgrade" | "gift"
  available: boolean
  expiresAt?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export default function RewardsPage() {
  const [currentPoints, setCurrentPoints] = useState(1250)
  const [currentLevel, setCurrentLevel] = useState("Gold")
  const [nextLevelPoints, setNextLevelPoints] = useState(1500)
  const [rewards, setRewards] = useState<Reward[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    const mockRewards: Reward[] = [
      {
        id: "1",
        title: "Livraison gratuite",
        description: "Une livraison standard gratuite",
        points: 200,
        type: "free_delivery",
        available: true,
      },
      {
        id: "2",
        title: "Réduction 15%",
        description: "15% de réduction sur votre prochaine commande",
        points: 300,
        type: "discount",
        available: true,
        expiresAt: "2024-02-15",
      },
      {
        id: "3",
        title: "Upgrade Express",
        description: "Surclassement gratuit vers la livraison express",
        points: 400,
        type: "upgrade",
        available: true,
      },
      {
        id: "4",
        title: "Cadeau SkyDeliver",
        description: "Goodies exclusifs SkyDeliver",
        points: 800,
        type: "gift",
        available: true,
      },
      {
        id: "5",
        title: "Réduction 25%",
        description: "25% de réduction sur votre prochaine commande",
        points: 600,
        type: "discount",
        available: false,
      },
    ]

    const mockAchievements: Achievement[] = [
      {
        id: "1",
        title: "Premier vol",
        description: "Effectuer votre première livraison par drone",
        icon: "🚁",
        unlocked: true,
      },
      {
        id: "2",
        title: "Habitué du ciel",
        description: "Effectuer 10 livraisons",
        icon: "⭐",
        unlocked: true,
      },
      {
        id: "3",
        title: "Explorateur urbain",
        description: "Livraisons dans 5 quartiers différents",
        icon: "🗺️",
        unlocked: true,
      },
      {
        id: "4",
        title: "Écolo convaincu",
        description: "Économiser 10kg de CO₂",
        icon: "🌱",
        unlocked: true,
      },
      {
        id: "5",
        title: "Speedster",
        description: "Effectuer 50 livraisons express",
        icon: "⚡",
        unlocked: false,
        progress: 32,
        maxProgress: 50,
      },
      {
        id: "6",
        title: "Ambassadeur",
        description: "Parrainer 3 nouveaux utilisateurs",
        icon: "👥",
        unlocked: false,
        progress: 1,
        maxProgress: 3,
      },
    ]

    setRewards(mockRewards)
    setAchievements(mockAchievements)
  }, [])

  const redeemReward = (rewardId: string, points: number) => {
    if (currentPoints >= points) {
      setCurrentPoints((prev) => prev - points)
      setRewards((prev) => prev.map((reward) => (reward.id === rewardId ? { ...reward, available: false } : reward)))
      alert("Récompense échangée avec succès !")
    }
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Gift className="h-5 w-5 text-purple-600" />
      case "free_delivery":
        return <Package className="h-5 w-5 text-blue-600" />
      case "upgrade":
        return <Zap className="h-5 w-5 text-orange-600" />
      case "gift":
        return <Trophy className="h-5 w-5 text-yellow-600" />
      default:
        return <Star className="h-5 w-5 text-gray-600" />
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Bronze":
        return <Target className="h-6 w-6 text-orange-600" />
      case "Silver":
        return <Star className="h-6 w-6 text-gray-400" />
      case "Gold":
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case "Platinum":
        return <Crown className="h-6 w-6 text-purple-600" />
      default:
        return <Star className="h-6 w-6 text-gray-600" />
    }
  }

  const progressToNextLevel = ((currentPoints % 500) / 500) * 100

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Programme de fidélité</h1>
          <p className="text-xl text-gray-600">Gagnez des points et débloquez des récompenses exclusives</p>
        </div>

        {/* Points & Level Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">{getLevelIcon(currentLevel)}</div>
                <h2 className="text-2xl font-bold mb-2">Niveau {currentLevel}</h2>
                <p className="text-blue-100">Votre statut actuel</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{currentPoints}</div>
                <p className="text-blue-100">Points disponibles</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression vers Platinum</span>
                  <span>
                    {currentPoints}/{nextLevelPoints}
                  </span>
                </div>
                <Progress value={progressToNextLevel} className="h-3 bg-blue-500" />
                <p className="text-xs text-blue-100 mt-2">
                  {nextLevelPoints - currentPoints} points pour le niveau suivant
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rewards */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="h-5 w-5" />
                  <span>Récompenses disponibles</span>
                </CardTitle>
                <CardDescription>Échangez vos points contre des avantages exclusifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewards.map((reward) => (
                    <div key={reward.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {getRewardIcon(reward.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{reward.title}</h3>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                          {reward.expiresAt && (
                            <p className="text-xs text-orange-600">
                              Expire le {new Date(reward.expiresAt).toLocaleDateString("fr-FR")}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{reward.points} pts</span>
                        </div>
                        <Button
                          size="sm"
                          disabled={!reward.available || currentPoints < reward.points}
                          onClick={() => redeemReward(reward.id, reward.points)}
                        >
                          {!reward.available
                            ? "Indisponible"
                            : currentPoints < reward.points
                              ? "Pas assez de points"
                              : "Échanger"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How to Earn Points */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Comment gagner des points ?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Package className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Commandes</h4>
                      <p className="text-sm text-gray-600">10 points par euro dépensé</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Star className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Avis</h4>
                      <p className="text-sm text-gray-600">50 points par avis laissé</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Trophy className="h-8 w-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Parrainage</h4>
                      <p className="text-sm text-gray-600">200 points par filleul</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <Target className="h-8 w-8 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Défis</h4>
                      <p className="text-sm text-gray-600">Bonus variables</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Succès</span>
                </CardTitle>
                <CardDescription>Vos accomplissements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg border ${achievement.unlocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${achievement.unlocked ? "text-green-800" : "text-gray-700"}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${achievement.unlocked ? "text-green-600" : "text-gray-600"}`}>
                            {achievement.description}
                          </p>
                          {!achievement.unlocked && achievement.progress !== undefined && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progression</span>
                                <span>
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={(achievement.progress / achievement.maxProgress!) * 100}
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                        {achievement.unlocked && <Badge className="bg-green-100 text-green-800">Débloqué</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referral Program */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Programme de parrainage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Gift className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Parrainez vos amis</h3>
                    <p className="text-sm text-gray-600">Vous et votre ami recevez 200 points chacun</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm font-mono">SKYDELIVER2024</p>
                    <p className="text-xs text-gray-600">Votre code de parrainage</p>
                  </div>
                  <Button className="w-full">Partager le code</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
