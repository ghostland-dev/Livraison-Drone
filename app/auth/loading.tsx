import { Loader2 } from "lucide-react"

export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">Chargement...</h2>
          <p className="text-sm text-gray-600">Préparation de votre espace SkyDeliver</p>
        </div>
      </div>
    </div>
  )
}
