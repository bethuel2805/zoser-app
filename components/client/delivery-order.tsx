"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  MapPin,
  Package,
  Phone,
  User,
  CreditCard,
  ChevronRight,
  Clock,
  Smartphone,
} from "lucide-react"

interface DeliveryOrderProps {
  onBack: () => void
  onOrderCreated: () => void
}

const deliveryTypes = [
  { id: "colis", label: "Colis", icon: Package },
  { id: "repas", label: "Repas", icon: Package },
  { id: "medicaments", label: "Médicaments", icon: Package },
  { id: "documents", label: "Documents", icon: Package },
]

const paymentMethods = [
  { id: "mtn", label: "MTN Mobile Money", color: "bg-yellow-500" },
  { id: "airtel", label: "Airtel Money", color: "bg-red-500" },
  { id: "cash", label: "Espèces", color: "bg-green-500" },
]

export default function DeliveryOrder({ onBack, onOrderCreated }: DeliveryOrderProps) {
  const [step, setStep] = useState(1)
  const [deliveryType, setDeliveryType] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    recipientName: "",
    recipientPhone: "",
    description: "",
  })

  const handleSubmit = () => {
    // Simulate order creation
    onOrderCreated()
  }

  const estimatedPrice = "2,500 FC"
  const estimatedTime = "25-35 min"

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
          <h1 className="text-xl font-bold text-white">Livraison Express</h1>
          <p className="text-gray-400 text-sm">Étape {step} sur 3</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-all ${
              s <= step ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Delivery Type & Addresses */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Delivery type selection */}
          <div>
            <Label className="text-white mb-3 block">Type de livraison</Label>
            <div className="grid grid-cols-2 gap-3">
              {deliveryTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`p-4 cursor-pointer transition-all ${
                      deliveryType === type.id
                        ? "bg-orange-500/20 border-orange-500"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setDeliveryType(type.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          deliveryType === type.id
                            ? "bg-orange-500 text-white"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={deliveryType === type.id ? "text-white" : "text-gray-300"}
                      >
                        {type.label}
                      </span>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Pickup address */}
          <div>
            <Label className="text-white mb-2 block">Adresse de collecte</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
              <Input
                placeholder="Entrez l'adresse de collecte"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
              />
            </div>
          </div>

          {/* Delivery address */}
          <div>
            <Label className="text-white mb-2 block">Adresse de livraison</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
              <Input
                placeholder="Entrez l'adresse de livraison"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              />
            </div>
          </div>

          <Button
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl"
            onClick={() => setStep(2)}
          >
            Continuer
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Step 2: Recipient & Description */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Recipient name */}
          <div>
            <Label className="text-white mb-2 block">Nom du destinataire</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Nom complet du destinataire"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              />
            </div>
          </div>

          {/* Recipient phone */}
          <div>
            <Label className="text-white mb-2 block">Téléphone du destinataire</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="+243 XXX XXX XXX"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12"
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label className="text-white mb-2 block">Description du colis (optionnel)</Label>
            <Textarea
              placeholder="Décrivez votre colis..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-24"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
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
              onClick={() => setStep(3)}
            >
              Continuer
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Payment & Confirmation */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Order summary */}
          <Card className="bg-white/5 border-white/10 p-4">
            <h3 className="text-white font-semibold mb-4">Résumé de la commande</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-gray-400">Collecte</p>
                  <p className="text-white">{formData.pickupAddress || "Avenue de la Paix"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-gray-400">Livraison</p>
                  <p className="text-white">{formData.deliveryAddress || "Marché Central"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">Destinataire</p>
                  <p className="text-white">{formData.recipientName || "Marie Kongo"}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Estimation */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/5 border-white/10 p-4 text-center">
              <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-gray-400 text-xs">Temps estimé</p>
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
              onClick={() => setStep(2)}
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
