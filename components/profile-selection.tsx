"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Bike, Store, Shield, ChevronRight } from "lucide-react"
import type { UserProfile } from "@/app/page"

interface ProfileSelectionProps {
  onSelect: (profile: UserProfile) => void
}

const profiles = [
  {
    id: "client" as UserProfile,
    title: "Client",
    description: "Commander des livraisons et des courses en taxi-moto",
    icon: User,
    gradient: "from-orange-500 to-orange-600",
    features: ["Livraison express", "Taxi-moto", "Suivi GPS temps réel"],
  },
  {
    id: "driver" as UserProfile,
    title: "Livreur / Chauffeur",
    description: "Effectuer des livraisons et des courses",
    icon: Bike,
    gradient: "from-red-500 to-red-600",
    features: ["Revenus flexibles", "Navigation GPS", "Retraits Mobile Money"],
  },
  {
    id: "vendor" as UserProfile,
    title: "Vendeur / Commerçant",
    description: "Gérer vos livraisons et votre activité",
    icon: Store,
    gradient: "from-orange-500 to-red-500",
    features: ["Tableau de bord vendeur", "Gestion des stocks", "Suivi financier"],
  },
  {
    id: "admin" as UserProfile,
    title: "Administration",
    description: "Gérer la plateforme A VISUEL Express",
    icon: Shield,
    gradient: "from-red-600 to-orange-600",
    features: ["Dashboard complet", "Gestion utilisateurs", "Statistiques"],
  },
]

export default function ProfileSelection({ onSelect }: ProfileSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] px-4 py-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/images/logo-groupe-a-visuel.png"
          alt="A VISUEL Logo"
          width={70}
          height={70}
          className="mb-4"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          Bienvenue sur{" "}
          <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            A VISUEL Express
          </span>
        </h1>
        <p className="text-gray-400 mt-2 text-center">Choisissez votre espace pour continuer</p>
      </div>

      {/* Profile cards */}
      <div className="max-w-lg mx-auto space-y-4">
        {profiles.map((profile) => {
          const Icon = profile.icon
          return (
            <Card
              key={profile.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => onSelect(profile.id)}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${profile.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-white">{profile.title}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{profile.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {profile.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Demo note */}
      <div className="max-w-lg mx-auto mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Version démo - Sélectionnez un profil pour explorer l'application
        </p>
      </div>
    </div>
  )
}
