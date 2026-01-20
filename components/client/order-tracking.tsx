"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  Navigation,
  Package,
  Bike,
  CheckCircle2,
  Clock,
} from "lucide-react"

interface OrderTrackingProps {
  orderType: "delivery" | "taxi"
  onBack: () => void
}

const trackingSteps = {
  delivery: [
    { id: "confirmed", label: "Commande confirmée", icon: CheckCircle2 },
    { id: "pickup", label: "Collecte en cours", icon: Package },
    { id: "en_route", label: "En route vers vous", icon: Navigation },
    { id: "delivered", label: "Livré", icon: CheckCircle2 },
  ],
  taxi: [
    { id: "confirmed", label: "Course confirmée", icon: CheckCircle2 },
    { id: "driver_arriving", label: "Chauffeur en route", icon: Bike },
    { id: "in_progress", label: "Course en cours", icon: Navigation },
    { id: "completed", label: "Arrivé à destination", icon: CheckCircle2 },
  ],
}

export default function OrderTracking({ orderType, onBack }: OrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(2)
  const [eta, setEta] = useState(15)

  useEffect(() => {
    // Simulate ETA countdown
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1))
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const steps = trackingSteps[orderType]

  const driver = {
    name: "Patrick Mbala",
    rating: 4.8,
    trips: 342,
    vehicle: "Honda Wave",
    plate: "KIN-1234-AB",
    phone: "+243 812 345 678",
  }

  return (
    <div className="space-y-6">
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
        <div>
          <h1 className="text-xl font-bold text-white">
            {orderType === "delivery" ? "Suivi de livraison" : "Suivi de course"}
          </h1>
          <p className="text-gray-400 text-sm">En temps réel</p>
        </div>
      </div>

      {/* Map placeholder */}
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <div className="relative h-48 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
          {/* Simulated map with route */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Route line */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 50,150 Q 100,80 150,100 T 250,80"
                  stroke="url(#routeGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F26522" />
                    <stop offset="100%" stopColor="#ED1C24" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Start point */}
              <div className="absolute left-12 bottom-12 w-4 h-4 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50">
                <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-50" />
              </div>
              {/* Driver position */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <Bike className="w-5 h-5 text-white" />
                </div>
              </div>
              {/* End point */}
              <div className="absolute right-16 top-16 w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
            </div>
          </div>
          {/* ETA overlay */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-white font-semibold">{eta} min</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Driver info */}
      <Card className="bg-white/5 border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xl font-bold">
              {driver.name.charAt(0)}
            </div>
            <div>
              <p className="text-white font-semibold">{driver.name}</p>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-gray-300">{driver.rating}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{driver.trips} courses</span>
              </div>
              <p className="text-gray-500 text-sm">
                {driver.vehicle} • {driver.plate}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white"
            >
              <Phone className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Tracking steps */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-4">Progression</h3>
        <div className="space-y-1">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted || isCurrent
                        ? "bg-gradient-to-br from-orange-500 to-red-500"
                        : "bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isCompleted || isCurrent ? "text-white" : "text-gray-500"
                      }`}
                    />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-8 ${
                        isCompleted ? "bg-orange-500" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p
                    className={`font-medium ${
                      isCompleted || isCurrent ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-orange-500 text-sm mt-1">
                      En cours...
                      <span className="inline-block ml-1 w-1 h-1 bg-orange-500 rounded-full animate-ping" />
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Order details */}
      <Card className="bg-white/5 border-white/10 p-4">
        <h3 className="text-white font-semibold mb-4">Détails</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
            <div>
              <p className="text-gray-400">
                {orderType === "delivery" ? "Collecte" : "Départ"}
              </p>
              <p className="text-white">Avenue de la Paix, Kinshasa</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Navigation className="w-4 h-4 text-red-500 mt-0.5" />
            <div>
              <p className="text-gray-400">
                {orderType === "delivery" ? "Livraison" : "Destination"}
              </p>
              <p className="text-white">Marché Central, Gombe</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Cancel button */}
      <Button
        variant="ghost"
        className="w-full h-12 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl"
        onClick={onBack}
      >
        Annuler la course
      </Button>
    </div>
  )
}
