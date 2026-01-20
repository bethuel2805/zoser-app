"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Package, MapPin, CreditCard, Shield } from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
}

const slides = [
  {
    icon: Package,
    title: "Livraison Express",
    description:
      "Envoyez vos colis, repas, médicaments et documents en un temps record. Nos livreurs sont disponibles 24h/24.",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: MapPin,
    title: "Taxi-Moto Fiable",
    description:
      "Déplacez-vous rapidement à travers la ville. Réservez immédiatement ou planifiez vos trajets à l'avance.",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: CreditCard,
    title: "Paiement Mobile Money",
    description:
      "Payez facilement avec MTN Mobile Money ou Airtel Money. Transactions sécurisées et instantanées.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Sécurité Garantie",
    description:
      "Suivez vos courses en temps réel. Tous nos chauffeurs et livreurs sont vérifiés et évalués par la communauté.",
    gradient: "from-red-600 to-orange-500",
  },
]

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]">
      {/* Skip button */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="text-gray-400 hover:text-white hover:bg-white/10"
        >
          Passer
        </Button>
      </div>

      {/* Logo */}
      <div className="flex justify-center pt-8 pb-4">
        <Image
          src="/images/logo-groupe-a-visuel.png"
          alt="A VISUEL Logo"
          width={60}
          height={60}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        {/* Animated icon */}
        <div
          className={`relative mb-8 transition-all duration-500`}
          key={currentSlide}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} rounded-full blur-3xl opacity-30 scale-150 animate-pulse`}
          />
          <div
            className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-2xl`}
          >
            <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text content */}
        <div
          className="text-center max-w-md transition-all duration-500"
          key={`text-${currentSlide}`}
        >
          <h2 className="text-3xl font-bold text-white mb-4">{slide.title}</h2>
          <p className="text-gray-400 text-lg leading-relaxed">{slide.description}</p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-gradient-to-r from-orange-500 to-red-500"
                  : "w-2 bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          onClick={handleNext}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02]"
        >
          {currentSlide === slides.length - 1 ? "Commencer" : "Continuer"}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
