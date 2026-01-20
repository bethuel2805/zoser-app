"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Clock,
  Calendar,
  CreditCard,
  Bike,
  Smartphone,
  Users,
} from "lucide-react"

interface TaxiMotoOrderProps {
  onBack: () => void
  onOrderCreated: () => void
}

const rideTypes = [
  { id: "immediate", label: "Trajet immédiat", icon: Navigation, description: "Partir maintenant" },
  { id: "scheduled", label: "Réservation", icon: Calendar, description: "Planifier un trajet" },
  { id: "rental", label: "Location", icon: Clock, description: "½ journée ou journée" },
]

const paymentMethods = [
  { id: "mtn", label: "MTN Mobile Money", color: "bg-yellow-500" },
  { id: "airtel", label: "Airtel Money", color: "bg-red-500" },
  { id: "cash", label: "Espèces", color: "bg-green-500" },
]

export default function TaxiMotoOrder({ onBack, onOrderCreated }: TaxiMotoOrderProps) {
  const [step, setStep] = useState(1)
  const [rideType, setRideType] = useState("immediate")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [formData, setFormData] = useState({
    pickupAddress: "",
    destination: "",
    scheduledDate: "",
    scheduledTime: "",
    rentalDuration: "",
  })

  const handleSubmit = () => {
    onOrderCreated()
  }

  const estimatedPrice = rideType === "rental" ? "15,000 FC" : "3,000 FC"
  const estimatedTime = rideType === "rental" ? "4h - 8h" : "15-20 min"

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
          <h1 className="text-xl font-bold text-white">Taxi-Moto</h1>
          <p className="text-gray-400 text-sm">Étape {step} sur 2</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-all ${
              s <= step ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Ride type & Location */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Ride type selection */}
          <div>
            <Label className="text-white mb-3 block">Type de course</Label>
            <div className="space-y-3">
              {rideTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`p-4 cursor-pointer transition-all ${
                      rideType === type.id
                        ? "bg-orange-500/20 border-orange-500"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setRideType(type.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          rideType === type.id
                            ? "bg-gradient-to-br from-orange-500 to-red-500"
                            : "bg-white/10"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            rideType === type.id ? "text-white" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            rideType === type.id ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {type.label}
                        </p>
                        <p className="text-gray-500 text-sm">{type.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Pickup address */}
          <div>
            <Label className="text-white mb-2 block">Point de départ</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
              <Input
                placeholder="Votre position actuelle"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
              />
            </div>
          </div>

          {/* Destination (not for rental) */}
          {rideType !== "rental" && (
            <div>
              <Label className="text-white mb-2 block">Destination</Label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                <Input
                  placeholder="Où allez-vous?"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Scheduled options */}
          {rideType === "scheduled" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Date</Label>
                <Input
                  type="date"
                  className="bg-white/5 border-white/10 text-white h-12"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Heure</Label>
                <Input
                  type="time"
                  className="bg-white/5 border-white/10 text-white h-12"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Rental duration */}
          {rideType === "rental" && (
            <div>
              <Label className="text-white mb-3 block">Durée de location</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "half", label: "½ Journée (4h)", price: "15,000 FC" },
                  { id: "full", label: "Journée (8h)", price: "25,000 FC" },
                ].map((option) => (
                  <Card
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all text-center ${
                      formData.rentalDuration === option.id
                        ? "bg-orange-500/20 border-orange-500"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setFormData({ ...formData, rentalDuration: option.id })}
                  >
                    <p className="text-white font-medium">{option.label}</p>
                    <p className="text-orange-500 text-sm">{option.price}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Number of passengers */}
          <div>
            <Label className="text-white mb-3 block">Nombre de passagers</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
              >
                -
              </Button>
              <div className="flex items-center gap-2 px-4">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-white text-lg font-semibold">{passengers}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white"
                onClick={() => setPassengers(Math.min(2, passengers + 1))}
              >
                +
              </Button>
            </div>
          </div>

          <Button
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl"
            onClick={() => setStep(2)}
          >
            Continuer
          </Button>
        </div>
      )}

      {/* Step 2: Payment & Confirmation */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Order summary */}
          <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Bike className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {rideTypes.find((r) => r.id === rideType)?.label}
                </p>
                <p className="text-gray-400 text-sm">{passengers} passager(s)</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-400">Départ</p>
                  <p className="text-white">{formData.pickupAddress || "Gare Centrale"}</p>
                </div>
              </div>
              {rideType !== "rental" && (
                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-gray-400">Destination</p>
                    <p className="text-white">
                      {formData.destination || "Université de Kinshasa"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Estimation */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-gray-400 text-xs">Durée estimée</p>
              <p className="text-white font-semibold">{estimatedTime}</p>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <CreditCard className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-gray-400 text-xs">Prix estimé</p>
              <p className="text-white font-semibold">{estimatedPrice}</p>
            </Card>
          </div>

          {/* Payment method */}
          <div>
            <Label className="text-white mb-3 block">Méthode de paiement</Label>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`p-4 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? "bg-orange-500/20 border-orange-500"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${method.color} flex items-center justify-center`}
                    >
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">{method.label}</span>
                    {paymentMethod === method.id && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1 h-12 bg-white/5 hover:bg-white/10 text-white"
              onClick={() => setStep(1)}
            >
              Retour
            </Button>
            <Button
              className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl"
              onClick={handleSubmit}
            >
              Commander
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
