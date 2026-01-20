"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Package,
  Bike,
  MapPin,
  Clock,
  Bell,
  User,
  Home,
  History,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  Star,
  Navigation,
  Info,
  LogOut,
} from "lucide-react"
import DeliveryOrder from "./delivery-order"
import TaxiMotoOrder from "./taxi-moto-order"
import OrderTracking from "./order-tracking"
import ClientHistory from "./client-history"
import ClientProfile from "./client-profile"
import ClientChat from "./client-chat"
import AboutAVisuel from "@/components/about-avisuel"

interface ClientDashboardProps {
  onLogout: () => void
}

type ClientScreen =
  | "home"
  | "delivery"
  | "taxi"
  | "tracking"
  | "history"
  | "profile"
  | "chat"
  | "about"

export default function ClientDashboard({ onLogout }: ClientDashboardProps) {
  const [currentScreen, setCurrentScreen] = useState<ClientScreen>("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeOrder, setActiveOrder] = useState<{
    type: "delivery" | "taxi"
    status: string
  } | null>({
    type: "delivery",
    status: "en_route",
  })

  const menuItems = [
    { id: "home" as ClientScreen, label: "Accueil", icon: Home },
    { id: "history" as ClientScreen, label: "Historique", icon: History },
    { id: "chat" as ClientScreen, label: "Assistance", icon: MessageCircle },
    { id: "profile" as ClientScreen, label: "Profil", icon: User },
    { id: "about" as ClientScreen, label: "À propos", icon: Info },
  ]

  const handleStartDelivery = () => {
    setCurrentScreen("delivery")
    setIsMobileMenuOpen(false)
  }

  const handleStartTaxi = () => {
    setCurrentScreen("taxi")
    setIsMobileMenuOpen(false)
  }

  const handleOrderCreated = (type: "delivery" | "taxi") => {
    setActiveOrder({ type, status: "searching" })
    setCurrentScreen("tracking")
  }

  const renderContent = () => {
    switch (currentScreen) {
      case "delivery":
        return (
          <DeliveryOrder
            onBack={() => setCurrentScreen("home")}
            onOrderCreated={() => handleOrderCreated("delivery")}
          />
        )
      case "taxi":
        return (
          <TaxiMotoOrder
            onBack={() => setCurrentScreen("home")}
            onOrderCreated={() => handleOrderCreated("taxi")}
          />
        )
      case "tracking":
        return (
          <OrderTracking
            orderType={activeOrder?.type || "delivery"}
            onBack={() => setCurrentScreen("home")}
          />
        )
      case "history":
        return <ClientHistory onBack={() => setCurrentScreen("home")} />
      case "profile":
        return <ClientProfile onBack={() => setCurrentScreen("home")} />
      case "chat":
        return <ClientChat onBack={() => setCurrentScreen("home")} />
      case "about":
        return <AboutAVisuel onBack={() => setCurrentScreen("home")} />
      default:
        return renderHome()
    }
  }

  const renderHome = () => (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bonjour, Jean</h1>
          <p className="text-gray-400">Où souhaitez-vous aller aujourd'hui?</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-white/10 relative"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
      </div>

      {/* Active order banner */}
      {activeOrder && (
        <Card
          className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 cursor-pointer hover:bg-orange-500/25 transition-colors"
          onClick={() => setCurrentScreen("tracking")}
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                {activeOrder.type === "delivery" ? (
                  <Package className="w-5 h-5 text-white" />
                ) : (
                  <Bike className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <p className="text-white font-medium">
                  {activeOrder.type === "delivery" ? "Livraison en cours" : "Course en cours"}
                </p>
                <p className="text-orange-300 text-sm">Appuyez pour suivre</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <ChevronRight className="w-5 h-5 text-orange-400" />
            </div>
          </div>
        </Card>
      )}

      {/* Main services */}
      <div className="grid grid-cols-2 gap-4">
        <Card
          className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group overflow-hidden"
          onClick={handleStartDelivery}
        >
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-1">Livraison Express</h3>
            <p className="text-gray-400 text-sm">Colis, repas, documents</p>
          </div>
        </Card>

        <Card
          className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group overflow-hidden"
          onClick={handleStartTaxi}
        >
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Bike className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-1">Taxi-Moto</h3>
            <p className="text-gray-400 text-sm">Transport urbain</p>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Actions rapides</h2>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="ghost"
            className="h-auto py-4 flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300"
            onClick={handleStartTaxi}
          >
            <Navigation className="w-5 h-5 text-orange-500" />
            <span className="text-xs">Trajet immédiat</span>
          </Button>
          <Button
            variant="ghost"
            className="h-auto py-4 flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300"
            onClick={handleStartTaxi}
          >
            <Clock className="w-5 h-5 text-red-500" />
            <span className="text-xs">Réservation</span>
          </Button>
          <Button
            variant="ghost"
            className="h-auto py-4 flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300"
            onClick={handleStartTaxi}
          >
            <Bike className="w-5 h-5 text-orange-500" />
            <span className="text-xs">Location moto</span>
          </Button>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Activité récente</h2>
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
              from: "Marché Total",
              to: "Avenue de la Paix",
              date: "Aujourd'hui, 14:30",
              price: "2,500 FC",
              rating: 5,
            },
            {
              type: "taxi",
              from: "Gare Centrale",
              to: "Université de Kinshasa",
              date: "Hier, 09:15",
              price: "3,000 FC",
              rating: 4,
            },
            {
              type: "delivery",
              from: "Pharmacie Centrale",
              to: "Résidence Mateba",
              date: "20 Jan, 16:45",
              price: "1,800 FC",
              rating: 5,
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="p-4 flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${
                    item.type === "delivery"
                      ? "bg-orange-500/20 text-orange-500"
                      : "bg-red-500/20 text-red-500"
                  } flex items-center justify-center`}
                >
                  {item.type === "delivery" ? (
                    <Package className="w-5 h-5" />
                  ) : (
                    <Bike className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <p className="text-white text-sm truncate">{item.from}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-orange-500" />
                    <p className="text-gray-400 text-sm truncate">{item.to}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{item.price}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-400 text-xs">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

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
            <span className="text-white font-semibold hidden sm:block">A VISUEL Express</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`text-sm ${
                    currentScreen === item.id
                      ? "text-orange-500 bg-orange-500/10"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setCurrentScreen(item.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 ml-2"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#1a1a2e] border-r border-white/10 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-groupe-a-visuel.png"
                  alt="A VISUEL Logo"
                  width={40}
                  height={40}
                />
                <span className="text-white font-semibold">A VISUEL</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
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

            <div className="absolute bottom-6 left-6 right-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
                onClick={onLogout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="p-4 md:p-6 max-w-4xl mx-auto pb-24 md:pb-6">{renderContent()}</main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e]/95 backdrop-blur-lg border-t border-white/10 md:hidden z-30">
        <div className="flex items-center justify-around py-2">
          {menuItems.slice(0, 4).map((item) => {
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
