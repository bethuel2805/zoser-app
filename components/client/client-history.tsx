"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Package, Bike, MapPin, Star, Calendar, Filter } from "lucide-react"

interface ClientHistoryProps {
  onBack: () => void
}

const historyItems = [
  {
    id: 1,
    type: "delivery",
    from: "Marché Total",
    to: "Avenue de la Paix",
    date: "18 Jan 2026, 14:30",
    price: "2,500 FC",
    rating: 5,
    status: "completed",
    driver: "Patrick Mbala",
  },
  {
    id: 2,
    type: "taxi",
    from: "Gare Centrale",
    to: "Université de Kinshasa",
    date: "17 Jan 2026, 09:15",
    price: "3,000 FC",
    rating: 4,
    status: "completed",
    driver: "Jean Mukendi",
  },
  {
    id: 3,
    type: "delivery",
    from: "Pharmacie Centrale",
    to: "Résidence Mateba",
    date: "16 Jan 2026, 16:45",
    price: "1,800 FC",
    rating: 5,
    status: "completed",
    driver: "Marie Kongo",
  },
  {
    id: 4,
    type: "taxi",
    from: "Aéroport N'Djili",
    to: "Hôtel Memling",
    date: "15 Jan 2026, 11:00",
    price: "8,000 FC",
    rating: 5,
    status: "completed",
    driver: "Patrick Mbala",
  },
  {
    id: 5,
    type: "delivery",
    from: "Restaurant Le Grillon",
    to: "Bureau BCDC",
    date: "14 Jan 2026, 12:30",
    price: "2,000 FC",
    rating: 4,
    status: "completed",
    driver: "Emmanuel Luzolo",
  },
]

export default function ClientHistory({ onBack }: ClientHistoryProps) {
  const [filter, setFilter] = useState<"all" | "delivery" | "taxi">("all")

  const filteredItems = historyItems.filter(
    (item) => filter === "all" || item.type === filter
  )

  const totalSpent = historyItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""))
    return acc + price
  }, 0)

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
          <h1 className="text-xl font-bold text-white">Historique</h1>
          <p className="text-gray-400 text-sm">{historyItems.length} courses effectuées</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-white/5 border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-white">{historyItems.length}</p>
          <p className="text-gray-400 text-xs">Courses</p>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">
            {totalSpent.toLocaleString()} FC
          </p>
          <p className="text-gray-400 text-xs">Total dépensé</p>
        </Card>
        <Card className="bg-white/5 border-white/10 p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-2xl font-bold text-white">4.8</span>
          </div>
          <p className="text-gray-400 text-xs">Note moyenne</p>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400" />
        <div className="flex gap-2">
          {[
            { id: "all", label: "Tout" },
            { id: "delivery", label: "Livraisons" },
            { id: "taxi", label: "Taxi-moto" },
          ].map((f) => (
            <Button
              key={f.id}
              variant="ghost"
              size="sm"
              className={`rounded-full ${
                filter === f.id
                  ? "bg-orange-500/20 text-orange-500"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setFilter(f.id as typeof filter)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* History list */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${
                    item.type === "delivery"
                      ? "bg-orange-500/20 text-orange-500"
                      : "bg-red-500/20 text-red-500"
                  } flex items-center justify-center`}
                >
                  {item.type === "delivery" ? (
                    <Package className="w-6 h-6" />
                  ) : (
                    <Bike className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium truncate">
                      {item.type === "delivery" ? "Livraison" : "Taxi-moto"}
                    </p>
                    <p className="text-white font-semibold">{item.price}</p>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-gray-500" />
                      <p className="text-gray-300 truncate">{item.from}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      <p className="text-gray-400 truncate">{item.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-400">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">Chauffeur: {item.driver}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
