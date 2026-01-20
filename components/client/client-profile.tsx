"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Bell,
  Shield,
  Globe,
  ChevronRight,
  Camera,
  Edit,
  CreditCard,
} from "lucide-react"

interface ClientProfileProps {
  onBack: () => void
}

export default function ClientProfile({ onBack }: ClientProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState("fr")

  const user = {
    name: "Jean Mutombo",
    email: "jean.mutombo@email.com",
    phone: "+243 812 345 678",
    address: "Avenue de la Paix, Kinshasa",
  }

  const savedAddresses = [
    { id: 1, label: "Maison", address: "Avenue de la Paix, 123, Kinshasa" },
    { id: 2, label: "Bureau", address: "Boulevard du 30 Juin, 456, Gombe" },
  ]

  const paymentMethods = [
    { id: 1, type: "MTN Mobile Money", number: "**** **** 1234", isDefault: true },
    { id: 2, type: "Airtel Money", number: "**** **** 5678", isDefault: false },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-white/10"
            onClick={onBack}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold text-white">Mon Profil</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-orange-500 hover:bg-orange-500/10"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? "Sauvegarder" : "Modifier"}
        </Button>
      </div>

      {/* Profile header */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-3xl font-bold">
            JM
          </div>
          {isEditing && (
            <Button
              size="icon"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600"
            >
              <Camera className="w-4 h-4" />
            </Button>
          )}
        </div>
        <h2 className="text-xl font-bold text-white">{user.name}</h2>
        <p className="text-gray-400">Client depuis Janvier 2024</p>
      </div>

      {/* Personal info */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-orange-500" />
          Informations personnelles
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="text-gray-400 text-sm">Nom complet</Label>
            {isEditing ? (
              <Input
                defaultValue={user.name}
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            ) : (
              <p className="text-white mt-1">{user.name}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-400 text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            {isEditing ? (
              <Input
                defaultValue={user.email}
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            ) : (
              <p className="text-white mt-1">{user.email}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-400 text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Téléphone
            </Label>
            {isEditing ? (
              <Input
                defaultValue={user.phone}
                className="mt-1 bg-white/5 border-white/10 text-white"
              />
            ) : (
              <p className="text-white mt-1">{user.phone}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Saved addresses */}
      <Card className="bg-white/5 border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Adresses enregistrées
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:bg-orange-500/10"
          >
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
            >
              <div>
                <p className="text-white font-medium">{addr.label}</p>
                <p className="text-gray-400 text-sm">{addr.address}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
          ))}
        </div>
      </Card>

      {/* Payment methods */}
      <Card className="bg-white/5 border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-orange-500" />
            Moyens de paiement
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:bg-orange-500/10"
          >
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${
                    method.type.includes("MTN") ? "bg-yellow-500" : "bg-red-500"
                  } flex items-center justify-center`}
                >
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{method.type}</p>
                  <p className="text-gray-400 text-sm">{method.number}</p>
                </div>
              </div>
              {method.isDefault && (
                <span className="text-xs bg-orange-500/20 text-orange-500 px-2 py-1 rounded-full">
                  Par défaut
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Preferences */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-4">Préférences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-white">Notifications</p>
                <p className="text-gray-500 text-sm">Recevoir des alertes push</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-white">Langue</p>
                <p className="text-gray-500 text-sm">
                  {language === "fr" ? "Français" : "English"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            >
              Changer
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-white">Sécurité</p>
                <p className="text-gray-500 text-sm">Mot de passe et authentification</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </Card>
    </div>
  )
}
