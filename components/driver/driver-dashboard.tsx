"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Home,
  History,
  Wallet,
  User,
  Menu,
  X,
  LogOut,
  MapPin,
  Navigation,
  Clock,
  Star,
  Package,
  Bike,
  Phone,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  Bell,
  ChevronRight,
} from "lucide-react"

interface DriverDashboardProps {
  onLogout: () => void
}

type DriverScreen = "home" | "history" | "earnings" | "profile"

interface RideRequest {
  id: string
  type: "delivery" | "taxi"
  from: string
  to: string
  distance: string
  price: string
  customerName: string
  customerRating: number
}

export default function DriverDashboard({ onLogout }: DriverDashboardProps) {
  const [currentScreen, setCurrentScreen] = useState<DriverScreen>("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [currentRequest, setCurrentRequest] = useState<RideRequest | null>({
    id: "1",
    type: "delivery",
    from: "Restaurant Le Grillon, Gombe",
    to: "Avenue de la Paix, 234",
    distance: "4.5 km",
    price: "3,500 FC",
    customerName: "Marie Kongo",
    customerRating: 4.8,
  })

  const menuItems = [
    { id: "home" as DriverScreen, label: "Accueil", icon: Home },
    { id: "history" as DriverScreen, label: "Historique", icon: History },
    { id: "earnings" as DriverScreen, label: "Revenus", icon: Wallet },
    { id: "profile" as DriverScreen, label: "Profil", icon: User },
  ]

  const todayStats = {
    rides: 8,
    earnings: "24,500 FC",
    hours: "6.5h",
    rating: 4.9,
  }

  const handleAcceptRide = () => {
    setCurrentRequest(null)
    // In real app, would start navigation
  }

  const handleDeclineRide = () => {
    setCurrentRequest(null)
    // In real app, would notify backend
  }

  const renderHome = () => (
    <div className="space-y-6">
      {/* Status toggle */}
      <Card className="bg-white/5 border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold">Statut</h2>
            <p className={`text-sm ${isOnline ? "text-green-500" : "text-gray-400"}`}>
              {isOnline ? "En ligne - Prêt à recevoir des courses" : "Hors ligne"}
            </p>
          </div>
          <Switch checked={isOnline} onCheckedChange={setIsOnline} />
        </div>
      </Card>

      {/* Incoming request */}
      {currentRequest && isOnline && (
        <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full ${
                    currentRequest.type === "delivery" ? "bg-orange-500" : "bg-red-500"
                  } flex items-center justify-center`}
                >
                  {currentRequest.type === "delivery" ? (
                    <Package className="w-5 h-5 text-white" />
                  ) : (
                    <Bike className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold">Nouvelle course!</p>
                  <p className="text-orange-300 text-sm">
                    {currentRequest.type === "delivery" ? "Livraison" : "Taxi-moto"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">{currentRequest.price}</p>
                <p className="text-gray-400 text-sm">{currentRequest.distance}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-xs">Collecte</p>
                  <p className="text-white text-sm">{currentRequest.from}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Navigation className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-xs">Destination</p>
                  <p className="text-white text-sm">{currentRequest.to}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                  {currentRequest.customerName.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm">{currentRequest.customerName}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-400 text-xs">
                      {currentRequest.customerRating}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                size="icon"
                className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600"
              >
                <Phone className="w-5 h-5 text-white" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-12 bg-white/10 hover:bg-white/20 text-white"
                onClick={handleDeclineRide}
              >
                <XCircle className="w-5 h-5 mr-2" />
                Refuser
              </Button>
              <Button
                className="h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                onClick={handleAcceptRide}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Accepter
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Today's stats */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">{"Aujourd'hui"}</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Bike className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{todayStats.rides}</p>
                <p className="text-gray-400 text-sm">Courses</p>
              </div>
            </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{todayStats.earnings}</p>
                <p className="text-gray-400 text-sm">Revenus</p>
              </div>
            </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{todayStats.hours}</p>
                <p className="text-gray-400 text-sm">Heures</p>
              </div>
            </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{todayStats.rating}</p>
                <p className="text-gray-400 text-sm">Note</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent rides */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Courses récentes</h2>
          <Button
            variant="link"
            className="text-orange-500 p-0 h-auto"
            onClick={() => setCurrentScreen("history")}
          >
            Voir tout
          </Button>
        </div>
        <div className="space-y-3">
          {[
            {
              type: "delivery",
              from: "Restaurant Le Grillon",
              to: "Avenue Colonel Mondjiba",
              time: "Il y a 30 min",
              price: "2,500 FC",
            },
            {
              type: "taxi",
              from: "Gare Centrale",
              to: "Université de Kinshasa",
              time: "Il y a 1h",
              price: "4,000 FC",
            },
            {
              type: "delivery",
              from: "Pharmacie Centrale",
              to: "Résidence Mateba",
              time: "Il y a 2h",
              price: "1,800 FC",
            },
          ].map((ride, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${
                    ride.type === "delivery"
                      ? "bg-orange-500/20 text-orange-500"
                      : "bg-red-500/20 text-red-500"
                  } flex items-center justify-center`}
                >
                  {ride.type === "delivery" ? (
                    <Package className="w-5 h-5" />
                  ) : (
                    <Bike className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{ride.from}</p>
                  <p className="text-gray-400 text-sm truncate">{ride.to}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{ride.price}</p>
                  <p className="text-gray-500 text-xs">{ride.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEarnings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Mes Revenus</h2>

      {/* Total balance */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 border-0 p-6">
        <p className="text-white/80 mb-1">Solde disponible</p>
        <p className="text-4xl font-bold text-white mb-4">125,500 FC</p>
        <Button className="bg-white text-orange-600 hover:bg-white/90">
          <Wallet className="w-4 h-4 mr-2" />
          Retirer vers Mobile Money
        </Button>
      </Card>

      {/* Period stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Cette semaine</span>
          </div>
          <p className="text-2xl font-bold text-white">68,500 FC</p>
          <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
            <TrendingUp className="w-4 h-4" />
            <span>+12%</span>
          </div>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Ce mois</span>
          </div>
          <p className="text-2xl font-bold text-white">245,000 FC</p>
          <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
            <TrendingUp className="w-4 h-4" />
            <span>+8%</span>
          </div>
        </Card>
      </div>

      {/* Transaction history */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Transactions récentes</h3>
        <div className="space-y-3">
          {[
            { type: "earning", description: "Course #1234", amount: "+3,500 FC", date: "18 Jan, 14:30" },
            { type: "earning", description: "Course #1233", amount: "+2,500 FC", date: "18 Jan, 12:15" },
            { type: "withdrawal", description: "Retrait MTN Money", amount: "-50,000 FC", date: "17 Jan, 10:00" },
            { type: "earning", description: "Course #1232", amount: "+4,000 FC", date: "17 Jan, 09:45" },
          ].map((tx, index) => (
            <Card key={index} className="bg-white/5 border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${
                      tx.type === "earning" ? "bg-green-500/20" : "bg-orange-500/20"
                    } flex items-center justify-center`}
                  >
                    {tx.type === "earning" ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <Wallet className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-white">{tx.description}</p>
                    <p className="text-gray-500 text-sm">{tx.date}</p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    tx.type === "earning" ? "text-green-500" : "text-orange-500"
                  }`}
                >
                  {tx.amount}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderHistory = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Historique des courses</h2>

      <div className="space-y-3">
        {[
          { type: "delivery", from: "Restaurant Le Grillon", to: "Avenue Colonel Mondjiba", date: "18 Jan, 14:30", price: "2,500 FC", rating: 5 },
          { type: "taxi", from: "Gare Centrale", to: "Université de Kinshasa", date: "18 Jan, 12:15", price: "4,000 FC", rating: 5 },
          { type: "delivery", from: "Pharmacie Centrale", to: "Résidence Mateba", date: "18 Jan, 10:00", price: "1,800 FC", rating: 4 },
          { type: "taxi", from: "Aéroport N'Djili", to: "Hôtel Memling", date: "17 Jan, 16:30", price: "12,000 FC", rating: 5 },
          { type: "delivery", from: "Marché Total", to: "Avenue de la Paix", date: "17 Jan, 14:00", price: "2,200 FC", rating: 5 },
        ].map((ride, index) => (
          <Card key={index} className="bg-white/5 border-white/10 p-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl ${
                  ride.type === "delivery" ? "bg-orange-500/20 text-orange-500" : "bg-red-500/20 text-red-500"
                } flex items-center justify-center`}
              >
                {ride.type === "delivery" ? <Package className="w-6 h-6" /> : <Bike className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-medium">{ride.type === "delivery" ? "Livraison" : "Taxi-moto"}</p>
                  <p className="text-white font-semibold">{ride.price}</p>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-orange-500" />
                    <span className="text-gray-300">{ride.from}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3 h-3 text-red-500" />
                    <span className="text-gray-400">{ride.to}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-500 text-sm">{ride.date}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-400 text-sm">{ride.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Mon Profil</h2>

      {/* Profile card */}
      <Card className="bg-white/5 border-white/10 p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
          PM
        </div>
        <h3 className="text-xl font-bold text-white">Patrick Mbala</h3>
        <p className="text-gray-400">Chauffeur depuis Jan 2023</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-white font-semibold">4.9</span>
          <span className="text-gray-500">(342 courses)</span>
        </div>
      </Card>

      {/* Vehicle info */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-3">Véhicule</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Type</span>
            <span className="text-white">Moto</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Marque</span>
            <span className="text-white">Honda Wave</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Plaque</span>
            <span className="text-white">KIN-1234-AB</span>
          </div>
        </div>
      </Card>

      {/* Documents */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-3">Documents</h3>
        <div className="space-y-3">
          {[
            { label: "Permis de conduire", status: "verified" },
            { label: "Carte d'identité", status: "verified" },
            { label: "Assurance", status: "verified" },
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-white">{doc.label}</span>
              <span className="flex items-center gap-1 text-green-500 text-sm">
                <CheckCircle className="w-4 h-4" />
                Vérifié
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Logout */}
      <Button
        variant="ghost"
        className="w-full h-12 bg-red-500/10 hover:bg-red-500/20 text-red-500"
        onClick={onLogout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Déconnexion
      </Button>
    </div>
  )

  const renderContent = () => {
    switch (currentScreen) {
      case "earnings":
        return renderEarnings()
      case "history":
        return renderHistory()
      case "profile":
        return renderProfile()
      default:
        return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-400 hover:text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Image
              src="/images/logo-groupe-a-visuel.png"
              alt="A VISUEL Logo"
              width={40}
              height={40}
            />
            <div className="hidden sm:block">
              <span className="text-white font-semibold">A VISUEL Express</span>
              <span className="text-orange-500 text-sm ml-2">Chauffeur</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isOnline ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {isOnline ? "En ligne" : "Hors ligne"}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#1a1a2e] border-r border-white/10 p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-white font-semibold">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 text-gray-400" />
              </Button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full justify-start ${
                      currentScreen === item.id
                        ? "text-orange-500 bg-orange-500/10"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setCurrentScreen(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="p-4 md:p-6 max-w-4xl mx-auto pb-24 md:pb-6">{renderContent()}</main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e]/95 backdrop-blur-lg border-t border-white/10 md:hidden z-30">
        <div className="flex items-center justify-around py-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
                  currentScreen === item.id ? "text-orange-500" : "text-gray-400"
                }`}
                onClick={() => setCurrentScreen(item.id)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
