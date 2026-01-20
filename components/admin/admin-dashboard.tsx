"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Users,
  Package,
  Bike,
  Store,
  BarChart3,
  Settings,
  Bell,
  Search,
  LogOut,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Ban,
  UserCheck,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

interface AdminDashboardProps {
  onLogout: () => void;
}

type AdminView = "dashboard" | "users" | "drivers" | "vendors" | "orders" | "analytics" | "settings";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "suspended" | "pending";
  totalOrders: number;
  joinDate: string;
  lastActive: string;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleType: "moto" | "velo" | "voiture";
  status: "online" | "offline" | "busy";
  rating: number;
  totalDeliveries: number;
  earnings: number;
  verified: boolean;
}

interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  category: string;
  status: "active" | "pending" | "suspended";
  totalOrders: number;
  revenue: number;
  commission: number;
}

interface Order {
  id: string;
  type: "delivery" | "taxi-moto";
  client: string;
  driver: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  amount: number;
  date: string;
  pickup: string;
  destination: string;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    totalUsers: 12458,
    activeDrivers: 342,
    totalVendors: 156,
    todayOrders: 1247,
    todayRevenue: 4850000,
    pendingApprovals: 23,
    completionRate: 94.5,
    avgDeliveryTime: 28,
  };

  const recentOrders: Order[] = [
    { id: "ORD-001", type: "delivery", client: "Jean Makaya", driver: "Pierre Mbemba", status: "completed", amount: 3500, date: "14:30", pickup: "Poto-Poto", destination: "Bacongo" },
    { id: "ORD-002", type: "taxi-moto", client: "Marie Ngoma", driver: "Paul Kiese", status: "in_progress", amount: 2000, date: "14:25", pickup: "Centre-ville", destination: "Moungali" },
    { id: "ORD-003", type: "delivery", client: "Patrick Loemba", driver: "En attente", status: "pending", amount: 5000, date: "14:20", pickup: "Ouenze", destination: "Talangai" },
    { id: "ORD-004", type: "delivery", client: "Alice Moukoko", driver: "David Nzaba", status: "completed", amount: 4500, date: "14:15", pickup: "Bacongo", destination: "Makélékélé" },
    { id: "ORD-005", type: "taxi-moto", client: "Bruno Okemba", driver: "Samuel Ngouabi", status: "cancelled", amount: 1500, date: "14:10", pickup: "Moungali", destination: "Poto-Poto" },
  ];

  const users: User[] = [
    { id: "USR-001", name: "Jean Makaya", email: "jean@email.com", phone: "+242 06 XXX XXXX", status: "active", totalOrders: 45, joinDate: "2024-01-15", lastActive: "Aujourd'hui" },
    { id: "USR-002", name: "Marie Ngoma", email: "marie@email.com", phone: "+242 05 XXX XXXX", status: "active", totalOrders: 32, joinDate: "2024-02-20", lastActive: "Hier" },
    { id: "USR-003", name: "Patrick Loemba", email: "patrick@email.com", phone: "+242 06 XXX XXXX", status: "pending", totalOrders: 0, joinDate: "2025-01-17", lastActive: "Jamais" },
    { id: "USR-004", name: "Alice Moukoko", email: "alice@email.com", phone: "+242 04 XXX XXXX", status: "suspended", totalOrders: 12, joinDate: "2023-11-10", lastActive: "Il y a 1 mois" },
  ];

  const drivers: Driver[] = [
    { id: "DRV-001", name: "Pierre Mbemba", phone: "+242 06 XXX XXXX", vehicleType: "moto", status: "online", rating: 4.8, totalDeliveries: 1250, earnings: 850000, verified: true },
    { id: "DRV-002", name: "Paul Kiese", phone: "+242 05 XXX XXXX", vehicleType: "moto", status: "busy", rating: 4.6, totalDeliveries: 980, earnings: 720000, verified: true },
    { id: "DRV-003", name: "David Nzaba", phone: "+242 06 XXX XXXX", vehicleType: "velo", status: "offline", rating: 4.9, totalDeliveries: 560, earnings: 380000, verified: true },
    { id: "DRV-004", name: "Samuel Ngouabi", phone: "+242 04 XXX XXXX", vehicleType: "moto", status: "online", rating: 4.2, totalDeliveries: 320, earnings: 240000, verified: false },
  ];

  const vendors: Vendor[] = [
    { id: "VND-001", businessName: "Restaurant Le Bantou", ownerName: "Michel Sassou", phone: "+242 06 XXX XXXX", category: "Restaurant", status: "active", totalOrders: 450, revenue: 2250000, commission: 225000 },
    { id: "VND-002", businessName: "Pharmacie Centrale", ownerName: "Dr. Claire Mbongo", phone: "+242 05 XXX XXXX", category: "Pharmacie", status: "active", totalOrders: 320, revenue: 1600000, commission: 160000 },
    { id: "VND-003", businessName: "SuperMarché Plus", ownerName: "Joseph Ndalla", phone: "+242 06 XXX XXXX", category: "Supermarché", status: "pending", totalOrders: 0, revenue: 0, commission: 0 },
    { id: "VND-004", businessName: "Boutique Mode Africa", ownerName: "Francine Okoko", phone: "+242 04 XXX XXXX", category: "Mode", status: "suspended", totalOrders: 85, revenue: 425000, commission: 42500 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "online":
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "pending":
      case "busy":
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "suspended":
      case "offline":
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: "Actif",
      pending: "En attente",
      suspended: "Suspendu",
      online: "En ligne",
      offline: "Hors ligne",
      busy: "Occupé",
      completed: "Terminé",
      in_progress: "En cours",
      cancelled: "Annulé",
    };
    return labels[status] || status;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-CG", { style: "decimal" }).format(amount) + " FCFA";
  };

  const menuItems = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "users", label: "Utilisateurs", icon: Users },
    { id: "drivers", label: "Chauffeurs", icon: Bike },
    { id: "vendors", label: "Vendeurs", icon: Store },
    { id: "orders", label: "Commandes", icon: Package },
    { id: "analytics", label: "Analytiques", icon: BarChart3 },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  const renderSidebar = () => (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a2e] border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-groupe-a-visuel.png" alt="A VISUEL" width={40} height={40} className="rounded-lg" />
            <div>
              <h1 className="font-bold text-white">A VISUEL</h1>
              <p className="text-xs text-white/60">Admin Panel</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden text-white/60" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id as AdminView);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                currentView === item.id ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.id === "orders" && (
                <Badge className="ml-auto bg-red-500 text-white text-xs">{stats.pendingApprovals}</Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={onLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </Button>
        </div>
      </div>
    </aside>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Utilisateurs</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +12% ce mois
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Chauffeurs actifs</p>
                <p className="text-2xl font-bold text-white">{stats.activeDrivers}</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +8% ce mois
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Bike className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Commandes du jour</p>
                <p className="text-2xl font-bold text-white">{stats.todayOrders.toLocaleString()}</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +15% vs hier
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Revenus du jour</p>
                <p className="text-2xl font-bold text-white">{(stats.todayRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +22% vs hier
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{stats.pendingApprovals}</p>
              <p className="text-xs text-white/60">Approbations en attente</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{stats.completionRate}%</p>
              <p className="text-xs text-white/60">Taux de complétion</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{stats.avgDeliveryTime} min</p>
              <p className="text-xs text-white/60">Temps moyen livraison</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{stats.totalVendors}</p>
              <p className="text-xs text-white/60">Partenaires actifs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1a1a2e]/80 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-white">Commandes récentes</CardTitle>
          <Button variant="ghost" size="sm" className="text-orange-400">
            Voir tout <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${order.type === "delivery" ? "bg-orange-500/20" : "bg-blue-500/20"}`}>
                    {order.type === "delivery" ? <Package className="w-5 h-5 text-orange-400" /> : <Bike className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <p className="font-medium text-white">{order.id}</p>
                    <p className="text-xs text-white/60">{order.client} - {order.pickup} → {order.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">{formatCurrency(order.amount)}</p>
                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>{getStatusLabel(order.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input placeholder="Rechercher un utilisateur..." className="pl-10 bg-white/5 border-white/10 text-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/20 text-white bg-transparent">
            <Filter className="w-4 h-4 mr-2" /> Filtrer
          </Button>
          <Button variant="outline" className="border-white/20 text-white bg-transparent">
            <Download className="w-4 h-4 mr-2" /> Exporter
          </Button>
        </div>
      </div>

      <Card className="bg-[#1a1a2e]/80 border-white/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/60 font-medium">Utilisateur</th>
                  <th className="text-left p-4 text-white/60 font-medium">Contact</th>
                  <th className="text-left p-4 text-white/60 font-medium">Statut</th>
                  <th className="text-left p-4 text-white/60 font-medium">Commandes</th>
                  <th className="text-left p-4 text-white/60 font-medium">Inscrit le</th>
                  <th className="text-left p-4 text-white/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-xs text-white/60">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white text-sm">{user.email}</p>
                      <p className="text-xs text-white/60">{user.phone}</p>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(user.status)}>{getStatusLabel(user.status)}</Badge>
                    </td>
                    <td className="p-4 text-white">{user.totalOrders}</td>
                    <td className="p-4 text-white/60 text-sm">{user.joinDate}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {user.status === "suspended" ? (
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-400 hover:text-green-300">
                            <UserCheck className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300">
                            <Ban className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDrivers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input placeholder="Rechercher un chauffeur..." className="pl-10 bg-white/5 border-white/10 text-white" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/20 text-white bg-transparent">
            <Filter className="w-4 h-4 mr-2" /> Filtrer
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-red-500">
            + Ajouter un chauffeur
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {drivers.map((driver) => (
          <Card key={driver.id} className="bg-[#1a1a2e]/80 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{driver.name}</p>
                      {driver.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                    <p className="text-xs text-white/60">{driver.id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(driver.status)}>{getStatusLabel(driver.status)}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/60">Livraisons</p>
                  <p className="text-lg font-bold text-white">{driver.totalDeliveries}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/60">Note</p>
                  <p className="text-lg font-bold text-yellow-400">{driver.rating} ★</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/60">Gains totaux</p>
                  <p className="text-lg font-bold text-green-400">{formatCurrency(driver.earnings)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/60">Véhicule</p>
                  <p className="text-lg font-bold text-white capitalize">{driver.vehicleType}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-white/20 text-white bg-transparent">
                  <Eye className="w-4 h-4 mr-2" /> Détails
                </Button>
                <Button variant="outline" className="flex-1 border-white/20 text-white bg-transparent">
                  <Phone className="w-4 h-4 mr-2" /> Appeler
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderVendors = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input placeholder="Rechercher un vendeur..." className="pl-10 bg-white/5 border-white/10 text-white" />
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500">
          + Ajouter un partenaire
        </Button>
      </div>

      <Card className="bg-[#1a1a2e]/80 border-white/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/60 font-medium">Commerce</th>
                  <th className="text-left p-4 text-white/60 font-medium">Catégorie</th>
                  <th className="text-left p-4 text-white/60 font-medium">Statut</th>
                  <th className="text-left p-4 text-white/60 font-medium">Commandes</th>
                  <th className="text-left p-4 text-white/60 font-medium">Revenus</th>
                  <th className="text-left p-4 text-white/60 font-medium">Commission</th>
                  <th className="text-left p-4 text-white/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                          <Store className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{vendor.businessName}</p>
                          <p className="text-xs text-white/60">{vendor.ownerName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-white">{vendor.category}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(vendor.status)}>{getStatusLabel(vendor.status)}</Badge>
                    </td>
                    <td className="p-4 text-white">{vendor.totalOrders}</td>
                    <td className="p-4 text-green-400">{formatCurrency(vendor.revenue)}</td>
                    <td className="p-4 text-orange-400">{formatCurrency(vendor.commission)}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {vendor.status === "pending" && (
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-400 hover:text-green-300">
                            <UserCheck className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">Toutes</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">En attente</TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">En cours</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">Terminées</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card className="bg-[#1a1a2e]/80 border-white/10">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/60 font-medium">ID</th>
                      <th className="text-left p-4 text-white/60 font-medium">Type</th>
                      <th className="text-left p-4 text-white/60 font-medium">Client</th>
                      <th className="text-left p-4 text-white/60 font-medium">Chauffeur</th>
                      <th className="text-left p-4 text-white/60 font-medium">Trajet</th>
                      <th className="text-left p-4 text-white/60 font-medium">Montant</th>
                      <th className="text-left p-4 text-white/60 font-medium">Statut</th>
                      <th className="text-left p-4 text-white/60 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4 text-white font-medium">{order.id}</td>
                        <td className="p-4">
                          <Badge className={order.type === "delivery" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"}>
                            {order.type === "delivery" ? "Livraison" : "Taxi-Moto"}
                          </Badge>
                        </td>
                        <td className="p-4 text-white">{order.client}</td>
                        <td className="p-4 text-white/60">{order.driver}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-3 h-3 text-green-400" />
                            <span className="text-white/60">{order.pickup}</span>
                            <ChevronRight className="w-3 h-3 text-white/40" />
                            <MapPin className="w-3 h-3 text-red-400" />
                            <span className="text-white/60">{order.destination}</span>
                          </div>
                        </td>
                        <td className="p-4 text-white font-medium">{formatCurrency(order.amount)}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                        </td>
                        <td className="p-4">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#1a1a2e]/80 border-white/10 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-white">Revenus mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"].map((month, i) => {
                const height = 30 + Math.random() * 70;
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${height}%` }} />
                    <span className="text-xs text-white/60">{month}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Répartition des commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Livraisons</span>
                  <span className="text-white">65%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Taxi-Moto</span>
                  <span className="text-white">35%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: "35%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Top Quartiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Poto-Poto", "Bacongo", "Moungali", "Ouenze", "Talangai"].map((q, i) => (
                <div key={q} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs text-white">{i + 1}</span>
                    <span className="text-white">{q}</span>
                  </div>
                  <span className="text-white/60 text-sm">{Math.floor(200 - i * 30)} commandes</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Taux de satisfaction</span>
                <span className="text-green-400 font-bold">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Temps moyen de livraison</span>
                <span className="text-white font-bold">28 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Commandes annulées</span>
                <span className="text-red-400 font-bold">3.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Nouveaux utilisateurs/jour</span>
                <span className="text-white font-bold">+45</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Configuration générale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Nom de l&apos;application</label>
              <Input defaultValue="A VISUEL Express" className="bg-white/5 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Email de contact</label>
              <Input defaultValue="contact@avisuel.cg" className="bg-white/5 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Téléphone support</label>
              <Input defaultValue="+242 06 XXX XXXX" className="bg-white/5 border-white/10 text-white" />
            </div>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">Enregistrer</Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Tarification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Prix de base livraison (FCFA)</label>
              <Input type="number" defaultValue="1500" className="bg-white/5 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Prix par km (FCFA)</label>
              <Input type="number" defaultValue="500" className="bg-white/5 border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-2 block">Commission plateforme (%)</label>
              <Input type="number" defaultValue="10" className="bg-white/5 border-white/10 text-white" />
            </div>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">Mettre à jour</Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Nouvelles inscriptions</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Nouvelles commandes</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Réclamations</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Rapports quotidiens</span>
              <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a2e]/80 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Zones de service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi", "Ouesso"].map((city) => (
              <div key={city} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">{city}</span>
                <Badge className={city === "Brazzaville" || city === "Pointe-Noire" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                  {city === "Brazzaville" || city === "Pointe-Noire" ? "Actif" : "Bientôt"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const getViewTitle = () => {
    const titles: Record<AdminView, string> = {
      dashboard: "Tableau de bord",
      users: "Gestion des utilisateurs",
      drivers: "Gestion des chauffeurs",
      vendors: "Gestion des vendeurs",
      orders: "Gestion des commandes",
      analytics: "Analytiques",
      settings: "Paramètres",
    };
    return titles[currentView];
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return renderDashboard();
      case "users":
        return renderUsers();
      case "drivers":
        return renderDrivers();
      case "vendors":
        return renderVendors();
      case "orders":
        return renderOrders();
      case "analytics":
        return renderAnalytics();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {renderSidebar()}

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 bg-[#0f0f1a]/90 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">{getViewTitle()}</h1>
                <p className="text-sm text-white/60">Bienvenue, Administrateur</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white">
                <RefreshCw className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6">{renderContent()}</div>
      </main>
    </div>
  );
}
