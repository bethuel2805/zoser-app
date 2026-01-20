"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Home,
  Package,
  History,
  Wallet,
  User,
  Menu,
  X,
  LogOut,
  MapPin,
  Clock,
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Truck,
  ChevronRight,
  Bell,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
} from "lucide-react"

interface VendorDashboardProps {
  onLogout: () => void
}

type VendorScreen = "home" | "deliveries" | "inventory" | "finances" | "profile"

export default function VendorDashboard({ onLogout }: VendorDashboardProps) {
  const [currentScreen, setCurrentScreen] = useState<VendorScreen>("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNewDelivery, setShowNewDelivery] = useState(false)

  const menuItems = [
    { id: "home" as VendorScreen, label: "Tableau de bord", icon: Home },
    { id: "deliveries" as VendorScreen, label: "Livraisons", icon: Truck },
    { id: "inventory" as VendorScreen, label: "Stock", icon: Package },
    { id: "finances" as VendorScreen, label: "Finances", icon: Wallet },
    { id: "profile" as VendorScreen, label: "Profil", icon: User },
  ]

  const stats = {
    todayDeliveries: 12,
    pendingDeliveries: 3,
    monthlyRevenue: "450,000 FC",
    revenueChange: +15,
    availableBalance: "125,500 FC",
    totalStock: 156,
  }

  const recentDeliveries = [
    { id: "DEL-001", customer: "Marie Kongo", address: "Avenue de la Paix, 234", status: "delivered", time: "14:30", amount: "8,500 FC" },
    { id: "DEL-002", customer: "Jean Mukendi", address: "Boulevard du 30 Juin", status: "in_transit", time: "13:45", amount: "12,000 FC" },
    { id: "DEL-003", customer: "Patrick Luzolo", address: "Commune de Gombe", status: "pending", time: "12:00", amount: "5,500 FC" },
  ]

  const renderHome = () => (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bonjour, Boutique Mama Marie</h1>
          <p className="text-gray-400">{"Voici un aperçu de votre activité"}</p>
        </div>
        <Button
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          onClick={() => setShowNewDelivery(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle livraison
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <Truck className="w-5 h-5 text-orange-500" />
            <span className="text-green-500 text-xs flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.todayDeliveries}</p>
          <p className="text-gray-400 text-sm">{"Livraisons aujourd'hui"}</p>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.pendingDeliveries}</p>
          <p className="text-gray-400 text-sm">En attente</p>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-green-500 text-xs flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{stats.revenueChange}%
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.monthlyRevenue}</p>
          <p className="text-gray-400 text-sm">Revenus du mois</p>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalStock}</p>
          <p className="text-gray-400 text-sm">Articles en stock</p>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="ghost"
          className="h-auto py-4 flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300"
          onClick={() => setShowNewDelivery(true)}
        >
          <Truck className="w-6 h-6 text-orange-500" />
          <span className="text-xs">Commander livreur</span>
        </Button>
        <Button
          variant="ghost"
          className="h-auto py-4 flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300"
          onClick={() => setCurrentScreen("inventory")}
        >
          <Package className="w-6 h-6 text-blue-500" />
          <span className="text-xs">Gérer stock</span>
        </Button>
        <Button
          variant="ghost"
          className="h-auto py-4 flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300"
          onClick={() => setCurrentScreen("finances")}
        >
          <Wallet className="w-6 h-6 text-green-500" />
          <span className="text-xs">Retirer fonds</span>
        </Button>
      </div>

      {/* Recent deliveries */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Livraisons récentes</h2>
          <Button
            variant="link"
            className="text-orange-500 p-0 h-auto"
            onClick={() => setCurrentScreen("deliveries")}
          >
            Voir tout
          </Button>
        </div>
        <div className="space-y-3">
          {recentDeliveries.map((delivery) => (
            <Card
              key={delivery.id}
              className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    delivery.status === "delivered"
                      ? "bg-green-500/20 text-green-500"
                      : delivery.status === "in_transit"
                        ? "bg-orange-500/20 text-orange-500"
                        : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {delivery.status === "delivered" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : delivery.status === "in_transit" ? (
                    <Truck className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{delivery.customer}</p>
                    <p className="text-white font-semibold">{delivery.amount}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <p className="text-gray-400 truncate">{delivery.address}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-500 text-xs">{delivery.id}</span>
                    <span className="text-gray-500 text-xs">{delivery.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* New delivery modal */}
      {showNewDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowNewDelivery(false)} />
          <Card className="relative z-10 w-full max-w-md bg-[#1a1a2e] border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Nouvelle livraison</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowNewDelivery(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Nom du client</Label>
                <Input placeholder="Nom complet" className="mt-1 bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label className="text-white">Téléphone</Label>
                <Input placeholder="+243 XXX XXX XXX" className="mt-1 bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label className="text-white">Adresse de livraison</Label>
                <Input placeholder="Adresse complète" className="mt-1 bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label className="text-white">Description du colis</Label>
                <Input placeholder="Articles à livrer" className="mt-1 bg-white/5 border-white/10 text-white" />
              </div>
              <Button
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={() => setShowNewDelivery(false)}
              >
                Commander un livreur
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )

  const renderDeliveries = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Livraisons</h2>
        <Button
          className="bg-gradient-to-r from-orange-500 to-red-500"
          onClick={() => setShowNewDelivery(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle
        </Button>
      </div>

      {/* Search and filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Rechercher..." className="pl-10 bg-white/5 border-white/10 text-white" />
        </div>
        <Button variant="ghost" className="bg-white/5 hover:bg-white/10 text-gray-400">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["Toutes", "En attente", "En cours", "Livrées", "Annulées"].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            size="sm"
            className={`rounded-full whitespace-nowrap ${
              tab === "Toutes"
                ? "bg-orange-500/20 text-orange-500"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Deliveries list */}
      <div className="space-y-3">
        {[
          ...recentDeliveries,
          { id: "DEL-004", customer: "Sarah Mbala", address: "Commune de Limete", status: "delivered", time: "11:30", amount: "7,000 FC" },
          { id: "DEL-005", customer: "Emmanuel Tshisekedi", address: "Avenue Kasavubu", status: "cancelled", time: "10:00", amount: "4,500 FC" },
        ].map((delivery) => (
          <Card key={delivery.id} className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    delivery.status === "delivered"
                      ? "bg-green-500/20 text-green-500"
                      : delivery.status === "in_transit"
                        ? "bg-orange-500/20 text-orange-500"
                        : delivery.status === "cancelled"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {delivery.status === "delivered" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : delivery.status === "cancelled" ? (
                    <XCircle className="w-5 h-5" />
                  ) : delivery.status === "in_transit" ? (
                    <Truck className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{delivery.customer}</p>
                  <p className="text-gray-500 text-xs">{delivery.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{delivery.amount}</p>
                <p className="text-gray-500 text-xs">{delivery.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm mb-3">
              <MapPin className="w-3 h-3 text-orange-500" />
              <p className="text-gray-400">{delivery.address}</p>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  delivery.status === "delivered"
                    ? "bg-green-500/20 text-green-500"
                    : delivery.status === "in_transit"
                      ? "bg-orange-500/20 text-orange-500"
                      : delivery.status === "cancelled"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-yellow-500/20 text-yellow-500"
                }`}
              >
                {delivery.status === "delivered"
                  ? "Livrée"
                  : delivery.status === "in_transit"
                    ? "En cours"
                    : delivery.status === "cancelled"
                      ? "Annulée"
                      : "En attente"}
              </span>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Eye className="w-4 h-4 mr-1" />
                Détails
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Gestion du Stock</h2>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {/* Stock stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-white/5 border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-white">156</p>
          <p className="text-gray-400 text-sm">Total articles</p>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-500">12</p>
          <p className="text-gray-400 text-sm">Stock faible</p>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-red-500">3</p>
          <p className="text-gray-400 text-sm">Rupture</p>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Rechercher un article..." className="pl-10 bg-white/5 border-white/10 text-white" />
      </div>

      {/* Stock list */}
      <div className="space-y-3">
        {[
          { name: "Téléphone Samsung A54", sku: "TECH-001", stock: 25, price: "350,000 FC", status: "ok" },
          { name: "Écouteurs Bluetooth", sku: "TECH-002", stock: 8, price: "25,000 FC", status: "low" },
          { name: "Chargeur rapide USB-C", sku: "TECH-003", stock: 45, price: "15,000 FC", status: "ok" },
          { name: "Coque iPhone 14", sku: "ACC-001", stock: 0, price: "8,000 FC", status: "out" },
          { name: "Câble USB 2m", sku: "ACC-002", stock: 3, price: "5,000 FC", status: "low" },
        ].map((item) => (
          <Card key={item.sku} className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.sku}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{item.price}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === "ok"
                        ? "bg-green-500"
                        : item.status === "low"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                  <span className="text-gray-400 text-sm">{item.stock} en stock</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderFinances = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Finances</h2>

      {/* Balance card */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 border-0 p-6">
        <p className="text-white/80 mb-1">Solde disponible</p>
        <p className="text-4xl font-bold text-white mb-4">{stats.availableBalance}</p>
        <Button className="bg-white text-orange-600 hover:bg-white/90">
          <Wallet className="w-4 h-4 mr-2" />
          Retirer vers Mobile Money
        </Button>
      </Card>

      {/* Revenue stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/5 border-white/10 p-4">
          <p className="text-gray-400 text-sm mb-1">{"Revenus aujourd'hui"}</p>
          <p className="text-2xl font-bold text-white">45,500 FC</p>
          <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
            <TrendingUp className="w-4 h-4" />
            <span>+12%</span>
          </div>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4">
          <p className="text-gray-400 text-sm mb-1">Ce mois</p>
          <p className="text-2xl font-bold text-white">{stats.monthlyRevenue}</p>
          <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
            <TrendingUp className="w-4 h-4" />
            <span>+{stats.revenueChange}%</span>
          </div>
        </Card>
      </div>

      {/* Commission info */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-3">Commissions</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Ventes brutes</span>
            <span className="text-white">500,000 FC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Commission A VISUEL (5%)</span>
            <span className="text-red-500">-25,000 FC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Frais de livraison</span>
            <span className="text-red-500">-24,500 FC</span>
          </div>
          <div className="border-t border-white/10 my-2" />
          <div className="flex justify-between">
            <span className="text-white font-semibold">Net</span>
            <span className="text-green-500 font-semibold">{stats.monthlyRevenue}</span>
          </div>
        </div>
      </Card>

      {/* Transaction history */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Transactions récentes</h3>
        <div className="space-y-3">
          {[
            { type: "sale", description: "Vente #V-1234", amount: "+8,500 FC", date: "18 Jan, 14:30" },
            { type: "sale", description: "Vente #V-1233", amount: "+12,000 FC", date: "18 Jan, 13:00" },
            { type: "withdrawal", description: "Retrait MTN Money", amount: "-100,000 FC", date: "17 Jan, 10:00" },
            { type: "sale", description: "Vente #V-1232", amount: "+5,500 FC", date: "17 Jan, 09:30" },
          ].map((tx, index) => (
            <Card key={index} className="bg-white/5 border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "sale" ? "bg-green-500/20" : "bg-orange-500/20"
                    }`}
                  >
                    {tx.type === "sale" ? (
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
                <p className={`font-semibold ${tx.type === "sale" ? "text-green-500" : "text-orange-500"}`}>
                  {tx.amount}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Profil Vendeur</h2>

      {/* Profile card */}
      <Card className="bg-white/5 border-white/10 p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
          BM
        </div>
        <h3 className="text-xl font-bold text-white">Boutique Mama Marie</h3>
        <p className="text-gray-400">Électronique & Accessoires</p>
        <p className="text-gray-500 text-sm mt-2">Membre depuis Janvier 2023</p>
      </Card>

      {/* Business info */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-3">Informations commerciales</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">RCCM</span>
            <span className="text-white">KIN/RCCM/23-A-12345</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">NIF</span>
            <span className="text-white">A1234567P</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Téléphone</span>
            <span className="text-white">+243 812 345 678</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email</span>
            <span className="text-white">contact@mamamarie.cd</span>
          </div>
        </div>
      </Card>

      {/* Address */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-3">Adresse du magasin</h3>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
          <p className="text-gray-300">
            Avenue du Commerce, 456
            <br />
            Commune de Gombe
            <br />
            Kinshasa, RDC
          </p>
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
      case "deliveries":
        return renderDeliveries()
      case "inventory":
        return renderInventory()
      case "finances":
        return renderFinances()
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
              <span className="text-orange-500 text-sm ml-2">Vendeur</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#1a1a2e] border-r border-white/10 p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-white font-semibold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
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
          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  currentScreen === item.id ? "text-orange-500" : "text-gray-400"
                }`}
                onClick={() => setCurrentScreen(item.id)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label.split(" ")[0]}</span>
              </Button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
