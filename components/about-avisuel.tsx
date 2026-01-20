"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Target,
  Eye,
  Heart,
  Truck,
  MessageSquare,
  Package,
  Play,
} from "lucide-react"

interface AboutAVisuelProps {
  onBack: () => void
}

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque service que nous offrons.",
  },
  {
    icon: Heart,
    title: "Intégrité",
    description: "La confiance et l'honnêteté sont au cœur de nos relations.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "Nous innovons constamment pour mieux vous servir.",
  },
]

const services = [
  {
    icon: MessageSquare,
    title: "Communication",
    description: "Solutions de communication digitale et traditionnelle",
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Services de transport urbain et interurbain",
  },
  {
    icon: Package,
    title: "Logistique",
    description: "Gestion complète de la chaîne logistique",
  },
]

export default function AboutAVisuel({ onBack }: AboutAVisuelProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-white/10"
          onClick={onBack}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold text-white">À propos de A VISUEL</h1>
      </div>

      {/* Hero section */}
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-2xl opacity-30" />
          <Image
            src="/images/logo-groupe-a-visuel.png"
            alt="A VISUEL Logo"
            width={120}
            height={120}
            className="relative z-10"
          />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Groupe A VISUEL</h2>
        <p className="text-orange-500 font-medium mb-4">Maison Mère</p>
        <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
          Leader congolais dans les domaines de la communication, du transport et de la
          logistique. Nous connectons les personnes et les entreprises à travers des solutions
          innovantes.
        </p>
      </div>

      {/* Video section */}
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <div className="relative aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
          <Button
            size="icon"
            className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25"
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </Button>
          <p className="absolute bottom-4 text-gray-400 text-sm">
            Découvrez notre vidéo institutionnelle
          </p>
        </div>
      </Card>

      {/* Mission & Vision */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Notre Mission</h3>
          <p className="text-gray-400 leading-relaxed">
            Faciliter la vie quotidienne des Congolais en offrant des services de transport
            et de livraison rapides, fiables et accessibles à tous.
          </p>
        </Card>
        <Card className="bg-white/5 border-white/10 p-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Notre Vision</h3>
          <p className="text-gray-400 leading-relaxed">
            Devenir la référence incontournable du transport et de la logistique en République
            Démocratique du Congo et en Afrique centrale.
          </p>
        </Card>
      </div>

      {/* Values */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 text-center">Nos Valeurs</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <Card
                key={value.title}
                className="bg-white/5 border-white/10 p-5 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-white font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 text-center">Nos Domaines</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{service.title}</h4>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Contact */}
      <Card className="bg-white/5 border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Contactez-nous</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Adresse</p>
              <p className="text-white">123 Avenue de la Paix, Kinshasa, RDC</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Téléphone</p>
              <p className="text-white">+243 800 123 456</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">contact@avisuel.cd</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Site Web</p>
              <p className="text-white">www.avisuel.cd</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Social links */}
      <div className="text-center">
        <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
        <div className="flex justify-center gap-3">
          {[
            { icon: Facebook, color: "bg-blue-600" },
            { icon: Twitter, color: "bg-sky-500" },
            { icon: Instagram, color: "bg-pink-600" },
            { icon: Linkedin, color: "bg-blue-700" },
          ].map((social, index) => {
            const Icon = social.icon
            return (
              <Button
                key={index}
                size="icon"
                className={`w-12 h-12 rounded-full ${social.color} hover:opacity-80`}
              >
                <Icon className="w-5 h-5 text-white" />
              </Button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-white/10">
        <p className="text-gray-500 text-sm">
          © 2024 Groupe A VISUEL. Tous droits réservés.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Communication • Transport • Logistique
        </p>
      </div>
    </div>
  )
}
