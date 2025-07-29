"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Phone, Package, ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { validateForm, emailRules, passwordRules, nameRules, phoneRules } from "@/lib/validation"

export default function AuthPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login, register, isLoading, error, isAuthenticated, clearError, isInitialized } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  // Only redirect if initialized and authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isInitialized, isAuthenticated, router])

  // Clear errors when switching modes
  useEffect(() => {
    clearError()
    setFormErrors({})
  }, [isLogin, clearError])

  // Don't render until initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  // Don't render if authenticated (will redirect)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Redirection...</p>
        </div>
      </div>
    )
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    // Validate form
    const errors = validateForm(loginForm, {
      email: emailRules,
      password: passwordRules,
    })

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      await login(loginForm)
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue sur SkyDeliver",
      })
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    // Validate form
    const errors = validateForm(registerForm, {
      firstName: nameRules,
      lastName: nameRules,
      email: emailRules,
      password: passwordRules,
      phone: phoneRules,
    })

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      await register(registerForm)
      toast({
        title: "Inscription réussie !",
        description: "Votre compte a été créé avec succès",
      })
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  const features = [
    {
      icon: Package,
      title: "Livraison Ultra-Rapide",
      description: "15-30 minutes en moyenne",
    },
    {
      icon: CheckCircle,
      title: "100% Sécurisé",
      description: "Assurance complète incluse",
    },
    {
      icon: ArrowRight,
      title: "Suivi Temps Réel",
      description: "Suivez votre colis en direct",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left section - Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Package className="h-8 w-8" />
                <span className="text-2xl font-bold">SkyDeliver</span>
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Révolutionnez vos
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  livraisons
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Rejoignez des milliers d'utilisateurs qui font confiance à notre technologie de livraison par drone.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-sm"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">+50,000 utilisateurs satisfaits</p>
                  <p className="text-sm text-gray-600">Note moyenne: 4.9/5 ⭐</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right section - Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">{isLogin ? "Connexion" : "Créer un compte"}</CardTitle>
                <CardDescription>
                  {isLogin
                    ? "Connectez-vous à votre compte SkyDeliver"
                    : "Rejoignez la révolution de la livraison par drone"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Mode toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Connexion
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      !isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Inscription
                  </button>
                </div>

                {/* Demo accounts */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-800 mb-2">Comptes de démonstration :</p>
                  <div className="space-y-1 text-xs text-blue-700">
                    <p>👤 demo@skydeliver.com / demo123</p>
                    <p>👨‍💼 admin@skydeliver.com / admin123</p>
                  </div>
                </div>

                {/* Login form */}
                {isLogin ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          className={`pl-10 ${formErrors.email ? "border-red-500" : ""}`}
                          value={loginForm.email}
                          onChange={(e) => {
                            setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                            if (formErrors.email) {
                              setFormErrors((prev) => ({ ...prev, email: "" }))
                            }
                          }}
                          required
                        />
                      </div>
                      {formErrors.email && <p className="text-sm text-red-600">{formErrors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`pl-10 pr-10 ${formErrors.password ? "border-red-500" : ""}`}
                          value={loginForm.password}
                          onChange={(e) => {
                            setLoginForm((prev) => ({ ...prev, password: e.target.value }))
                            if (formErrors.password) {
                              setFormErrors((prev) => ({ ...prev, password: "" }))
                            }
                          }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {formErrors.password && <p className="text-sm text-red-600">{formErrors.password}</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connexion...
                        </>
                      ) : (
                        <>
                          Se connecter
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  /* Register form */
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="firstName"
                            placeholder="Jean"
                            className={`pl-10 ${formErrors.firstName ? "border-red-500" : ""}`}
                            value={registerForm.firstName}
                            onChange={(e) => {
                              setRegisterForm((prev) => ({ ...prev, firstName: e.target.value }))
                              if (formErrors.firstName) {
                                setFormErrors((prev) => ({ ...prev, firstName: "" }))
                              }
                            }}
                            required
                          />
                        </div>
                        {formErrors.firstName && <p className="text-sm text-red-600">{formErrors.firstName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="lastName"
                            placeholder="Dupont"
                            className={`pl-10 ${formErrors.lastName ? "border-red-500" : ""}`}
                            value={registerForm.lastName}
                            onChange={(e) => {
                              setRegisterForm((prev) => ({ ...prev, lastName: e.target.value }))
                              if (formErrors.lastName) {
                                setFormErrors((prev) => ({ ...prev, lastName: "" }))
                              }
                            }}
                            required
                          />
                        </div>
                        {formErrors.lastName && <p className="text-sm text-red-600">{formErrors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="jean.dupont@email.com"
                          className={`pl-10 ${formErrors.email ? "border-red-500" : ""}`}
                          value={registerForm.email}
                          onChange={(e) => {
                            setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
                            if (formErrors.email) {
                              setFormErrors((prev) => ({ ...prev, email: "" }))
                            }
                          }}
                          required
                        />
                      </div>
                      {formErrors.email && <p className="text-sm text-red-600">{formErrors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+33 1 23 45 67 89"
                          className={`pl-10 ${formErrors.phone ? "border-red-500" : ""}`}
                          value={registerForm.phone}
                          onChange={(e) => {
                            setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))
                            if (formErrors.phone) {
                              setFormErrors((prev) => ({ ...prev, phone: "" }))
                            }
                          }}
                        />
                      </div>
                      {formErrors.phone && <p className="text-sm text-red-600">{formErrors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`pl-10 pr-10 ${formErrors.password ? "border-red-500" : ""}`}
                          value={registerForm.password}
                          onChange={(e) => {
                            setRegisterForm((prev) => ({ ...prev, password: e.target.value }))
                            if (formErrors.password) {
                              setFormErrors((prev) => ({ ...prev, password: "" }))
                            }
                          }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {formErrors.password && <p className="text-sm text-red-600">{formErrors.password}</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Création...
                        </>
                      ) : (
                        <>
                          Créer mon compte
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}

                {/* Global error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                {/* Terms */}
                <p className="text-xs text-gray-600 text-center">
                  En vous inscrivant, vous acceptez nos{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                    Conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
